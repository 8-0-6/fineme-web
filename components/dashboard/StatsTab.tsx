import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, ShieldAlert, ChevronRight, Settings, Bell, Lock, 
    Volume2, TrendingDown, Edit2, History, X, Share, 
    Minus, Plus, Check, ExternalLink, Calendar as CalendarIcon, ArrowUp, ArrowDown
} from 'lucide-react';
import { DailyLog, UserConfig } from '../../types';
import { CHARITIES, MIN_REPS } from '../../constants';
import { Button } from '../ui/Button';

interface Props {
  config: UserConfig;
  updateConfig: (updates: Partial<UserConfig>) => void;
  history: DailyLog[];
  tutorialStep?: number;
  isTutorialActive?: boolean;
  onLogout?: () => void;
  onTutorialNext?: () => void;
}

// Mock Data
const MOCK_HISTORY: DailyLog[] = [
    { date: 'Yesterday', repsCompleted: 25, targetReps: 25, status: 'SECURED' },
    { date: 'Jan 10, 2024', repsCompleted: 25, targetReps: 25, status: 'SECURED' },
    { date: 'Jan 09, 2024', repsCompleted: 10, targetReps: 25, status: 'FAILED', amount: 10 },
    { date: 'Jan 08, 2024', repsCompleted: 30, targetReps: 25, status: 'SECURED' },
    { date: 'Jan 07, 2024', repsCompleted: 25, targetReps: 25, status: 'SECURED' },
    { date: 'Jan 06, 2024', repsCompleted: 25, targetReps: 25, status: 'SECURED' },
    { date: 'Jan 05, 2024', repsCompleted: 0, targetReps: 25, status: 'FAILED', amount: 50 },
];

// --- Sub-Components (Toggle, Heatmap, Modals) ---

const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <div 
        onClick={onChange}
        className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${value ? 'bg-[#bef264]' : 'bg-zinc-700'}`}
    >
        <motion.div 
            layout 
            className="w-4 h-4 bg-black rounded-full shadow-md"
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
            style={{ marginLeft: value ? 'auto' : 0 }}
        />
    </div>
);

const Heatmap = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const getStatus = (dayIndex: number) => {
        const seed = dayIndex * 9301 + 49297;
        const val = (seed % 233280) / 233280.0;
        const todaySimulated = 20; 
        const dayOfMonth = dayIndex + 1;
        
        if (dayOfMonth > todaySimulated) return 'future';
        if (val > 0.8) return 'fail';
        if (val > 0.2) return 'success';
        return 'none';
    };

    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="flex flex-col h-[340px]">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-[#bef264]" />
                    <span className="text-sm font-bold text-white uppercase tracking-wide">
                        {monthName} {currentYear}
                    </span>
                </div>
            </div>

            <div className="flex-1 relative flex flex-col justify-center">
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {daysOfWeek.map((d, i) => (
                        <div key={i} className="text-center text-xs font-bold text-zinc-500">
                            {d}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={`pad-${i}`} />
                    ))}
                    {Array.from({ length: 30 }).map((_, i) => {
                        const status = getStatus(i);
                        let bgClass = 'bg-zinc-800'; 
                        if (status === 'success') bgClass = 'bg-[#bef264] shadow-[0_0_10px_rgba(190,242,100,0.3)]';
                        if (status === 'fail') bgClass = 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                        if (status === 'future') bgClass = 'bg-zinc-800/40 border border-zinc-800';

                        return (
                            <div 
                                key={i} 
                                className={`aspect-square rounded-lg ${bgClass} transition-all hover:scale-105`}
                            />
                        );
                    })}
                </div>
            </div>
            
            <div className="mt-4 flex justify-center gap-6 border-t border-zinc-800/50 pt-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#bef264] shadow-[0_0_5px_rgba(190,242,100,0.5)]" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Secured</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Failed</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm bg-zinc-800 border border-zinc-700" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Upcoming</span>
                 </div>
            </div>
        </div>
    );
};

const CertificateModal: React.FC<{ log: DailyLog; onClose: () => void; charityName?: string }> = ({ log, onClose, charityName = "Charity" }) => (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
    >
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-sm bg-[#f4f4f5] text-zinc-900 rounded-sm shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-zinc-200 rounded-full text-zinc-600 hover:bg-zinc-300 transition z-10">
                <X size={20} />
            </button>

            <div className="border-[6px] border-double border-zinc-300 m-3 p-6 flex flex-col items-center text-center h-full">
                <div className="text-4xl mb-4 mt-2">😔</div>
                <h2 className="text-lg font-black tracking-[0.2em] uppercase text-zinc-800 mb-6 border-b border-zinc-300 pb-4 w-full">
                    Certificate of Failure
                </h2>
                <p className="font-serif italic text-zinc-600 mb-1">On {log.date},</p>
                <h3 className="text-3xl font-bold text-black mb-2">You</h3>
                <p className="text-zinc-700 font-medium mb-1">
                    failed to complete <span className="font-bold">{log.targetReps} pushups</span>
                </p>
                <p className="text-xs text-zinc-400 mb-8 italic">(only completed {log.repsCompleted})</p>

                <div className="bg-zinc-100 w-full p-4 rounded-lg mb-8 border border-zinc-200">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">As a Result</p>
                    <div className="text-4xl font-black text-red-500 mb-1">-${log.amount?.toFixed(2)}</div>
                    <p className="text-sm text-zinc-600">was donated to</p>
                    <p className="text-base font-bold text-emerald-600 uppercase mt-1">{charityName}</p>
                </div>

                <div className="w-full border-t border-zinc-300 pt-4 flex justify-between items-end mt-auto">
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] uppercase tracking-widest text-zinc-400">Issued By</span>
                        <span className="font-bold text-xs text-zinc-800">FineMe Inc.</span>
                    </div>
                     <div className="flex flex-col items-end">
                         <span className="text-[8px] uppercase tracking-widest text-zinc-400">ID</span>
                        <span className="font-mono text-xs text-zinc-500">FAIL-{Math.floor(Math.random() * 10000)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 p-4">
                <Button fullWidth className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
                    Share Your Shame <Share size={16} className="ml-2" />
                </Button>
            </div>
        </motion.div>
    </motion.div>
);

const EditSettingsModal: React.FC<{ 
    type: 'REPS' | 'STAKE' | 'CHARITY'; 
    config: UserConfig; 
    updateConfig: (u: Partial<UserConfig>) => void; 
    onClose: () => void 
}> = ({ type, config, updateConfig, onClose }) => {
    
    const [localValue, setLocalValue] = useState(type === 'REPS' ? config.reps : config.stakeAmount);

    const handleSave = () => {
        if (type === 'REPS') updateConfig({ reps: localValue });
        if (type === 'STAKE') updateConfig({ stakeAmount: localValue });
        onClose();
    };

    const diff = type === 'STAKE' ? localValue - config.stakeAmount : 0;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm"
        >
            <div className="absolute inset-0" onClick={onClose} />
            <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="w-full max-w-md bg-zinc-900 border-t border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 relative pb-10"
            >
                <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto mb-6" />
                
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    Edit {type === 'REPS' ? 'Daily Goal' : type === 'STAKE' ? 'Commitment Stake' : 'Beneficiary'}
                </h3>

                {type === 'REPS' && (
                    <div className="flex flex-col items-center py-4">
                         <div className="flex items-center gap-8 mb-8">
                             <button 
                                onClick={() => setLocalValue(Math.max(MIN_REPS, localValue - 5))}
                                className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 active:scale-95 transition"
                             >
                                <Minus size={24} />
                             </button>
                             <div className="text-center w-24">
                                <span className="text-6xl font-black text-white">{localValue}</span>
                                <div className="text-xs text-zinc-500 uppercase font-bold mt-2">Reps</div>
                             </div>
                             <button 
                                onClick={() => setLocalValue(localValue + 5)}
                                className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 active:scale-95 transition"
                             >
                                <Plus size={24} />
                             </button>
                         </div>
                         <Button fullWidth onClick={handleSave}>Confirm New Goal</Button>
                    </div>
                )}

                {type === 'STAKE' && (
                    <div className="space-y-6">
                         <div className="flex justify-center mb-2">
                             <span className="text-6xl font-black text-white">${localValue}</span>
                         </div>

                        <div className="px-2">
                            <input 
                                type="range" 
                                min="0" 
                                max="200" 
                                step="5" 
                                value={localValue} 
                                onChange={(e) => setLocalValue(Number(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#bef264]"
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {[10, 20, 50, 100].map(amount => (
                                <button
                                    key={amount}
                                    onClick={() => setLocalValue(amount)}
                                    className={`
                                        py-3 rounded-xl font-bold text-sm border transition-all
                                        ${localValue === amount 
                                            ? 'bg-[#bef264] border-[#bef264] text-black scale-105' 
                                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600'}
                                    `}
                                >
                                    ${amount}
                                </button>
                            ))}
                        </div>

                         <div className="space-y-3 mt-4">
                             {diff !== 0 && (
                                 <div className={`text-center text-xs font-bold ${diff > 0 ? 'text-zinc-400' : 'text-emerald-400'}`}>
                                     {diff > 0 
                                        ? `You will be charged an additional $${diff}.` 
                                        : `You will be refunded $${Math.abs(diff)}.`
                                     }
                                 </div>
                             )}
                             
                             <Button fullWidth onClick={handleSave} disabled={diff === 0}>
                                {diff > 0 ? `Deposit $${diff} & Update` : diff < 0 ? `Withdraw $${Math.abs(diff)} & Update` : 'Update Stake'}
                             </Button>

                             <button 
                                onClick={() => setLocalValue(0)} 
                                className="w-full text-zinc-500 text-xs font-medium hover:text-white transition py-2"
                             >
                                Withdraw to Minimum
                             </button>
                        </div>
                    </div>
                )}

                {type === 'CHARITY' && (
                    <div className="space-y-3 pb-4">
                        {CHARITIES.map(charity => (
                             <button
                                key={charity.id}
                                onClick={() => { updateConfig({ charity: charity.id }); onClose(); }}
                                className={`
                                    w-full flex items-center justify-between p-4 rounded-xl border transition-all
                                    ${config.charity === charity.id 
                                        ? 'bg-zinc-800 border-[#bef264]' 
                                        : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-900'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.charity === charity.id ? 'bg-[#bef264] text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                                        {config.charity === charity.id ? <Check size={16} /> : <div className="w-2 h-2 rounded-full bg-zinc-600" />}
                                    </div>
                                    <div className="text-left">
                                        <div className={`font-bold ${config.charity === charity.id ? 'text-white' : 'text-zinc-400'}`}>{charity.name}</div>
                                    </div>
                                </div>
                                <ExternalLink size={16} className="text-zinc-600" />
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};


// --- Main Component ---

export const StatsTab: React.FC<Props> = ({ config, updateConfig, history = MOCK_HISTORY, tutorialStep = 0, isTutorialActive = false, onLogout, onTutorialNext }) => {
  const [viewCertificate, setViewCertificate] = useState<DailyLog | null>(null);
  const [editing, setEditing] = useState<'REPS' | 'STAKE' | 'CHARITY' | null>(null);
  
  // Refs for auto-scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hallOfShameRef = useRef<HTMLElement>(null);

  // Local settings state
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);

  const currentCharity = CHARITIES.find(c => c.id === config.charity);

  // Auto-scroll logic for tutorial
  useEffect(() => {
    if (tutorialStep === 2 && hallOfShameRef.current && scrollContainerRef.current) {
        // Delay slight to ensure rendering
        setTimeout(() => {
             // Center to ensure tooltip has space
             hallOfShameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
  }, [tutorialStep]);

  return (
    <>
        <div className="flex flex-col h-full pt-6">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6"> 
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Statistics</h1> 
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Profile & Settings</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 shadow-inner">
                <span className="font-bold text-xs text-zinc-400">B</span>
            </div>
        </div>

        {/* 
            Container with ref
            overflow-hidden when tutorial active locks user scroll but scrollIntoView still works.
        */}
        <div 
            ref={scrollContainerRef}
            className={`flex-1 ${isTutorialActive ? 'overflow-hidden' : 'overflow-y-auto'} pb-20 -mr-4 pr-4 custom-scrollbar space-y-6`}
        >
            
            {/* Heatmap Section */}
            <section>
                <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-3xl backdrop-blur-sm shadow-sm">
                    <Heatmap />
                </div>
            </section>

            {/* Summary Stats */}
            <section className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-3xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500"><ShieldCheck size={16} /></div>
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Secured</span>
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">$120</div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-3xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-red-500/10 rounded-lg text-red-500"><ShieldAlert size={16} /></div>
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Lost</span>
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">$70</div>
                </div>
            </section>

            {/* Hall of Shame */}
            <section 
                ref={hallOfShameRef}
                className={`transition-all duration-300 relative ${tutorialStep === 2 ? 'z-50' : ''}`}
            >
                {/* Tutorial Step 2 Tooltip */}
                <AnimatePresence>
                    {tutorialStep === 2 && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-full left-0 right-0 mb-4 z-50 pointer-events-auto flex flex-col items-center"
                        >
                            <div className="w-72 text-center bg-zinc-900/95 border border-zinc-800 p-4 rounded-2xl mb-2 backdrop-blur-xl shadow-2xl">
                                <div className="text-white font-bold text-lg mb-1">The Hall of Shame</div>
                                <p className="text-zinc-300 text-sm mb-3">Your failed days (and lost money) appear here. Don't let this fill up.</p>
                                <Button onClick={onTutorialNext} className="h-8 py-0 px-4 text-xs w-auto bg-white text-black hover:bg-zinc-200 border-none mx-auto">
                                    Next
                                </Button>
                            </div>
                            <ArrowDown className="text-[#bef264] animate-bounce rotate-180" size={32} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`rounded-2xl transition-all ${tutorialStep === 2 ? 'ring-4 ring-[#bef264] bg-zinc-900 relative z-50' : ''}`}>
                    <div className="flex items-center justify-between mb-3 px-1 pt-2">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <TrendingDown size={14} className="text-red-500"/> Hall of Shame
                        </h3>
                        <span className="text-[10px] text-zinc-600">Tap to view</span>
                    </div>
                    
                    <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 snap-x scrollbar-hide">
                        {MOCK_HISTORY.filter(h => h.status === 'FAILED').map((log, i) => (
                            <motion.button
                                key={i}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewCertificate(log)}
                                className="min-w-[160px] snap-start bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden group hover:border-red-500/30 transition-colors"
                            >
                                {/* Card Decoration */}
                                <div className="absolute -right-4 -top-4 text-zinc-800 group-hover:text-red-900/20 transition-colors">
                                    <ShieldAlert size={80} />
                                </div>
                                
                                <div className="relative z-10 text-left">
                                    <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Failed</div>
                                    <div className="text-sm font-semibold text-white">{log.date}</div>
                                </div>
                                
                                <div className="relative z-10 text-left">
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wide">Loss</div>
                                    <div className="text-xl font-mono font-bold text-red-400">-${log.amount}</div>
                                </div>
                            </motion.button>
                        ))}
                        {MOCK_HISTORY.filter(h => h.status === 'FAILED').length === 0 && (
                            <div className="w-full py-8 text-center border border-dashed border-zinc-800 rounded-2xl text-zinc-600 text-sm">
                                No failures yet. Keep it up!
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Protocol Settings */}
            <section>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                    <Edit2 size={14} /> Protocol Settings
                </h3>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden divide-y divide-zinc-800/50">
                    
                    <button className="w-full p-5 flex items-center justify-between hover:bg-zinc-800/50 transition active:bg-zinc-800"
                            onClick={() => setEditing('REPS')}>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-bold text-white">Daily Goal</span>
                            <span className="text-xs text-zinc-500">Target Reps</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-[#bef264]">{config.reps}</span>
                            <ChevronRight size={16} className="text-zinc-600" />
                        </div>
                    </button>

                    <button className="w-full p-5 flex items-center justify-between hover:bg-zinc-800/50 transition active:bg-zinc-800"
                            onClick={() => setEditing('STAKE')}>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-bold text-white">Staked Amount</span>
                            <span className="text-xs text-zinc-500">Risk per day</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-white">${config.stakeAmount}</span>
                            <ChevronRight size={16} className="text-zinc-600" />
                        </div>
                    </button>

                    <button className="w-full p-5 flex items-center justify-between hover:bg-zinc-800/50 transition active:bg-zinc-800"
                            onClick={() => setEditing('CHARITY')}>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-bold text-white">Beneficiary</span>
                            <span className="text-xs text-zinc-500 max-w-[150px] truncate">{currentCharity?.name}</span>
                        </div>
                        <ChevronRight size={16} className="text-zinc-600" />
                    </button>
                </div>
            </section>

            {/* App Settings */}
            <section>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
                    <Settings size={14} /> App Preferences
                </h3>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden divide-y divide-zinc-800/50">
                    <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bell size={18} className="text-zinc-400" />
                            <span className="text-sm font-medium text-zinc-200">Notifications</span>
                        </div>
                        <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
                    </div>
                    <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Volume2 size={18} className="text-zinc-400" />
                            <span className="text-sm font-medium text-zinc-200">Sound Effects</span>
                        </div>
                        <Toggle value={sound} onChange={() => setSound(!sound)} />
                    </div>
                    <button className="w-full p-5 flex items-center justify-between hover:bg-zinc-800/50 transition">
                        <div className="flex items-center gap-3">
                            <Lock size={18} className="text-zinc-400" />
                            <span className="text-sm font-medium text-zinc-200">Privacy Policy</span>
                        </div>
                        <ChevronRight size={16} className="text-zinc-600" />
                    </button>
                </div>
                
                <div className="text-center mt-6 space-y-2">
                    <span className="text-[10px] text-zinc-700 font-mono block">FineMe v1.0.0 (Build 204)</span>
                    <button onClick={onLogout} className="text-xs text-red-900 hover:text-red-500 transition py-2 px-4 rounded-lg hover:bg-red-500/10">Log Out</button>
                </div>
            </section>

        </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
            {viewCertificate && (
                <CertificateModal 
                    log={viewCertificate} 
                    onClose={() => setViewCertificate(null)}
                    charityName={CHARITIES.find(c => c.id === config.charity)?.name} 
                />
            )}
            {editing && (
                <EditSettingsModal 
                    type={editing} 
                    config={config} 
                    updateConfig={updateConfig} 
                    onClose={() => setEditing(null)} 
                />
            )}
        </AnimatePresence>
    </>
  );
};
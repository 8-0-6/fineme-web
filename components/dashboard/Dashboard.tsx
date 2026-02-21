import React, { useState, useEffect } from 'react';
import { Home, BarChart2, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserConfig, DashboardTab } from '../../types';
import { HomeTab } from './HomeTab';
import { StatsTab } from './StatsTab';
import { Button } from '../ui/Button';

interface Props {
  config: UserConfig;
  updateConfig: (updates: Partial<UserConfig>) => void;
  repsDone: number;
  onStartWorkout: () => void;
  isFirstTime?: boolean;
  onLogout?: () => void;
  onTutorialSeen?: () => void;
}

export const Dashboard: React.FC<Props> = ({ config, updateConfig, repsDone, onStartWorkout, isFirstTime = false, onLogout, onTutorialSeen }) => {
  const [currentTab, setCurrentTab] = useState<DashboardTab>('HOME');
  const [tutorialStep, setTutorialStep] = useState(0);

  // Initialize tutorial if first time
  useEffect(() => {
    if (isFirstTime) {
        setTimeout(() => setTutorialStep(1), 1000); // Slight delay for entrance anim
        onTutorialSeen?.(); // Mark as seen so it doesn't trigger again on remount
    }
  }, [isFirstTime, onTutorialSeen]);

  const handleTutorialNext = () => {
      if (tutorialStep === 1) {
          // Move to Step 2: Show Hall of Shame in Stats Tab
          setCurrentTab('STATS');
          setTutorialStep(2);
      } else if (tutorialStep === 2) {
          // Move to Step 3: Show Start Button in Home Tab
          setCurrentTab('HOME');
          setTutorialStep(3);
      } else {
          // Finish
          setTutorialStep(0);
      }
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'HOME':
        return <HomeTab 
            config={config} 
            repsDone={repsDone} 
            onStartWorkout={onStartWorkout} 
            tutorialStep={tutorialStep} 
            onTutorialNext={handleTutorialNext}
        />;
      case 'STATS':
        return <StatsTab 
            config={config} 
            updateConfig={updateConfig} 
            history={[]} 
            tutorialStep={tutorialStep} 
            isTutorialActive={tutorialStep > 0}
            onLogout={onLogout}
            onTutorialNext={handleTutorialNext}
        />;
      default:
        return <HomeTab config={config} repsDone={repsDone} onStartWorkout={onStartWorkout} />;
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Global Tutorial Backdrop - Prevents Scroll */}
      <AnimatePresence>
        {tutorialStep > 0 && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-40 touch-none pointer-events-auto"
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    onClick={() => setTutorialStep(0)} 
                    className="absolute top-12 right-6 text-zinc-400 underline text-sm z-50 p-2 pointer-events-auto"
                >
                    Skip Tour
                </button>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-hidden px-1">
        {renderTab()}
      </div>

      {/* Bottom Navigation */}
      <div className={`pt-2 pb-1 relative transition-all duration-300 ${tutorialStep === 1 ? 'z-50' : 'z-0'}`}>
        
        {/* Tutorial Step 1 Tooltip */}
        <AnimatePresence>
            {tutorialStep === 1 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-full right-4 mb-4 w-72 text-right pointer-events-auto"
                >
                    <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl mb-2 backdrop-blur-xl">
                        <div className="text-white font-bold text-lg mb-1">Control Center</div>
                        <p className="text-zinc-300 text-sm mb-3">Tap 'Stats' to adjust your Goal, Stake, and Charity settings anytime.</p>
                        <Button onClick={handleTutorialNext} className="h-8 py-0 px-4 text-xs w-auto bg-white text-black hover:bg-zinc-200 border-none">
                            Got it
                        </Button>
                    </div>
                    <ArrowDown className="text-[#bef264] ml-auto mr-8 animate-bounce" size={32} />
                </motion.div>
            )}
        </AnimatePresence>

        <div className={`bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-3xl p-1.5 flex justify-between items-center relative shadow-2xl ${tutorialStep === 1 ? 'ring-4 ring-[#bef264]' : ''}`}>
           
           <button 
             onClick={() => setCurrentTab('HOME')}
             className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all ${currentTab === 'HOME' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
           >
             <Home size={20} className={currentTab === 'HOME' ? 'text-[#bef264]' : ''} />
             <span className="text-xs font-semibold tracking-wide">Today</span>
           </button>

           <div className="w-px h-6 bg-zinc-800 mx-1" />

           <button 
             onClick={() => setCurrentTab('STATS')}
             className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all ${currentTab === 'STATS' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
           >
             <BarChart2 size={20} className={currentTab === 'STATS' ? 'text-[#bef264]' : ''} />
             <span className="text-xs font-semibold tracking-wide">Stats</span>
           </button>

        </div>
      </div>

    </div>
  );
};
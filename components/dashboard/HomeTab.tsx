import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, ArrowDown } from 'lucide-react';
import { UserConfig } from '../../types';
import { CircularProgress } from '../ui/CircularProgress';
import { Button } from '../ui/Button';

interface Props {
  config: UserConfig;
  repsDone: number;
  onStartWorkout: () => void;
  tutorialStep?: number;
  onTutorialNext?: () => void;
}

const FineMeLogo = () => (
  <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="26" fontFamily="sans-serif" fontWeight="300" fontSize="28" fill="white" letterSpacing="-1">
      <tspan fontWeight="900" fill="#bef264">Fine</tspan>Me
    </text>
  </svg>
);

export const HomeTab: React.FC<Props> = ({ config, repsDone, onStartWorkout, tutorialStep = 0, onTutorialNext }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const percentage = Math.min(100, (repsDone / config.reps) * 100);
  const remaining = config.reps - repsDone;

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full pt-6">
      {/* Header Status */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-3">
          <FineMeLogo />
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${remaining > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-xs font-mono font-medium">${config.stakeAmount.toFixed(2)} STAKED</span>
        </div>
      </div>

      {/* Main Stats Area */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-8">
        
        <div className="mb-8 relative w-64 h-64 flex items-center justify-center">
             {/* Glow effect behind circle */}
             <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(190,242,100,1) 0%, rgba(0,0,0,0) 70%)',
                    transform: 'scale(1.2)'
                }}
             />
             
             <div className="relative z-10">
                <CircularProgress 
                    progress={percentage} 
                    size={260} 
                    strokeWidth={16}
                    color={remaining === 0 ? '#10b981' : '#bef264'} 
                    trackColor="#18181b"
                >
                    <div className="flex flex-col items-center text-center">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Remaining</span>
                        <motion.div 
                            key={remaining}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-7xl font-black text-white tracking-tighter leading-none"
                        >
                            {remaining}
                        </motion.div>
                        <span className="text-zinc-500 text-lg font-medium mt-1">/ {config.reps} Pushups</span>
                    </div>
                </CircularProgress>
             </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center w-full mb-8 px-4 justify-between">
            {/* Time Left */}
            <div className="flex-1 text-center">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Time Left</div>
                <div className="font-mono text-xl text-white tracking-tight tabular-nums">{timeLeft}</div>
            </div>
            
            <div className="w-px h-8 bg-zinc-800/80" />

            {/* At Risk (Center) */}
            <div className="flex-1 text-center">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">At Risk</div>
                <div className="font-mono text-xl text-red-500 tracking-tight">${config.stakeAmount}</div>
            </div>

            <div className="w-px h-8 bg-zinc-800/80" />

            {/* Streak (Right) */}
            <div className="flex-1 text-center">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Streak</div>
                <div className="font-mono text-xl text-white tracking-tight">12 Days</div>
            </div>
        </div>

        {/* Dynamic Context Card */}
        <div className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-start gap-3 backdrop-blur-md mb-4">
            <TrendingUp size={20} className="text-[#bef264] mt-0.5" />
            <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Keep the momentum</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    You're 12 days in. A quick set of {config.reps} pushups will secure your vault for another 24 hours.
                </p>
            </div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className={`pb-4 px-2 relative transition-all duration-300 ${tutorialStep === 3 ? 'z-50' : ''}`}>
        
        {/* Tutorial Tooltip - Matched Design */}
        {tutorialStep === 3 && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-0 right-0 mb-4 z-50 pointer-events-auto flex flex-col items-center"
            >
                <div className="w-72 text-center bg-zinc-900/95 border border-zinc-800 p-4 rounded-2xl mb-2 backdrop-blur-xl shadow-2xl">
                    <div className="text-white font-bold text-lg mb-1">The Judge</div>
                    <p className="text-zinc-300 text-sm mb-3">When you're ready, tap here to open the camera and start the AI counter.</p>
                    <Button onClick={onTutorialNext} className="h-8 py-0 px-4 text-xs w-auto bg-white text-black hover:bg-zinc-200 border-none mx-auto">
                        Let's Go
                    </Button>
                </div>
                <ArrowDown className="text-[#bef264] animate-bounce" size={32} />
            </motion.div>
        )}

        <div className={tutorialStep === 3 ? 'ring-4 ring-[#bef264] rounded-2xl shadow-[0_0_50px_rgba(190,242,100,0.5)] bg-black' : ''}>
            <Button 
                fullWidth 
                onClick={onStartWorkout} 
                className="h-16 text-lg tracking-wide uppercase shadow-[0_0_30px_rgba(190,242,100,0.2)]"
            >
                <Play fill="black" size={20} /> Start Verification
            </Button>
        </div>
      </div>
    </div>
  );
};
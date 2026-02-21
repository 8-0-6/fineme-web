import React from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, Calendar, Trophy } from 'lucide-react';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';

const Particle: React.FC<{ delay: number }> = ({ delay }) => (
    <motion.div
        initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
        animate={{ 
            y: [0, -100, 400], 
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, 360],
            opacity: [1, 1, 0]
        }}
        transition={{ duration: 2.5, delay, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-sm"
        style={{ 
            backgroundColor: ['#bef264', '#ec4899', '#3b82f6', '#f97316'][Math.floor(Math.random() * 4)] 
        }}
    />
);

interface StepSuccessProps extends OnboardingStepProps {
    onFinish: () => void;
}

export const StepSuccess: React.FC<StepSuccessProps> = ({ config, onFinish }) => {
  
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
         {Array.from({ length: 30 }).map((_, i) => (
             <Particle key={i} delay={Math.random() * 0.5} />
         ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-[#bef264] rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(190,242,100,0.4)]"
        >
            <Check size={40} className="text-black" strokeWidth={3} />
        </motion.div>

        <h2 className="text-2xl font-bold mb-2">You're Locked In.</h2>
        <p className="text-zinc-400 mb-6 text-center text-sm">
          The contract is signed. Your first deadline is tonight.
        </p>

        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                    <Flame className="text-orange-500" size={18} />
                    <span className="text-zinc-300 text-sm">Daily Goal</span>
                </div>
                <span className="text-lg font-bold text-white">{config.reps} Pushups</span>
            </div>
             <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                    <Trophy className="text-[#bef264]" size={18} />
                    <span className="text-zinc-300 text-sm">Staked Amount</span>
                </div>
                <span className="text-lg font-bold text-white">${config.stakeAmount}</span>
            </div>
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Calendar className="text-blue-500" size={18} />
                    <span className="text-zinc-300 text-sm">Deadline</span>
                </div>
                <span className="text-lg font-bold text-white">Midnight</span>
            </div>
        </div>
      </div>

      <div className="pt-4 relative z-10 pb-2">
        <Button fullWidth onClick={onFinish}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
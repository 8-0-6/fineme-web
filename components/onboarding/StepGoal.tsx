import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Activity } from 'lucide-react';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';
import { MIN_REPS } from '../../constants';

export const StepGoal: React.FC<OnboardingStepProps> = ({ config, updateConfig, onNext, onBack }) => {
  
  const increment = () => updateConfig({ reps: config.reps + 5 });
  const decrement = () => {
    if (config.reps > MIN_REPS) {
      updateConfig({ reps: config.reps - 5 });
    }
  };

  return (
    <div className="flex flex-col h-full pt-6">
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 text-[#bef264]">
            <Activity size={28} />
          </div>
          
          <h2 className="text-2xl font-bold mb-3">Daily Commitment</h2>
          <p className="text-zinc-400 mb-8 text-base">How many pushups will you do everyday?</p>

          <div className="relative py-4">
            <div className="flex items-center justify-center gap-8">
              <button 
                onClick={decrement}
                disabled={config.reps <= MIN_REPS}
                className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white transition disabled:opacity-30"
              >
                <Minus size={28} />
              </button>
              
              <div className="w-32 text-center">
                <motion.span 
                  key={config.reps}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-7xl font-black text-white tracking-tighter"
                >
                  {config.reps}
                </motion.span>
                <div className="text-[10px] text-zinc-500 font-mono mt-2 tracking-widest uppercase">Reps / Day</div>
              </div>

              <button 
                onClick={increment}
                className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
              >
                <Plus size={28} />
              </button>
            </div>
          </div>
          
          <div className="mt-8 bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl inline-block">
            <p className="text-orange-200 text-xs font-medium">
               ⚠️ Minimum {MIN_REPS} reps required.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="pt-4 pb-2">
        <Button fullWidth onClick={onNext}>
          Lock In Goal
        </Button>
        <Button variant="ghost" fullWidth onClick={onBack} className="mt-2">
          Back
        </Button>
      </div>
    </div>
  );
};
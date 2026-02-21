import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';

export const StepReferral: React.FC<OnboardingStepProps> = ({ config, updateConfig, onNext, onBack }) => {
  
  const options = ["TikTok / Instagram", "Friend Recommendation", "App Store Search", "Podcast / YouTube", "Other"];

  return (
    <div className="flex flex-col h-full pt-6">
      <div className="flex-1">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <h2 className="text-2xl font-bold mb-3">How did you find us?</h2>
        </motion.div>

        <div className="space-y-2">
            {options.map((option, idx) => (
                <motion.button
                    key={option}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                        updateConfig({ referralSource: option });
                    }}
                    className={`
                        w-full p-4 text-left rounded-xl border font-medium text-base transition-all
                        ${config.referralSource === option 
                            ? 'bg-zinc-800 border-[#bef264] text-white' 
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'}
                    `}
                >
                    {option}
                </motion.button>
            ))}
        </div>
      </div>

      <div className="pt-4 pb-2">
        <Button 
            fullWidth 
            onClick={onNext}
            disabled={!config.referralSource}
            className="mb-2"
        >
          Next
        </Button>
        <Button variant="ghost" fullWidth onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
};
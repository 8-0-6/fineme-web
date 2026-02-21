import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';

export const StepName: React.FC<OnboardingStepProps> = ({ config, updateConfig, onNext, onBack }) => {
  return (
    <div className="flex flex-col h-full pt-6">
      <div className="flex-1 flex flex-col justify-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-3xl font-bold mb-4">Who is taking the oath?</h2>
            <p className="text-zinc-400 text-base mb-8">
                We need a name for the contract.
            </p>

            <div className="relative">
                <input 
                    type="text" 
                    value={config.name || ''}
                    onChange={(e) => updateConfig({ name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b-2 border-zinc-800 text-3xl font-bold text-white py-3 focus:outline-none focus:border-[#bef264] placeholder:text-zinc-800 transition-colors"
                    autoFocus
                />
            </div>
        </motion.div>
      </div>

      <div className="pt-4 pb-2">
        <Button 
            fullWidth 
            onClick={onNext}
            disabled={!config.name || config.name.length < 2}
        >
          Next
        </Button>
        <Button variant="ghost" fullWidth onClick={onBack} className="mt-2">
          Back
        </Button>
      </div>
    </div>
  );
};
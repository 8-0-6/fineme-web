import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Droplets, Stethoscope } from 'lucide-react';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';
import { CHARITIES } from '../../constants';

export const StepCharity: React.FC<OnboardingStepProps> = ({ config, updateConfig, onNext, onBack }) => {

  const getIcon = (name: string) => {
    switch (name) {
      case 'Heart': return <Heart size={18} />;
      case 'Globe': return <Globe size={18} />;
      case 'Stethoscope': return <Stethoscope size={18} />;
      case 'Droplets': return <Droplets size={18} />;
      default: return <Heart size={18} />;
    }
  };

  return (
    <div className="flex flex-col h-full pt-6">
      <div className="flex-1">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <h2 className="text-2xl font-bold mb-3">Select a Beneficiary</h2>
            <p className="text-zinc-400 text-base leading-relaxed">
            If you fail, your stake goes here. Choose a cause you care about.
            </p>
        </motion.div>

        <div className="space-y-2">
          {CHARITIES.map((charity, index) => {
            const isSelected = config.charity === charity.id;
            return (
              <motion.div
                key={charity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => updateConfig({ charity: charity.id })}
                className={`
                  relative p-3 rounded-2xl cursor-pointer border transition-all duration-300 group
                  ${isSelected 
                    ? 'bg-zinc-800 border-[#bef264] shadow-[0_0_15px_rgba(190,242,100,0.1)]' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Radio Indicator */}
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                    ${isSelected ? 'border-[#bef264] bg-[#bef264]' : 'border-zinc-700 bg-transparent'}
                  `}>
                     {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>

                  <div className={`
                    w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0
                    ${isSelected ? 'bg-[#bef264]/20 text-[#bef264]' : 'bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700'}
                  `}>
                    {getIcon(charity.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm mb-0.5 truncate ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                      {charity.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-tight truncate">
                      {charity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 pb-2">
        <Button 
            fullWidth 
            onClick={onNext} 
            disabled={!config.charity}
        >
          Confirm Charity
        </Button>
        <Button variant="ghost" fullWidth onClick={onBack} className="mt-2">
          Back
        </Button>
      </div>
    </div>
  );
};
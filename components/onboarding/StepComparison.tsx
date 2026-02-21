import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';

export const StepComparison: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  return (
    <div className="flex flex-col h-full pt-6">
        <div className="flex-1 flex flex-col justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h2 className="text-2xl font-bold mb-3">Why We Are Different.</h2>
                <p className="text-zinc-400 text-base leading-relaxed">
                    Most fitness apps rely on willpower. Willpower is a finite resource. We rely on loss.
                </p>
            </motion.div>

            <div className="space-y-3">
                {/* Competitor Card */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl opacity-50 grayscale"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-zinc-500" />
                            <span className="font-bold text-zinc-400 text-sm">Other Apps</span>
                        </div>
                        <TrendingDown className="text-zinc-500" size={18} />
                    </div>
                    <div className="pl-4 border-l-2 border-zinc-700 space-y-1.5 mt-2">
                        <div className="flex items-center gap-2 text-zinc-500 text-xs">
                            <X size={12} /> Rely on "Motivation"
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs">
                            <X size={12} /> Easy to ignore notifications
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs">
                            <X size={12} /> No real consequence
                        </div>
                    </div>
                </motion.div>

                {/* FineMe Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-zinc-800/50 border border-[#bef264] p-4 rounded-2xl relative shadow-[0_0_20px_rgba(190,242,100,0.1)]"
                >
                    <div className="absolute -top-2.5 right-4 bg-[#bef264] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Proven
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#bef264]" />
                            <span className="font-bold text-white text-sm">FineMe Protocol</span>
                        </div>
                        <TrendingUp className="text-[#bef264]" size={18} />
                    </div>
                    <div className="pl-4 border-l-2 border-[#bef264] space-y-1.5 mt-2">
                        <div className="flex items-center gap-2 text-white text-xs">
                            <Check size={12} className="text-[#bef264]" /> Uses Loss Aversion
                        </div>
                        <div className="flex items-center gap-2 text-white text-xs">
                            <Check size={12} className="text-[#bef264]" /> Impossible to ignore
                        </div>
                        <div className="flex items-center gap-2 text-white text-xs">
                            <Check size={12} className="text-[#bef264]" /> Real financial stakes
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        <div className="pt-4 pb-2">
            <Button fullWidth onClick={onNext}>
            I Understand
            </Button>
            <Button variant="ghost" fullWidth onClick={onBack} className="mt-2">
            Back
            </Button>
        </div>
    </div>
  );
};
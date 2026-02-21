import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';
import { MIN_STAKE } from '../../constants';

export const StepStake: React.FC<OnboardingStepProps> = ({ config, updateConfig, onNext, onBack }) => {
  
  const amounts = [10, 20, 50, 100];

  return (
    <div className="flex flex-col h-full pt-6">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-3">The Vault</h2>
        <p className="text-zinc-400 mb-6 text-base leading-relaxed">
          Deposit your stake. This money returns to you only if you succeed.
        </p>

        {/* Display */}
        <div className="bg-zinc-900 rounded-[2rem] py-6 px-8 border border-zinc-800 flex flex-col items-center justify-center mb-6 relative overflow-hidden shadow-2xl">
            {/* Background noise/texture */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #3f3f46 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="relative z-10 flex items-start justify-center text-white mb-1 gap-1">
                <DollarSign size={28} className="text-zinc-500 mt-2" strokeWidth={2.5} />
                <span className="text-6xl font-black tracking-tighter">{config.stakeAmount}</span>
            </div>
            <div className="relative z-10 text-zinc-500 font-mono text-xs tracking-widest uppercase">
                Escrow Amount
            </div>
        </div>

        {/* Slider & Presets */}
        <div className="mb-6 space-y-4">
            <div className="px-2">
                <input 
                    type="range" 
                    min="10" 
                    max="200" 
                    step="5" 
                    value={config.stakeAmount} 
                    onChange={(e) => updateConfig({ stakeAmount: Number(e.target.value) })}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#bef264] hover:accent-[#d9f99d] transition-all"
                />
            </div>

            <div className="grid grid-cols-4 gap-2">
                {amounts.map((amount) => (
                    <button
                        key={amount}
                        onClick={() => updateConfig({ stakeAmount: amount })}
                        className={`
                            py-2.5 rounded-xl font-bold transition-all text-xs
                            ${config.stakeAmount === amount 
                                ? 'bg-[#bef264] text-black shadow-lg scale-105' 
                                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}
                        `}
                    >
                        ${amount}
                    </button>
                ))}
            </div>
        </div>

        {/* Info Cards */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-3 space-y-2">
             <div className="flex items-start gap-3">
                <ShieldCheck className="text-emerald-500 mt-0.5 shrink-0" size={16} />
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    <span className="text-white font-semibold block mb-0.5">100% Safe</span>
                    Money stays yours as long as you complete your reps by midnight.
                </p>
            </div>
            <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={16} />
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    <span className="text-white font-semibold block mb-0.5">The Risk</span>
                    Failure triggers an automatic donation to the charity selected.
                </p>
            </div>
        </div>
      </div>

      <div className="pt-4 pb-2">
        <Button fullWidth onClick={onNext}>
          Deposit ${config.stakeAmount}
        </Button>
        <Button variant="ghost" fullWidth onClick={onBack} className="mt-2">
          Back
        </Button>
      </div>
    </div>
  );
};
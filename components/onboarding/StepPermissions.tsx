import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Lock, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';

export const StepPermissions: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  return (
    <div className="flex flex-col h-full pt-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-[#bef264] blur-3xl opacity-20 rounded-full" />
            <div className="w-28 h-28 bg-zinc-900 rounded-full border-2 border-zinc-800 flex items-center justify-center relative z-10">
                <Eye size={48} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-zinc-800 p-3 rounded-full border border-zinc-700 z-20">
                <Camera size={20} className="text-[#bef264]" />
            </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Meet "The Judge"</h2>
        <p className="text-zinc-400 mb-8 max-w-xs leading-relaxed text-base">
          FineMe uses AI to verify your pushups via the camera. No cheating allowed.
        </p>

        <div className="text-left w-full bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-4">
            <div className="flex gap-4">
                <div className="mt-1 bg-zinc-800 p-2 rounded-xl h-fit">
                    <Lock size={18} className="text-zinc-400" />
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-0.5 text-sm">Privacy First</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">Video is processed locally on your device. No footage is ever uploaded.</p>
                </div>
            </div>
             <div className="flex gap-4">
                <div className="mt-1 bg-zinc-800 p-2 rounded-xl h-fit">
                    <Camera size={18} className="text-zinc-400" />
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-0.5 text-sm">Real-time Feedback</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">The Judge counts loud and clear. It only counts perfect form.</p>
                </div>
            </div>
        </div>

      </div>

      <div className="pt-4 pb-2">
        <Button fullWidth onClick={onNext}>
          Enable Camera & Finish
        </Button>
        <Button variant="ghost" fullWidth onClick={onBack} className="mt-2">
          Back
        </Button>
      </div>
    </div>
  );
};
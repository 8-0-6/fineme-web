import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Smartphone } from 'lucide-react';
import { Button } from '../ui/Button';
import { OnboardingStepProps } from '../../types';

export const StepLogin: React.FC<OnboardingStepProps> = ({ onNext, onBack }) => {
  return (
    <div className="flex flex-col h-full pt-6">
        <div className="flex-1 flex flex-col justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-zinc-800 mx-auto flex items-center justify-center mb-5">
                    <Smartphone className="text-zinc-400" size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-3">Create Account</h2>
                <p className="text-zinc-400 text-base">
                    Secure your progress and payment details.
                </p>
            </motion.div>

            <div className="space-y-3">
                <button 
                    onClick={onNext}
                    className="w-full bg-white text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                    <Apple fill="black" size={22} />
                    Continue with Apple
                </button>
                
                <button 
                    onClick={onNext}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-transform hover:bg-zinc-800"
                >
                    {/* Google Icon SVG */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Continue with Google
                </button>
            </div>
            
            <p className="text-center text-[10px] text-zinc-600 mt-6">
                By continuing, you agree to our Terms of Service & Privacy Policy.
            </p>
        </div>

        <div className="pt-4 pb-2">
             <Button variant="ghost" fullWidth onClick={onBack}>
                Back
             </Button>
        </div>
    </div>
  );
};
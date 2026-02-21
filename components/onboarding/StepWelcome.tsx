import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  onNext: () => void;
}

export const StepWelcome: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="flex flex-col h-full relative">
      <motion.div 
        className="flex-1 flex flex-col justify-center items-start pt-10 pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-black tracking-tighter leading-[1.1] mb-6 text-white">
          YOUR <span className="text-[#bef264]">LAZINESS</span><br />
          JUST BECAME A TAX<br />
          <span className="text-white">WRITE-OFF.</span>
        </h1>
        <p className="text-zinc-500 text-base max-w-xs leading-relaxed mb-4">
          FineMe uses financial loss aversion to ensure you never miss a workout. 
        </p>
      </motion.div>

      <motion.div 
        className="pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800 mb-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">The Promise</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
                You set a goal. You stake money. If you fail, the money goes to charity. No excuses.
            </p>
        </div>

        <Button fullWidth onClick={onNext}>
          Start The Protocol <ArrowRight size={20} />
        </Button>
      </motion.div>
    </div>
  );
};
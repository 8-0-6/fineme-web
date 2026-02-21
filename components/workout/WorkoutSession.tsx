import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, RefreshCw, SwitchCamera, ScanLine } from 'lucide-react';

interface Props {
  targetReps: number;
  onComplete: (reps: number) => void;
  onClose: () => void;
}

export const WorkoutSession: React.FC<Props> = ({ targetReps, onComplete, onClose }) => {
  const [count, setCount] = useState(0);
  const [isPoseDetected, setIsPoseDetected] = useState(false);
  const [feedback, setFeedback] = useState<string>("Align your body");
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize Camera
  useEffect(() => {
    let stream: MediaStream;
    const startCamera = async () => {
        try {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: facingMode, width: { ideal: 720 }, height: { ideal: 1280 } } 
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            // Simulate pose detection delay
            setTimeout(() => {
                setIsPoseDetected(true);
                setFeedback("Get into plank position");
            }, 1500);
        } catch (err) {
            console.error("Camera error", err);
            setFeedback("Camera access denied");
        }
    };
    startCamera();
    return () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [facingMode]);

  const toggleCamera = () => {
      setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
      setIsPoseDetected(false);
  };

  // Simulate Rep Counting Logic for Demo purposes
  const handleSimulateRep = () => {
    if (count < targetReps) {
        setFeedback("Good form!");
        setCount(prev => prev + 1);
        setTimeout(() => setFeedback("Lower..."), 800);
    }
  };

  useEffect(() => {
    if (count >= targetReps) {
        setFeedback("Target Reached! Hold to finish.");
    }
  }, [count, targetReps]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      {/* Camera Feed */}
      <div className="absolute inset-0 z-0">
         <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover transition-transform duration-500 ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
         />
         
         {/* Skeleton Overlay */}
         <AnimatePresence>
            {isPoseDetected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                >
                    {/* Scanning Line Effect */}
                    <motion.div 
                        className="absolute w-full h-1 bg-[#bef264]/50 shadow-[0_0_15px_#bef264]"
                        animate={{ top: ['10%', '90%', '10%'] }}
                        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    />
                </motion.div>
            )}
         </AnimatePresence>

         {/* Grid Overlay */}
         <div className="absolute inset-0 pointer-events-none" style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
             backgroundSize: '100px 100px'
         }} />
      </div>

      {/* HUD - Heads Up Display */}
      <div className="relative z-10 flex flex-col h-full safe-area-inset-top px-6 pt-16 pb-6">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center">
            <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
            >
                <X size={20} />
            </button>
            
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPoseDetected ? 'bg-[#bef264]' : 'bg-red-500 animate-pulse'}`} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {isPoseDetected ? 'Tracking Active' : 'Align Body'}
                </span>
            </div>

            <button 
                onClick={toggleCamera}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
            >
                <SwitchCamera size={20} />
            </button>
        </div>

        {/* Rep Counter Center */}
        <div className="flex-1 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={count}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                >
                    <span className="text-[10rem] font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                        {count}
                    </span>
                    <span className="text-2xl text-zinc-300 font-medium">/ {targetReps}</span>
                </motion.div>
            </AnimatePresence>
            
            <motion.div 
                key={feedback}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-8 bg-black/50 backdrop-blur text-white px-6 py-3 rounded-xl border border-[#bef264]/30"
            >
                <span className="text-lg font-bold text-[#bef264]">{feedback}</span>
            </motion.div>
        </div>

        {/* Controls */}
        <div className="pb-8 flex flex-col items-center gap-4">
            
            {/* Dev/Simulate Button - Visible for demo */}
            <button 
                onClick={handleSimulateRep}
                className="active:scale-95 transition-transform bg-white/10 border border-white/20 p-4 rounded-full text-white"
            >
                <div className="flex flex-col items-center">
                   <RefreshCw size={24} />
                   <span className="text-[10px] uppercase mt-1">Simulate Rep</span>
                </div>
            </button>

            {count >= targetReps && (
                 <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => onComplete(count)}
                    className="w-full bg-[#bef264] text-black font-bold text-xl py-5 rounded-2xl shadow-[0_0_30px_rgba(190,242,100,0.4)]"
                 >
                    FINISH SESSION
                 </motion.button>
            )}
        </div>

      </div>
    </div>
  );
};
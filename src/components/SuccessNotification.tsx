import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";

interface SuccessNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function SuccessNotification({ 
  isOpen, 
  onClose, 
  duration = 5000 
}: SuccessNotificationProps) {
  const onCloseRef = useRef(onClose);
  
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onCloseRef.current();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden select-none">
          {/* Ambient Blurred Dark Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Glowing Animated Modal Body */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(239, 35, 60, 0.15)"
            }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-[#0a0a0c]/95 border border-white/10 rounded-3xl p-8 text-center text-white z-10 overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            {/* Grid Pattern Background Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(239,35,60,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(239,35,60,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Elegant Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-[#ef233c] p-2 hover:bg-white/5 rounded-full cursor-pointer transition-all duration-300 border border-transparent hover:border-[#ef233c]/30"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>

            {/* Premium Animated Glowing Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer Ring with Accent Crimson glow */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full border border-dashed border-[#ef233c]/40"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-5 rounded-full border border-dotted border-[#ef233c]/20"
                />

                {/* Inner Glowing Core */}
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="h-16 w-16 bg-[#ef233c]/10 border-2 border-[#ef233c] rounded-full flex items-center justify-center text-[#ef233c] shadow-[0_0_25px_rgba(239,35,60,0.4)]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <Check size={32} strokeWidth={3.5} className="drop-shadow-[0_0_8px_rgba(239,35,60,0.6)]" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Header / Title */}
            <h3 className="font-mono font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] via-[#ff4d6d] to-white tracking-wider uppercase mb-1">
              REQUEST RECEIVED
            </h3>
            
            <p className="text-white font-bold text-base mb-4">
              Thank you for contacting us.
            </p>
            
            {/* Body text with precise requirements */}
            <div className="space-y-3 text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
              <p>
                Your request has been successfully received and assigned to our enterprise engineering team.
              </p>
              <p>
                One of our senior specialists will contact you within the next 24 hours.
              </p>
              <p className="text-[#ef233c] font-bold uppercase tracking-widest text-[11px] pt-1 font-mono">
                Thank you for choosing CoreVision.
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={onClose}
              className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(239,35,60,0.35)] hover:shadow-[0_0_30px_rgba(239,35,60,0.6)] hover:scale-[1.02] cursor-pointer border-none font-mono"
            >
              Dismiss Window
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

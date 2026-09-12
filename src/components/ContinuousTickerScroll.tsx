import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Shield, 
  Sparkles, 
  Cpu, 
  Activity, 
  Layers, 
  Radio, 
  CheckCircle2, 
  ArrowDown
} from "lucide-react";

export const ContinuousTickerScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress across the 350vh scroll journey
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out spring physics for weight and tactile scrub feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to horizontal translation
  // Moves the track from right-offset to end of strip
  const xTranslate = useTransform(smoothProgress, [0, 1], ["0%", "-78%"]);

  // Secondary kinetic transformations
  const sparkleRotate = useTransform(smoothProgress, [0, 1], [0, 720]);
  const ringScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.25, 1]);
  const ringRotate = useTransform(smoothProgress, [0, 1], [0, -180]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[320vh] bg-[#08080a] text-[#f4ede2] select-none"
    >
      {/* Sticky Fullscreen Viewport Track */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center bg-[#0d0c0c] relative">
        
        {/* Ambient background grid and radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1f1315_0%,#0d0c0c_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(239,35,60,0.12),transparent_70%)] blur-3xl" />
        </div>

        {/* Top subtle hint indicator */}
        <div className="relative z-20 pt-8 flex items-center gap-2 text-zinc-500 font-mono text-[11px] uppercase tracking-[0.25em]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ef233c] animate-pulse" />
          <span>Interactive Continuous Ticker Track</span>
        </div>

        {/* Horizontal Continuous Ticker Strip */}
        <div className="w-full relative z-10 flex items-center overflow-hidden py-12">
          <motion.div 
            style={{ x: xTranslate }}
            className="inline-flex items-center whitespace-nowrap pl-[6vw] pr-[15vw] will-change-transform"
          >
            {/* SEGMENT 1: In every infrastructure */}
            <span className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] font-sans">
              In
            </span>
            <span className="text-[clamp(4.5rem,10vw,11rem)] font-semibold leading-none tracking-[-0.01em] italic mr-[clamp(1.5rem,3vw,3.5rem)] font-serif text-white">
              every
            </span>

            {/* Inline Badge Connector: High-Precision Core Shield */}
            <div className="inline-flex items-center gap-3.5 bg-white/[0.06] border border-white/15 rounded-full px-6 py-3.5 backdrop-blur-md mr-[clamp(1.5rem,3vw,3.5rem)] shrink-0 shadow-[0_4px_20px_rgba(239,35,60,0.25)]">
              <div className="w-10 h-10 rounded-full bg-[#ef233c]/20 border border-[#ef233c]/40 flex items-center justify-center text-[#ef233c]">
                <Shield size={22} className="filter drop-shadow-[0_0_8px_#ef233c]" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f8be56]">
                  ZERO LOSS
                </div>
                <div className="text-[9px] text-zinc-400 font-semibold tracking-wider">
                  SLA CERTIFIED
                </div>
              </div>
            </div>

            <span className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] text-[#ef233c] drop-shadow-[0_0_60px_rgba(239,35,60,0.5)] font-sans">
              Deployment,
            </span>

            {/* SEGMENT 2: discover the undeniable */}
            <span 
              className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] font-sans text-transparent"
              style={{ WebkitTextStroke: "2px #f4ede2" }}
            >
              discover
            </span>
            <span className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] font-sans">
              the
            </span>

            {/* Inline Wave Dynamic Connector (Animated Glowing Circuit Beam) */}
            <div className="w-[clamp(140px,16vw,240px)] h-[clamp(50px,6vw,80px)] mr-[clamp(1.5rem,3vw,3.5rem)] shrink-0 flex items-center">
              <svg className="w-full h-full" viewBox="0 0 200 60">
                <defs>
                  <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path 
                  d="M 5 30 Q 50 5, 100 30 T 195 30" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="none" 
                />
                <motion.path 
                  d="M 5 30 Q 50 5, 100 30 T 195 30" 
                  stroke="#ef233c" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="none" 
                  filter="url(#waveGlow)"
                  style={{
                    pathLength: smoothProgress
                  }}
                />
              </svg>
            </div>

            <span className="text-[clamp(4.5rem,10vw,11rem)] font-semibold leading-none tracking-[-0.01em] italic mr-[clamp(1.5rem,3vw,3.5rem)] font-serif text-white">
              undeniable
            </span>

            {/* SEGMENT 3: Real Magic / Core Precision */}
            {/* Inline Kinetic Sparkle Icon */}
            <motion.div 
              style={{ rotate: sparkleRotate }}
              className="inline-flex justify-center items-center w-[clamp(50px,7vw,90px)] h-[clamp(50px,7vw,90px)] mr-[clamp(1.5rem,3vw,3.5rem)] shrink-0"
            >
              <svg className="w-full h-full fill-[#f8be56] filter drop-shadow-[0_0_12px_rgba(248,190,86,0.6)]" viewBox="0 0 24 24">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </motion.div>

            <span className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] text-[#ef233c] drop-shadow-[0_0_60px_rgba(239,35,60,0.5)] font-sans">
              Real
            </span>
            <span 
              className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] font-sans text-transparent"
              style={{ WebkitTextStroke: "2px #f4ede2" }}
            >
              Precision
            </span>
            <span className="text-[clamp(4.5rem,10vw,11rem)] font-semibold leading-none tracking-[-0.01em] italic mr-[clamp(1.5rem,3vw,3.5rem)] font-serif text-white">
              of
            </span>

            {/* SEGMENT 4: sharing pure Refreshment / protecting pure Infrastructure */}
            <div className="inline-flex items-center justify-center h-[clamp(3.5rem,6.5vw,6.5rem)] px-[clamp(1.5rem,2.5vw,3rem)] rounded-full bg-[#f4ede2] text-[#0d0c0c] text-[clamp(1.5rem,3.5vw,4rem)] font-black tracking-[-0.03em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] shrink-0 shadow-[0_0_30px_rgba(244,237,226,0.3)]">
              <span>protecting</span>
            </div>

            <span className="text-[clamp(4.5rem,10vw,11rem)] font-semibold leading-none tracking-[-0.01em] italic mr-[clamp(1.5rem,3vw,3.5rem)] font-serif text-white">
              pure
            </span>
            <span className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] font-sans">
              Infrastructure
            </span>

            {/* SEGMENT 5: that brings us Together */}
            {/* Inline Ring Graphic Conjunction */}
            <motion.div 
              style={{ scale: ringScale, rotate: ringRotate }}
              className="w-[clamp(60px,8vw,110px)] h-[clamp(60px,8vw,110px)] border-[3px] border-dashed border-[#f8be56] rounded-full inline-flex items-center justify-center mr-[clamp(1.5rem,3vw,3.5rem)] shrink-0 relative"
            >
              <div className="w-[40%] h-[40%] bg-[#ef233c] rounded-full shadow-[0_0_15px_#ef233c]" />
            </motion.div>

            <span className="text-[clamp(4.5rem,10vw,11rem)] font-semibold leading-none tracking-[-0.01em] italic mr-[clamp(1.5rem,3vw,3.5rem)] font-serif text-white">
              that
            </span>
            <span className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] font-sans">
              brings
            </span>
            <span className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[clamp(1.5rem,3vw,3.5rem)] font-sans">
              us
            </span>

            {/* Climax Word with final Crimson Halo */}
            <span className="text-[clamp(4.5rem,10vw,11rem)] font-black leading-none tracking-[-0.04em] uppercase mr-[25vw] text-[#ef233c] drop-shadow-[0_0_80px_rgba(239,35,60,0.7)] font-sans">
              Together.
            </span>
          </motion.div>
        </div>

        {/* Bottom Progress Bar Pinned to Viewport */}
        <div className="relative z-20 w-full pb-4 px-6 flex items-center justify-between">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            Scroll Track Sync
          </div>
          <div className="flex-1 mx-6 h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              style={{ scaleX: smoothProgress }}
              className="h-full w-full bg-gradient-to-r from-[#f8be56] via-[#ef233c] to-[#ff4d6d] origin-left rounded-full"
            />
          </div>
          <div className="text-[10px] font-mono text-[#ef233c] font-bold">
            100% HARDWARE CALIBRATED
          </div>
        </div>

      </div>
    </div>
  );
};

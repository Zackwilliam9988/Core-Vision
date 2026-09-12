import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Activity, Radio, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroVideoBackgroundProps {
  onExploreClick?: () => void;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Real-time precision timestamp for AI CCTV HUD
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toTimeString().split(" ")[0];
      const millis = String(now.getMilliseconds()).padStart(3, "0");
      setCurrentTimeStr(`${timeString}.${millis}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-black">
      {/* High-definition AI Surveillance & Optical Infrastructure Video Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=2560&q=100"
        className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.1] scale-102 transition-all duration-700"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-urban-traffic-at-night-44855-large.mp4" type="video/mp4" />
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Gradient Overlays for High-End Professionalism & Contrast */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

      {/* High-Tech Grid Matrix Scrim */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* Moving Red Noir Laser Scanner Line */}
      <motion.div 
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ef233c] to-transparent shadow-[0_0_20px_#ef233c] pointer-events-none z-10"
      />

      {/* Clean, Cinematic Center Title Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-15 pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-black/65 backdrop-blur-md border border-white/20 px-8 py-5 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.9),0_0_20px_rgba(239,35,60,0.15)] max-w-xl"
        >
          <div className="inline-flex items-center gap-2 text-[#ef233c] font-mono text-[10.5px] font-extrabold uppercase tracking-widest mb-1.5">
            <Sparkles size={13} className="animate-spin text-[#ef233c]" style={{ animationDuration: "8s" }} />
            <span>PRECISION OPTICAL & SURVEILLANCE INFRASTRUCTURE</span>
          </div>
          <h2 className="font-['Open_Sans_Condensed'] text-3xl sm:text-5xl text-white font-light uppercase tracking-wider leading-tight">
            High Precision Digital Infrastructure
          </h2>
        </motion.div>
      </div>

      {/* Bottom Video Play / Pause Control Pill */}
      <div className="absolute bottom-4 right-4 sm:right-8 z-20 pointer-events-auto">
        <button
          onClick={togglePlay}
          className="inline-flex items-center gap-2 bg-black/80 hover:bg-black text-white hover:text-[#ef233c] border border-white/20 px-3 py-1.5 rounded-full text-[9.5px] font-mono font-bold shadow-lg transition-all cursor-pointer backdrop-blur-md"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <>
              <Pause size={10} className="text-[#ef233c]" />
              <span>LIVE FEED</span>
            </>
          ) : (
            <>
              <Play size={10} className="text-zinc-400" />
              <span>PAUSED</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

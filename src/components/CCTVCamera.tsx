import React, { useState, useEffect } from "react";

export const CCTVCamera: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Blinking Recording LED Indicator
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 1000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div 
      className="fixed top-24 right-8 z-45 flex flex-col items-end pointer-events-auto select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-center justify-center">
        {/* Futuristic Tech Connection Cable line to the ceiling/top of the screen */}
        <div className="absolute top-[-96px] right-[32px] w-[2px] h-[96px] bg-gradient-to-b from-[#ef233c]/0 via-[#ef233c]/30 to-[#ef233c] opacity-70 z-0" />

        {/* Outer glowing scan HUD ring */}
        <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#ef233c]/40 animate-spin [animation-duration:30s] pointer-events-none" />
        <div className="absolute -inset-1 rounded-full border border-red-500/20 pointer-events-none animate-pulse-glow" />

        {/* Ultra-realistic circular CCTV Camera casing using high-quality image */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#ef233c] shadow-[0_0_25px_rgba(239,35,60,0.4)] bg-black z-10 group">
          <img 
            src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=200&q=80" 
            alt="Ultra-realistic security camera"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-110 group-hover:scale-115 transition-transform duration-500 filter brightness-[0.9]"
          />
          
          {/* Glass reflection gradient flare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/10 to-transparent pointer-events-none z-15" />
          
          {/* Scanning sweep line */}
          <div className="absolute left-0 right-0 h-[1.5px] bg-[#ef233c] opacity-75 shadow-[0_0_10px_#ef233c] animate-bounce pointer-events-none z-20" style={{ animationDuration: '4s' }} />

          {/* RED RECORDING LED INDICATOR */}
          <div className="absolute top-2 right-3.5 z-25 flex items-center justify-center">
            <span 
              className={`w-1.5 h-1.5 rounded-full transition-opacity duration-300 ${
                isBlinking ? 'bg-red-500 opacity-100 shadow-[0_0_10px_#EF4444,0_0_4px_#EF4444]' : 'bg-red-500/30 opacity-60'
              }`} 
            />
          </div>

          {/* GREEN OPERATIONAL STATUS LED */}
          <div className="absolute bottom-2 left-3.5 z-25 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          </div>
        </div>
      </div>

      {/* Clean Live Status Indicator Badge */}
      <div 
        className={`mt-2.5 mr-1 transition-all duration-300 flex items-center gap-2 bg-[#0a0a0c]/95 border border-white/15 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md ${
          hovered ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-bold text-white text-[11px] font-sans">4K Live CCTV Feed Active</span>
      </div>
    </div>
  );
};

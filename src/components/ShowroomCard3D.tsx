import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Service } from "../types";
import { ArrowRight } from "lucide-react";

interface ShowroomCard3DProps {
  service: Service;
  index: number;
  onSelect: (service: Service) => void;
}

export const ShowroomCard3D: React.FC<ShowroomCard3DProps> = ({
  service,
  index,
  onSelect
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Alternating scroll entry direction (0: Left, 1: Right, 2: Top, 3: Bottom)
  const pattern = index % 4;
  const getInitialProps = () => {
    if (pattern === 0) return { x: -85, y: 0, rotateY: -12, rotateX: 0 };
    if (pattern === 1) return { x: 85, y: 0, rotateY: 12, rotateX: 0 };
    if (pattern === 2) return { y: -65, x: 0, rotateX: 12, rotateY: 0 };
    return { y: 65, x: 0, rotateX: -12, rotateY: 0 };
  };
  const initialAnim = getInitialProps();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialAnim, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ 
        type: "spring",
        stiffness: 75,
        damping: 14,
        mass: 0.85,
        delay: (index % 3) * 0.07
      }}
      className="w-full mb-3.5"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(service)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative h-[96px] w-full block cursor-pointer select-none rounded-xl group transition-shadow duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_35px_rgba(239,35,60,0.25)]"
      >
        {/* Ambient 3D Glow Backlight */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ef233c] to-[#d90429] rounded-xl opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 pointer-events-none" />

        {/* LEFT PANE - Action & Info (3D Raised) */}
        <div 
          style={{ transform: "translateZ(25px)" }}
          className="absolute left-0 right-[48%] top-0 bottom-0 box-border border border-white/10 group-hover:border-[#ef233c] border-r-0 font-semibold bg-[#0a0a0c] group-hover:bg-[#121214] text-white group-hover:text-[#ef233c] rounded-l-xl flex flex-col items-center justify-center p-3 transition-all duration-300 z-10 text-center"
        >
          <span className="font-['Open_Sans'] font-bold text-xs uppercase tracking-wider line-clamp-1 leading-snug">
            {service.title}
          </span>
          
          <div className="flex items-center gap-1 text-[9px] text-zinc-500 group-hover:text-[#ef233c] font-mono mt-1 font-bold transition-colors">
            <span>Explore Blueprint</span>
            <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* RIGHT PANE - Thumbnail with Black Cut Corner */}
        <div
          style={{ 
            backgroundImage: `url('${service.imageUrl}')`,
            transform: "translateZ(10px)"
          }}
          className="absolute left-[52%] right-0 top-0 bottom-0 bg-center bg-cover bg-no-repeat border border-white/10 group-hover:border-[#ef233c] border-l-0 rounded-r-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.01]"
        >
          {/* Subtle Overlay Scrim */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />

          {/* Signature INOVE Corner Triangle Cut for Red Noir */}
          <div 
            className="absolute right-0 bottom-0 w-0 h-0 border-solid border-[18px] border-transparent border-t-0 border-r-0 border-b-black z-20"
          />

          {/* 3D Floating Hardware Spec Pill on Hover */}
          <motion.div 
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.85 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 right-2 bg-black/90 backdrop-blur-md text-white border border-[#ef233c]/40 px-2 py-0.5 rounded font-mono text-[8px] font-bold z-10 pointer-events-none"
          >
            SLA CERTIFIED
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

import React from "react";
import { Service } from "../types";
import { ArrowRight } from "lucide-react";

interface ShowroomCard3DProps {
  service: Service;
  index: number;
  onSelect: (service: Service) => void;
}

export const ShowroomCard3D: React.FC<ShowroomCard3DProps> = ({
  service,
  onSelect
}) => {
  return (
    <div className="w-full mb-3">
      <div
        onClick={() => onSelect(service)}
        className="relative h-24 w-full flex rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 overflow-hidden cursor-pointer group transition-colors select-none"
      >
        {/* Left Pane - Action & Info */}
        <div className="w-1/2 p-3 flex flex-col justify-center text-left bg-zinc-900 border-r border-zinc-800/80">
          <span className="font-medium text-xs text-white group-hover:text-[#ef233c] transition-colors line-clamp-1">
            {service.title}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-zinc-500 group-hover:text-zinc-300 font-mono mt-1 transition-colors">
            <span>Explore Details</span>
            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Right Pane - Thumbnail */}
        <div
          style={{ backgroundImage: `url('${service.imageUrl}')` }}
          className="w-1/2 bg-center bg-cover bg-no-repeat relative"
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
          
          {/* Subtle Cut Corner */}
          <div 
            className="absolute right-0 bottom-0 w-0 h-0 border-solid border-[14px] border-transparent border-t-0 border-r-0 border-b-black z-10"
          />
        </div>
      </div>
    </div>
  );
};

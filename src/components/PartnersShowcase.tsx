import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

export interface PartnerBrand {
  id: string;
  name: string;
  category: string;
  tagline: string;
  accentColor: string;
  svgIcon: React.ReactNode;
}

export const PARTNERS_DATA: PartnerBrand[] = [
  {
    id: "zkteco",
    name: "ZKTeco",
    category: "Biometric & Access AI",
    tagline: "Facial Recognition & Relays",
    accentColor: "#10B981",
    svgIcon: (
      <div className="w-full flex items-center justify-center h-9">
        <svg viewBox="0 0 120 36" fill="currentColor" className="h-6 w-auto flex items-center mx-auto text-white">
          <text x="50%" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" letterSpacing="1.5">
            ZKT<tspan fill="#10B981">eco</tspan>
          </text>
        </svg>
      </div>
    )
  },
  {
    id: "hikvision",
    name: "HIKVISION",
    category: "4K AI Surveillance",
    tagline: "ColorVu & AcuSense Ultra NVR",
    accentColor: "#ef233c",
    svgIcon: (
      <div className="w-full flex items-center justify-center h-9">
        <svg viewBox="0 0 160 36" fill="currentColor" className="max-h-7 max-w-[115px] w-auto mx-auto" role="img" aria-label="Hikvision Logo">
          <text x="50%" y="26" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1.5">
            <tspan fill="#ffffff">HIK</tspan><tspan fill="#ef233c">VISION</tspan>
          </text>
        </svg>
      </div>
    )
  },
  {
    id: "dahua",
    name: "DAHUA",
    category: "Smart IoT & Video Core",
    tagline: "WizSense & Thermal Optics",
    accentColor: "#ef233c",
    svgIcon: (
      <div className="w-full flex items-center justify-center h-9">
        <svg viewBox="0 0 130 36" fill="currentColor" className="h-6 w-auto flex items-center mx-auto text-white">
          <circle cx="16" cy="18" r="8" fill="#ef233c" />
          <path d="M16 10 A 8 8 0 0 1 24 18 L 20 18 A 4 4 0 0 0 16 14 Z" fill="#000000" />
          <text x="32" y="26" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" letterSpacing="1.5" fill="#ffffff">
            <tspan fill="#ef233c">d</tspan>ahua
          </text>
        </svg>
      </div>
    )
  },
  {
    id: "imou",
    name: "IMOU",
    category: "Cloud Edge Surveillance",
    tagline: "Smart IoT & Wireless PTZ",
    accentColor: "#F59E0B",
    svgIcon: (
      <div className="w-full flex items-center justify-center h-9">
        <svg viewBox="0 0 110 36" fill="currentColor" className="h-6 w-auto flex items-center mx-auto text-white">
          <text x="50%" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" letterSpacing="2">
            <tspan fill="#F59E0B">Im</tspan><tspan fill="#ffffff">ou</tspan>
          </text>
        </svg>
      </div>
    )
  },
  {
    id: "huawei",
    name: "HUAWEI",
    category: "Telecom & Optical Core",
    tagline: "OptiX Optical & AirEngine APs",
    accentColor: "#ef233c",
    svgIcon: (
      <div className="w-full flex items-center justify-center h-9">
        <svg viewBox="0 0 140 36" fill="currentColor" className="h-6 w-auto flex items-center mx-auto">
          <g fill="#ef233c">
            <path d="M18,3 C16,7 16,11 18,14 C20,11 20,7 18,3 Z" />
            <path d="M12,5 C11,9 12,13 15,15 C16,12 15,8 12,5 Z" />
            <path d="M24,5 C21,8 20,12 21,15 C24,13 25,9 24,5 Z" />
            <path d="M8,9 C8,13 10,16 13,17 C13,14 11,10 8,9 Z" />
            <path d="M28,9 C25,10 23,14 23,17 C26,16 28,13 28,9 Z" />
          </g>
          <text x="36" y="24" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1.5" fill="#ffffff">
            HUAWEI
          </text>
        </svg>
      </div>
    )
  },
  {
    id: "cisco",
    name: "CISCO",
    category: "Enterprise Switching",
    tagline: "Catalyst Switches & Meraki",
    accentColor: "#ef233c",
    svgIcon: (
      <div className="w-full flex items-center justify-center h-9">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 57" className="max-h-7 max-w-[80px] w-auto mx-auto" role="img">
          <title id="fw-c-header__logo-title">Cisco.com Worldwide</title>
          <defs>
            <path d="M0 22.769a2.348 2.348 0 0 0 3.935 1.545c.434-.403.7-.955.744-1.545v-5.2a2.34 2.34 0 0 0-4.679 0v5.2" id="bar_short" className="bar" />
            <path d="M12.95 22.769a2.349 2.349 0 0 0 2.34 2.171 2.346 2.346 0 0 0 2.339-2.171V11.112a2.341 2.341 0 0 0-4.679 0V22.77" id="bar_tall" className="bar" />
            <path d="M25.832 27.464a2.345 2.345 0 0 0 4.678 0V2.249a2.342 2.342 0 0 0-4.678 0v25.215" id="bar_grande" className="bar" />
            <path d="M24.026 56.277v-5.002l-.098.043a9.253 9.253 0 0 1-3.605.915 5.303 5.303 0 0 1-3.63-1.07 4.644 4.644 0 0 1-1.58-2.244 5.395 5.395 0 0 1-.106-3 4.6 4.6 0 0 1 1.609-2.566 4.823 4.823 0 0 1 2.528-1.09 8.332 8.332 0 0 1 4.774.895l.108.056v-5.03l-.228-.061a12.78 12.78 0 0 0-4.552-.596 10.534 10.534 0 0 0-4.065.93 9.29 9.29 0 0 0-3.329 2.572 10.014 10.014 0 0 0-.182 12.18 9.546 9.546 0 0 0 5.292 3.403c2.211.538 4.528.456 6.697-.234l.367-.101" id="cisco_c" />
          </defs>
          <g fill="#ef233c" fillRule="evenodd">
            <use href="#cisco_c" />
            <use href="#cisco_c" x="49.5" />
            <path d="M41.69 52.125l-.019 4.308.315.054c.989.185 1.987.313 2.99.385a18.1 18.1 0 0 0 2.642.051c.842-.06 1.675-.218 2.48-.468a6.862 6.862 0 0 0 2.573-1.371 5.19 5.19 0 0 0 1.498-2.148 5.912 5.912 0 0 0-.03-4.324 4.852 4.852 0 0 0-1.343-1.862 5.568 5.568 0 0 0-1.97-1.147l-3.25-1.206a1.742 1.742 0 0 1-.887-.845 1.107 1.107 0 0 1 .036-.986 1.29 1.29 0 0 1 .217-.291 1.75 1.75 0 0 1 .48-.347c.363-.18.755-.293 1.158-.337a6.76 6.76 0 0 1 2.072.022c.81.088 1.613.231 2.402.43l.168.037v-3.974l-.31-.067a21.14 21.14 0 0 0-2.444-.435 12.545 12.545 0 0 0-3.213-.014 6.945 6.945 0 0 0-3.699 1.488 4.908 4.908 0 0 0-1.58 2.178 5.984 5.984 0 0 0-.003 4.05c.242.65.63 1.237 1.136 1.714.437.422.932.78 1.47 1.065.708.38 1.458.675 2.235.878.257.077.512.158.766.243l.385.141.11.045c.38.136.726.35 1.018.628.202.19.358.423.455.683.06.237.061.485.003.723a1.536 1.536 0 0 1-.744.892 3.691 3.691 0 0 1-1.239.387 9 9 0 0 1-1.92.097 21.973 21.973 0 0 1-2.507-.334c-.433-.09-.864-.19-1.291-.303l-.16-.04zM30.546 56.607h4.73V37.846h-4.73zM85.305 43.386a4.934 4.934 0 1 1 6.157 7.711 4.934 4.934 0 0 1-6.157-7.71m-6.867 3.848A9.87 9.87 0 0 0 90.44 56.72a9.629 9.629 0 0 0 3.157-17.729 9.934 9.934 0 0 0-15.16 8.244" />
            <use href="#bar_short" x="0" />
            <use href="#bar_tall" x="0" />
            <use href="#bar_grande" x="0" />
            <use href="#bar_tall" x="25.875" />
            <use href="#bar_short" x="51.75" />
            <use href="#bar_tall" x="51.75" />
            <use href="#bar_grande" x="51.75" />
            <use href="#bar_tall" x="77.625" />
            <use href="#bar_short" x="103.375" />
          </g>
        </svg>
      </div>
    )
  },
  {
    id: "vivanco",
    name: "VIVANCO",
    category: "Structured Cabling",
    tagline: "German Cat6A & Modular Racks",
    accentColor: "#ef233c",
    svgIcon: (
      <div className="w-full flex items-center justify-center h-9">
        <svg viewBox="0 0 150 36" fill="currentColor" className="h-6 w-auto flex items-center mx-auto text-white">
          <text x="50%" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" letterSpacing="3">
            VIVAN<tspan fill="#ef233c">CO</tspan>
          </text>
        </svg>
      </div>
    )
  },
  {
    id: "corning",
    name: "CORNING",
    category: "Optical Fiber Systems",
    tagline: "Single-Mode OS2 & OM4 Core",
    accentColor: "#ef233c",
    svgIcon: (
      <div className="relative w-full flex items-center justify-center h-9 px-2 overflow-hidden rounded-md group-hover:scale-105 transition-transform mx-auto">
        <span className="relative z-10 font-sans font-black text-[14px] sm:text-[15px] tracking-[2.5px] text-white drop-shadow-xs">
          CORNING
        </span>
      </div>
    )
  }
];

export const PartnersShowcase: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`py-12 bg-[#0a0a0c] border-y border-white/10 text-white ${className}`}>
      <div className="w-[85%] max-w-[1500px] mx-auto text-left">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#ef233c] font-mono text-[10px] font-bold uppercase tracking-widest mb-1">
              <Award size={13} />
              <span>OFFICIAL OEM HARDWARE PARTNERS</span>
            </div>
            <h3 className="font-['Open_Sans_Condensed'] text-3xl sm:text-4xl text-white font-light uppercase tracking-wide">
              Certified Technology & Hardware Standards
            </h3>
          </div>
          <span className="text-zinc-500 font-mono text-xs font-bold uppercase tracking-wider">
            100% Genuine Direct Deployment
          </span>
        </div>

        {/* 8 Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-8">
          {PARTNERS_DATA.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-black border border-white/10 hover:border-[#ef233c] rounded-2xl p-4 flex flex-col items-center justify-between text-center hover:shadow-[0_0_25px_rgba(239,35,60,0.25)] transition-all duration-300 group cursor-default select-none min-h-[140px]"
            >
              {/* Centered Logo Area */}
              <div className="w-full text-white flex items-center justify-center h-10 py-1">
                {partner.svgIcon}
              </div>

              {/* Centered Info Details */}
              <div className="w-full mt-3 pt-2.5 border-t border-white/10 space-y-0.5 text-center">
                <span className="block font-['Open_Sans'] font-bold text-[11px] text-white group-hover:text-[#ef233c] transition-colors uppercase tracking-wider truncate">
                  {partner.name}
                </span>
                <span className="block font-mono text-[8.5px] text-zinc-400 font-medium leading-tight truncate">
                  {partner.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

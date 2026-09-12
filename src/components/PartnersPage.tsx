import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Activity, 
  Layers, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Workflow, 
  Network, 
  Server, 
  Lock, 
  Phone,
  ArrowRight,
  ShieldAlert,
  Zap,
  Globe
} from "lucide-react";

interface PartnersPageProps {
  onTriggerQuote?: (serviceId?: string) => void;
}

interface PartnerAlliance {
  id: string;
  name: string;
  tier: string;
  role: string;
  accentColor: string;
  logoType: "custom" | "image" | "brand";
  imageUrl?: string;
  brandColor?: string;
  description: string;
  coreIntegration: string[];
  specs: { label: string; value: string }[];
  complianceBadge: string;
  category: "surveillance" | "ai" | "iot" | "biometric" | "networking";
}

const PARTNER_ALLIANCES: PartnerAlliance[] = [
  {
    id: "partner-hikvision",
    name: "Hikvision",
    tier: "TIER-1 GLOBAL OEM ALLIANCE",
    role: "Tier-1 Surveillance & Video Telemetry Partner",
    accentColor: "#ef233c",
    logoType: "custom",
    brandColor: "#ef233c",
    description: "World-leading provider of security products and solutions, delivering ultra-high-definition optical surveillance, ColorVu night-vision matrices, and AcuSense deep-learning algorithms for enterprise facilities.",
    coreIntegration: [
      "Enterprise NVRs (16/32/64-Channel RAID Arrays)",
      "IP Dome & Bullet Optics (2MP, 4MP, 8MP Smart Detection)",
      "ColorVu F1.0 Ultra-Aperture Night Color Feeds",
      "AcuSense False-Alarm Reduction & Human/Vehicle Triage",
      "Thermal Perimeter Intrusion Detection Cameras"
    ],
    specs: [
      { label: "Channel Density", value: "Up to 128 CH / NVR" },
      { label: "Optical Resolution", value: "4K UHD (3840x2160)" },
      { label: "Encoding Standard", value: "H.265+ Smart Codec" },
      { label: "Telemetry Interface", value: "HikCentral VMS API" }
    ],
    complianceBadge: "ISO 9001 / CE / FCC CERTIFIED",
    category: "surveillance"
  },
  {
    id: "partner-dahua",
    name: "Dahua Technology",
    tier: "STRATEGIC AI OPTICS ALLIANCE",
    role: "Smart AI & Optical Infrastructure Partner",
    accentColor: "#ef233c",
    logoType: "image",
    imageUrl: "https://www.dahuasecurity.com/logo.png",
    brandColor: "#ef233c",
    description: "Industry benchmark in smart video surveillance and IoT solutions, empowering Core Vision deployments with WizSense edge AI compute, perimeter protection tripwires, and intelligent traffic telemetry.",
    coreIntegration: [
      "WizSense AI Analytics with SMD+ (Smart Motion Detection Plus)",
      "Long-Range Thermal Optics & Radiometric Temperature Monitoring",
      "TiOC 3-in-1 Active Deterrence PTZs (Red/Blue Siren + Strobe)",
      "Full-Color AI Dual-Lens Night Surveillance",
      "DSS Enterprise Video Management & Mobile Telemetry Sync"
    ],
    specs: [
      { label: "AI Engine", value: "WizSense Deep Learning" },
      { label: "Thermal Sensitivity", value: "NETD < 40mK" },
      { label: "Perimeter Range", value: "100m+ Active Shield" },
      { label: "PTZ Tracking", value: "Auto-Tracking 3.0" }
    ],
    complianceBadge: "ONVIF PROFILE S/G/T COMPLIANT",
    category: "ai"
  },
  {
    id: "partner-imou",
    name: "Imou",
    tier: "EDGE IOT & WIRELESS ALLIANCE",
    role: "Edge IoT & Wireless Perimeter Security",
    accentColor: "#f97316",
    logoType: "custom",
    brandColor: "#f97316",
    description: "Consumer and commercial edge IoT security pioneer, providing high-bandwidth wireless camera nodes, cloud analytics, and flexible perimeter security for dynamic office complexes and remote access sites.",
    coreIntegration: [
      "Wireless Perimeter Sensor Nodes & 2.4/5GHz Mesh Relays",
      "Smart Commercial IoT Endpoints & Multi-Zone Motion Detectors",
      "Battery-Backed Wireless Surveillance with Solar Power Pods",
      "AI Human Detection with Cloud Telemetry Backhaul",
      "Two-Way Audio Intercoms & Remote Deterrence Beacons"
    ],
    specs: [
      { label: "Wireless Protocol", value: "Wi-Fi 6 Dual-Band / Mesh" },
      { label: "Local Storage", value: "MicroSD 512GB / NVR Link" },
      { label: "Coverage Angle", value: "360° Pan & Tilt Coverage" },
      { label: "Cloud Sync", value: "Imou Protect Telemetry" }
    ],
    complianceBadge: "AES-128 ENCRYPTED STORAGE",
    category: "iot"
  },
  {
    id: "partner-zkteco",
    name: "ZKTeco",
    tier: "ENTERPRISE BIOMETRIC ALLIANCE",
    role: "Biometric Access Control & Time-Attendance Systems",
    accentColor: "#15803d",
    logoType: "custom",
    brandColor: "#15803d",
    description: "Globally acclaimed leader in biometric verification technologies, engineering multi-factor facial recognition terminals, contactless palm-vein scanners, and automated access control gates for secure facilities.",
    coreIntegration: [
      "Multi-Biometric Access Terminals with Visible Light Facial AI",
      "High-Throughput Flap Barriers & Automated Optical Turnstiles",
      "Smart Entrance Controllers with Multi-Door Wiegand/RS485 Relays",
      "Time & Attendance Cloud Sync with Enterprise HRMS Connectors",
      "RFID / Mifare / Mobile NFC Credential Validation Nodes"
    ],
    specs: [
      { label: "Verification Speed", value: "< 0.3s Facial Match" },
      { label: "Template Capacity", value: "50,000+ Faces / Node" },
      { label: "Anti-Spoofing", value: "Live Dual-Camera IR AI" },
      { label: "Platform Backbone", value: "ZKBioSecurity Enterprise" }
    ],
    complianceBadge: "ISO 27001 DATA PROTECTION ALIGNED",
    category: "biometric"
  },
  {
    id: "partner-huawei",
    name: "Huawei",
    tier: "ENTERPRISE TELECOM ALLIANCE",
    role: "Enterprise Networking & Core Telemetry Backbone",
    accentColor: "#ef233c",
    logoType: "image",
    imageUrl: "https://www.huawei.com/-/media/hcomponent-header/1.0.1.20260519084135/component/img/huawei_logo.png",
    brandColor: "#ef233c",
    description: "Global telecommunications and optical transmission giant, delivering high-density PoE+ switching matrices, core routing backbones, and optical distribution networks that power Core Vision's mission-critical data corridors.",
    coreIntegration: [
      "CloudEngine & eKit High-Density Gigabit PoE+ Switches",
      "Enterprise Routing Backbones with Multi-WAN Failover",
      "Cloud Telemetry Transmission & Campus Wi-Fi 6/7 Access Points",
      "OptiX Optical Distribution Hubs & Singlemode SFP+ Trunks",
      "Centralized Cloud-Managed Network Orchestration (iMaster NCE)"
    ],
    specs: [
      { label: "Switching Capacity", value: "Up to 598 Gbps Core" },
      { label: "PoE Budget", value: "370W - 740W Per Rack" },
      { label: "Optical Trunk", value: "10G/40G SFP+ Uplinks" },
      { label: "Uptime Reliability", value: "99.999% Carrier-Grade" }
    ],
    complianceBadge: "CARRIER-GRADE TELECOM CERTIFIED",
    category: "networking"
  }
];

export const PartnersPage: React.FC<PartnersPageProps> = ({ onTriggerQuote }) => {
  return (
    <div className="bg-[#000000] min-h-screen text-white font-sans relative overflow-x-hidden pt-28 pb-24">
      
      {/* Background Ambience: Circuit Tech Grid & Crimson Flares */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 48px x 48px Circuit Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Ambient Top Red Flare */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[650px] bg-[radial-gradient(circle_at_top_center,rgba(239,35,60,0.12),transparent_70%)] blur-2xl" />
        
        {/* Secondary Ambient Accent Flares */}
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[radial-gradient(circle,rgba(239,35,60,0.06),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[radial-gradient(circle,rgba(239,35,60,0.06),transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION A: AMBIENT HEADER & HERO BANNER */}
        <div className="text-left mb-16 sm:mb-20 max-w-4xl">
          
          {/* Telemetry Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#ef233c] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
              CERTIFIED TECHNOLOGY ALLIANCES // ECOSYSTEM TIERS
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-black font-sans tracking-tight text-white leading-tight mb-6"
          >
            Tier-1 Hardware <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] via-[#ff4d6d] to-[#ef233c]">Ecosystem & Alliances</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans max-w-3xl"
          >
            Core Vision Pakistan integrates certified enterprise hardware exclusively through direct OEM partnerships. From defense-grade optical sensors to carrier-grade telecom backbones, every component is rigorously tested for zero-defect compliance and high-uptime endurance.
          </motion.p>

          {/* Quick Statistics Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div>
              <span className="block text-2xl font-mono font-bold text-white">100%</span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">OEM Direct Sourcing</span>
            </div>
            <div>
              <span className="block text-2xl font-mono font-bold text-[#ef233c]">5 Global</span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Tier-1 Alliances</span>
            </div>
            <div>
              <span className="block text-2xl font-mono font-bold text-emerald-400">99.98%</span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Hardware SLA Guarantee</span>
            </div>
            <div>
              <span className="block text-2xl font-mono font-bold text-zinc-200">ISO/IEC</span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">27001 Calibrated</span>
            </div>
          </div>
        </div>

        {/* SECTION B: CERTIFIED PARTNER ALLIANCE CARDS */}
        <div className="space-y-8 mb-20 text-left">
          {PARTNER_ALLIANCES.map((partner, idx) => {
            return (
              <motion.div
                key={partner.id}
                id={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#0b0b0e] hover:bg-[#111115] border border-white/10 hover:border-zinc-700 rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-2xl relative overflow-hidden group"
              >
                {/* Top Subtle Red Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ef233c]/30 to-transparent group-hover:via-[#ef233c] transition-all duration-500" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Brand Identity & Overview (5 cols) */}
                  <div className="lg:col-span-5 space-y-5">
                    
                    {/* Tier & Compliance Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#ef233c] bg-[#ef233c]/10 border border-[#ef233c]/30 px-2.5 py-0.5 rounded">
                        {partner.tier}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                        {partner.complianceBadge}
                      </span>
                    </div>

                    {/* Partner Brand Visual / Logo Box */}
                    <div className="h-20 w-full sm:w-72 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center p-4 shadow-inner">
                      {partner.id === "partner-hikvision" ? (
                        <div className="flex items-center justify-center">
                          <span className="font-sans font-black text-2xl sm:text-3xl tracking-wider text-white">
                            HIK<span className="text-[#ef233c]">VISION</span>
                          </span>
                        </div>
                      ) : partner.id === "partner-imou" ? (
                        <div className="flex items-center justify-center">
                          <span className="font-sans font-black text-2xl sm:text-3xl tracking-widest text-[#f97316]">
                            Im<span className="text-white">ou</span>
                          </span>
                        </div>
                      ) : partner.id === "partner-zkteco" ? (
                        <div className="flex items-center justify-center">
                          <span className="font-sans font-black text-2xl sm:text-3xl tracking-wider text-white">
                            ZKT<span className="text-[#15803d]">eco</span>
                          </span>
                        </div>
                      ) : partner.imageUrl ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img 
                            src={partner.imageUrl} 
                            alt={`${partner.name} logo`}
                            className="max-h-12 max-w-[180px] object-contain filter brightness-110 contrast-125"
                            onError={(e) => {
                              // Fallback to high-contrast typographic badge if remote asset encounters network restriction
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.parentElement?.querySelector(".fallback-text") as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                          <div className="fallback-text hidden items-center justify-center font-sans font-black text-2xl tracking-wider text-white">
                            {partner.name.toUpperCase()}
                          </div>
                        </div>
                      ) : (
                        <span className="font-sans font-black text-2xl text-white tracking-wider">
                          {partner.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-sans text-white group-hover:text-[#ef233c] transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wide">
                        {partner.role}
                      </p>
                    </div>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                      {partner.description}
                    </p>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => onTriggerQuote && onTriggerQuote()}
                        className="inline-flex items-center gap-2 bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(239,35,60,0.3)] cursor-pointer"
                      >
                        <Sparkles size={13} />
                        <span>Deploy {partner.name} Infrastructure</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Core Integrations & Hardware Telemetry (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Core Integration Matrix */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold mb-3 flex items-center gap-2">
                        <Workflow size={14} className="text-[#ef233c]" />
                        <span>Certified Hardware Integrations</span>
                      </h4>
                      
                      <div className="space-y-2">
                        {partner.coreIntegration.map((feat, fIdx) => (
                          <div 
                            key={fIdx}
                            className="bg-black/50 border border-zinc-800/80 rounded-xl p-3 flex items-start gap-3 hover:border-zinc-700 transition-colors"
                          >
                            <div className="h-5 w-5 rounded-md bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 size={12} />
                            </div>
                            <span className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hardware Specifications Grid */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold mb-3 flex items-center gap-2">
                        <Cpu size={14} className="text-[#ef233c]" />
                        <span>Technical Telemetry Specifications</span>
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {partner.specs.map((spec, sIdx) => (
                          <div 
                            key={sIdx}
                            className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-3 text-left"
                          >
                            <span className="block text-[10px] font-mono text-zinc-500 uppercase truncate">
                              {spec.label}
                            </span>
                            <span className="block text-xs sm:text-sm font-mono font-bold text-white mt-1 truncate">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SECTION C: QUALITY ASSURANCE & VERIFICATION BANNER */}
        <div className="bg-[#0b0b0e] border border-white/10 rounded-3xl p-8 sm:p-12 text-left shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(239,35,60,0.08),transparent_60%)] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                <ShieldCheck size={14} />
                <span>Zero-Tolerance Grey Market Policy</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-sans text-white tracking-tight">
                Authentic OEM Hardware Warranty & SLA Support
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed max-w-2xl">
                Every unit provisioned by Core Vision Pakistan includes verifiable OEM serial registries, manufacturer backed replacement warranties, and direct engineering escalation for firmware and security patch protocols.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <button
                onClick={() => onTriggerQuote && onTriggerQuote()}
                className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-sans font-bold text-xs py-3 px-5 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(239,35,60,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Request OEM Bill of Materials</span>
              </button>

              <a
                href="https://wa.me/923064422550?text=Hello%20Core%20Vision%2C%20I%20would%20like%20to%20inquire%20about%20your%20certified%20partner%20hardware%20and%20OEM%20deployments."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-sans font-semibold text-xs py-3 px-5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Direct Technical WhatsApp</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

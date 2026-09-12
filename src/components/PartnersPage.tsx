import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Radio, 
  Layers, 
  Activity, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  Server, 
  Zap, 
  ShieldCheck,
  Building2,
  Lock,
  Workflow
} from 'lucide-react';

export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  role: string;
  isTextLogo?: boolean;
  textColor?: string;
  logoSrc?: string;
  description: string;
  specs: string[];
  hardwareScope: string;
  specsPill: string;
  accentColor: string;
  icon: React.ElementType;
}

const PARTNERS: PartnerItem[] = [
  {
    id: "hikvision",
    name: "HIKVISION",
    category: "TIER-1 OPTICAL SURVEILLANCE",
    role: "Tier-1 Optical Surveillance & Video Telemetry Partner",
    isTextLogo: true,
    textColor: "text-[#ef233c]",
    description: "Enterprise optical telemetry, 32-channel high-throughput NVR backbones, and smart 4K perimeter security matrices.",
    hardwareScope: "Enterprise NVRs (32-Channel), IP Optics (2MP, 4MP, 8MP Smart Detection)",
    specsPill: "PROTOCOL: ONVIF / H.265+",
    specs: ["CORE: NVR & IP CAM", "RESOLUTION: UP TO 8MP", "PROTOCOL: ONVIF S/G/T"],
    accentColor: "#ef233c",
    icon: Shield
  },
  {
    id: "dahua",
    name: "Dahua Technology",
    category: "AI & PERIMETER ANALYTICS",
    role: "Smart AI & Optical Infrastructure Partner",
    isTextLogo: false,
    logoSrc: "https://www.dahuasecurity.com/logo.png",
    description: "Deep-learning WizSense analytics engines, thermal monitoring nodes, and active intrusion deterrent hardware.",
    hardwareScope: "WizSense AI analytics, thermal optical feeds, automated perimeter shielding",
    specsPill: "AI ANALYTICS: ACTIVE",
    specs: ["DETECTION: HUMAN / VEHICLE", "OPTICS: DUAL-LENS", "ENCODING: AI H.265"],
    accentColor: "#ef233c",
    icon: Radio
  },
  {
    id: "imou",
    name: "Imou",
    category: "EDGE IOT & RAPID DEPLOYMENT",
    role: "Edge IoT & Wireless Perimeter Security",
    isTextLogo: true,
    textColor: "text-[#f97316]",
    description: "High-agility wireless security endpoints and smart cloud-synced micro sensor clusters for rapid perimeter deployment.",
    hardwareScope: "Smart wireless sensors, edge IoT surveillance nodes, automated alert triggers",
    specsPill: "NODES: DUAL-BAND WIRELESS",
    specs: ["CONNECTIVITY: WI-FI 6", "STORAGE: HYBRID CLOUD", "ALERT: REAL-TIME PUSH"],
    accentColor: "#f97316",
    icon: Zap
  },
  {
    id: "zkteco",
    name: "ZKTeco",
    category: "BIOMETRIC ACCESS CONTROL",
    role: "Biometric Access Control & Physical Identity Systems",
    isTextLogo: true,
    textColor: "text-[#15803d]",
    description: "High-throughput facial recognition turnstiles, RFID/biometric door controllers, and unified physical access compliance.",
    hardwareScope: "Multi-biometric access terminals, automated optical turnstiles, attendance integration",
    specsPill: "INTERFACE: RS-485 / WIEGAND",
    specs: ["AUTHENTICATION: MULTI-MODAL", "LATENCY: < 0.35S", "VERIFICATION: FAR < 0.001%"],
    accentColor: "#15803d",
    icon: Activity
  },
  {
    id: "huawei",
    name: "Huawei",
    category: "NETWORK BACKBONE & POE TELEMETRY",
    role: "Enterprise Networking & Core Telemetry Backbone",
    isTextLogo: false,
    logoSrc: "https://www.huawei.com/-/media/hcomponent-header/1.0.1.20260519084135/component/img/huawei_logo.png",
    description: "Mission-critical industrial Ethernet switching backbones and high-budget PoE distribution for continuous uptime.",
    hardwareScope: "Enterprise PoE switches (4-Port, 8-Port, Core), industrial routing backbones",
    specsPill: "STANDARDS: IEEE 802.3AT / POE+",
    specs: ["TOPOLOGY: 10G UPLINK", "POE BUDGET: HIGH-DENSITY", "SWITCHING: LAYER 3"],
    accentColor: "#ef233c",
    icon: Layers
  }
];

interface PartnersPageProps {
  onTriggerQuote?: () => void;
  onNavigate?: (route: { page: string }) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ 
  onTriggerQuote,
  onNavigate
}) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ef233c] selection:text-white pt-28 pb-24 relative overflow-hidden font-sans">
      
      {/* Background Cyber Grid & Red Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#ef233c]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,35,60,0.05),transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="h-2 w-2 rounded-full bg-[#ef233c] animate-ping" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">
              CERTIFIED ECOSYSTEM // HARDWARE ALLIANCES
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-sans tracking-tight mb-6">
            Engineered Alongside <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#ef233c]">
              Industry Standards
            </span>
          </h1>

          <p className="text-zinc-400 font-sans text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            CoreGuard directly integrates with tier-1 surveillance, optical AI, biometrics, and enterprise networking manufacturers to deliver hardened security infrastructure across Pakistan.
          </p>
        </div>

        {/* Strategic Alliances Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {PARTNERS.map((partner, idx) => {
            const Icon = partner.icon;

            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#0c0c0e] hover:bg-[#121215] border border-zinc-800 hover:border-[#ef233c]/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 shadow-2xl group flex flex-col justify-between"
              >
                {/* Tech Bracket Corner Highlights */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-700 group-hover:border-[#ef233c] transition-colors" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-700 group-hover:border-[#ef233c] transition-colors" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-700 group-hover:border-[#ef233c] transition-colors" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-700 group-hover:border-[#ef233c] transition-colors" />

                <div>
                  {/* Partner Header */}
                  <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800/80">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{partner.category}</span>
                      </div>
                      {partner.isTextLogo ? (
                        <span className={`text-2xl sm:text-3xl font-black font-mono tracking-wider ${partner.textColor || "text-white"}`}>
                          {partner.name}
                        </span>
                      ) : (
                        <div className="h-8 flex items-center">
                          <img 
                            src={partner.logoSrc} 
                            alt={partner.name} 
                            className="max-h-7 max-w-[140px] object-contain filter brightness-95 invert group-hover:filter-none transition-all"
                            onError={(e) => {
                              // Fallback to stylized wordmark if external URL fails
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-2xl font-black font-mono tracking-wider text-white">${partner.name}</span>`;
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Role & Description */}
                  <div className="space-y-3 mb-6">
                    <p className="text-white text-sm font-semibold font-sans">
                      {partner.role}
                    </p>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                      {partner.description}
                    </p>
                  </div>

                  {/* Hardware Scope Panel */}
                  <div className="bg-black/60 border border-zinc-800/80 rounded-xl p-3.5 mb-6 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-500 uppercase">Hardware Scope:</span>
                      <span className="text-[#ef233c] font-semibold">{partner.specsPill}</span>
                    </div>
                    <p className="text-zinc-300 text-xs font-mono">
                      {partner.hardwareScope}
                    </p>
                  </div>
                </div>

                {/* Specs List & Badge Footer */}
                <div>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/80">
                    {partner.specs.map((spec, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[10px] font-mono bg-zinc-900/80 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise Compliance Standards Banner */}
        <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl mb-16">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-[10px] font-mono font-bold uppercase mb-3">
                <ShieldCheck size={13} />
                <span>Zero OEM Counterfeiting Guarantee</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-sans text-white mb-2">
                100% Genuine Hardware & Factory Warranties
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
                All hardware sourced through CoreGuard retains full official manufacturer warranty, genuine firmware verification, and direct RMA support channel routing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              {onTriggerQuote && (
                <button
                  onClick={onTriggerQuote}
                  className="bg-[#ef233c] hover:bg-[#d90429] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(239,35,60,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Request Hardware Quote</span>
                </button>
              )}
              {onNavigate && (
                <button
                  onClick={() => onNavigate({ page: 'services' })}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Deployments</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

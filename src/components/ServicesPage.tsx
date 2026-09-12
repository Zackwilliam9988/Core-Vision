import React, { useState } from "react";
import { Service } from "../types";
import { LucideIcon } from "./LucideIcon";
import { 
  Search, 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Layers, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ShieldAlert, 
  ArrowUpRight, 
  Zap, 
  Cable, 
  CheckCircle, 
  Eye, 
  Sliders, 
  Award,
  Calculator,
  ExternalLink,
  Flame
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServicesPageProps {
  services: Service[];
  onSelectService: (service) => void;
  onBackToHome: () => void;
  onTriggerQuote: (serviceId?: string) => void;
}

// Domain-specific engineering telemetry specs and feature chips for each service
const serviceSpecs: Record<string, {
  categoryLabel: string;
  badgeType: string;
  chips: { label: string; highlight?: boolean }[];
  telemetry: { label: string; val: string }[];
  guaranteeText: string;
}> = {
  "cctv-install": {
    categoryLabel: "SURVEILLANCE MATRIX",
    badgeType: "4K ULTRA HD",
    chips: [
      { label: "4K UHD Sony Starvis", highlight: true },
      { label: "100m Smart IR Array" },
      { label: "RAID NVR Storage" }
    ],
    telemetry: [
      { label: "Sensor Array", val: "Ultra 4K Sony Starvis" },
      { label: "Night Vision", val: "100m Dual Infrared" },
      { label: "Stream Security", val: "H.265+ End-to-End" }
    ],
    guaranteeText: "Zero Blindspot Mapping"
  },
  "fiber-splicing": {
    categoryLabel: "OPTICAL TRUNKING",
    badgeType: "JAPANESE FUSION",
    chips: [
      { label: "Fujikura Thermal Fusion", highlight: true },
      { label: "Loss-Free Splice Validation" },
      { label: "ITU-T OS2 Single-Mode" }
    ],
    telemetry: [
      { label: "Splicer Engine", val: "Fujikura Core-Alignment" },
      { label: "Insertion Loss", val: "Loss-Free Certified" },
      { label: "Protection", val: "Micro Heat-Shrink" }
    ],
    guaranteeText: "Japanese Fusion Precision"
  },
  "network-setup": {
    categoryLabel: "ENTERPRISE ROUTING",
    badgeType: "GIGABIT CORE",
    chips: [
      { label: "10 Gbps Backplane", highlight: true },
      { label: "VLAN Network Isolation" },
      { label: "Wi-Fi 6 High Coverage" }
    ],
    telemetry: [
      { label: "Bandwidth", val: "10 Gbps Fiber Uplink" },
      { label: "AP Matrix", val: "Zero Dead-Zone Beam" },
      { label: "Firewall", val: "Layer 3 Deep Packet" }
    ],
    guaranteeText: "Enterprise VLAN Isolation"
  },
  "cctv-repair": {
    categoryLabel: "SYSTEM SLA SUPPORT",
    badgeType: "RAPID RESPONSE",
    chips: [
      { label: "<60 Min Field Dispatch", highlight: true },
      { label: "OEM Brand Components" },
      { label: "RF Signal Sweep" }
    ],
    telemetry: [
      { label: "SLA Window", val: "<60 Min Priority Dispatch" },
      { label: "Diagnostics", val: "Voltage & Wave Sweep" },
      { label: "Warranty", val: "1-Year Full Coverage" }
    ],
    guaranteeText: "Priority Field Dispatch"
  },
  "fiber-testing": {
    categoryLabel: "OTDR DIAGNOSTICS",
    badgeType: "CERTIFIED SCAN",
    chips: [
      { label: "Dual 1310/1550nm Laser", highlight: true },
      { label: "±1 cm Fault Pinpointing" },
      { label: "120 km Max Trace" }
    ],
    telemetry: [
      { label: "Reflectometer", val: "Dual Wavelength OTDR" },
      { label: "Dead-Zone", val: "≤0.8m Ultra Precision" },
      { label: "Compliance", val: "Full PDF SLA Audit Logs" }
    ],
    guaranteeText: "Trace Accuracy ±1cm"
  },
  "biometric-system": {
    categoryLabel: "ACCESS CONTROL",
    badgeType: "AI BIOMETRIC",
    chips: [
      { label: "Dynamic Facial & Touch", highlight: true },
      { label: "<0.2s Access Speed" },
      { label: "Magnetic Relay Lock" }
    ],
    telemetry: [
      { label: "Recognition", val: "Dual IR Facial Scan" },
      { label: "Anti-Spoofing", val: "Live Capacitive Sensor" },
      { label: "Integration", val: "Auto Payroll Sync Cloud" }
    ],
    guaranteeText: "Sub-Second Identification"
  },
  "structured-cabling": {
    categoryLabel: "STRUCTURED CABLING",
    badgeType: "CAT6A CERTIFIED",
    chips: [
      { label: "Cat6/6A Solid Copper", highlight: true },
      { label: "500 MHz Frequency" },
      { label: "Armored Conduit Trunking" }
    ],
    telemetry: [
      { label: "Wire Standard", val: "Cat6A Shielded Pair" },
      { label: "Certification", val: "Fluke Tested Link-by-Link" },
      { label: "Rack Layout", val: "Modular Velcro Bundling" }
    ],
    guaranteeText: "100% Fluke Link Certified"
  },
  "remote-cctv": {
    categoryLabel: "CLOUD TELEMETRY",
    badgeType: "SECURE TUNNEL",
    chips: [
      { label: "Encrypted SSL/TLS DDNS", highlight: true },
      { label: "iOS & Android Native" },
      { label: "<50ms Low-Latency Stream" }
    ],
    telemetry: [
      { label: "Remote Access", val: "Encrypted VPN / DDNS" },
      { label: "Alerts", val: "Instant Push Motion Triggers" },
      { label: "Multi-User", val: "Role-Based Guard" }
    ],
    guaranteeText: "Zero Port Hijacking Shield"
  }
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onSelectService,
  onBackToHome,
  onTriggerQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "security" | "fiber" | "network">("all");

  const filteredServices = services.filter((s) => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.fullDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "all") return matchesSearch;
    if (selectedCategory === "security") {
      return matchesSearch && (s.id.includes("cctv") || s.id.includes("biometric") || s.id.includes("home"));
    }
    if (selectedCategory === "fiber") {
      return matchesSearch && s.id.includes("fiber");
    }
    if (selectedCategory === "network") {
      return matchesSearch && (s.id.includes("network") || s.id.includes("cabling") || s.id.includes("support"));
    }
    return matchesSearch;
  });

  const filterTabs = [
    { id: "all", label: "All Solutions", icon: Layers, count: services.length },
    { id: "security", label: "Surveillance & Access", icon: ShieldCheck, count: services.filter(s => s.id.includes("cctv") || s.id.includes("biometric")).length },
    { id: "fiber", label: "Fiber Optics (OTDR)", icon: Activity, count: services.filter(s => s.id.includes("fiber")).length },
    { id: "network", label: "Structured Networking", icon: Cpu, count: services.filter(s => s.id.includes("network") || s.id.includes("cabling")).length }
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.04
      }
    }
  };

  return (
    <div className="pt-28 pb-28 bg-black min-h-screen text-white font-sans relative overflow-hidden">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(239,35,60,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(239,35,60,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Return Hook */}
        <div className="mb-8 text-left">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs font-bold font-mono tracking-widest text-zinc-300 hover:text-[#ef233c] uppercase transition-all duration-300 cursor-pointer bg-[#0a0a0c] border border-white/10 hover:border-[#ef233c] px-4 py-2 rounded-full shadow-sm hover:shadow-[0_0_15px_rgba(239,35,60,0.3)]"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform stroke-[2.5] text-[#ef233c]" />
            <span>Return to Overview</span>
          </motion.button>
        </div>

        {/* Hero Header Section */}
        <div className="text-left mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#ef233c]/10 border border-[#ef233c]/30 rounded-full px-4 py-1.5 text-[10px] text-[#ef233c] font-mono font-bold uppercase tracking-widest shadow-xs">
                <Sparkles size={12} className="text-[#ef233c] animate-pulse" />
                <span>CERTIFIED TELECOM & SURVEILLANCE INFRASTRUCTURE</span>
              </div>
              
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                Engineering Solutions & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] via-rose-500 to-red-600">
                  Infrastructure Catalog
                </span>
              </h1>
              
              <p className="text-zinc-400 text-base leading-relaxed max-w-2xl font-normal pt-1">
                Precision optical fiber fusion splicing with Japanese Fujikura equipment, ultra 4K CCTV surveillance deployments, OTDR optical distance mapping, and certified Cat6 structural layouts.
              </p>
            </div>
            
            {/* Quick Metrics Badge */}
            <div className="bg-[#0a0a0c] border border-white/10 p-5 rounded-2xl flex items-center gap-6 sm:gap-8 shadow-sm hover:border-[#ef233c]/40 transition-all self-start lg:self-auto">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-white tracking-tight">{services.length}</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-bold mt-1 block">Active Capabilities</span>
              </div>
              <div className="h-9 w-px bg-white/10" />
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#ef233c] tracking-tight">4K UHD</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-bold mt-1 block">Hardware Grade</span>
              </div>
              <div className="h-9 w-px bg-white/10" />
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">100%</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-bold mt-1 block">SLA Tested</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0a0a0c] border border-white/10 p-3 rounded-2xl shadow-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? "bg-[#ef233c] text-white shadow-[0_0_20px_rgba(239,35,60,0.35)] scale-[1.02]" 
                      : "bg-[#121214] text-zinc-400 hover:bg-white/5 hover:text-white border border-white/5"
                  }`}
                >
                  <TabIcon size={14} className={isSelected ? "text-white" : "text-zinc-500"} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-white/10 text-zinc-400"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] md:max-w-xs">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text"
              placeholder="Search solutions or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] focus:bg-black rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Clean Modern Professional Services Grid */}
        <div>
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredServices.map((service, idx) => {
                const spec = serviceSpecs[service.id] || {
                  categoryLabel: "CERTIFIED SYSTEM",
                  badgeType: "ENTERPRISE",
                  chips: [{ label: "High-Integrity Build", highlight: true }],
                  telemetry: [],
                  guaranteeText: "Enterprise Certified"
                };

                return (
                  <div
                    key={service.id}
                    onClick={() => onSelectService(service)}
                    className="group bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-200 cursor-pointer text-left"
                  >
                    <div>
                      {/* Image Preview Header */}
                      <div className="relative w-full h-48 overflow-hidden bg-black">
                        <img 
                          src={service.imageUrl} 
                          alt={service.title} 
                          className="w-full h-full object-cover filter brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Top Left: Category Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/75 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>{spec.categoryLabel}</span>
                        </div>

                        {/* Top Right: Status Tag */}
                        <div className="absolute top-3 right-3">
                          {service.hot ? (
                            <span className="bg-[#ef233c] text-white px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wide flex items-center gap-1">
                              <Flame size={10} className="fill-white" />
                              <span>POPULAR</span>
                            </span>
                          ) : (
                            <span className="bg-black/75 backdrop-blur-sm text-zinc-400 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono">
                              {spec.badgeType}
                            </span>
                          )}
                        </div>

                        {/* Bottom image overlay: Title & Icon */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-base sm:text-lg text-white tracking-tight leading-snug group-hover:text-[#ef233c] transition-colors">
                            {service.title}
                          </h3>
                          <div className="h-7 w-7 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                            <LucideIcon name={service.iconName} size={14} />
                          </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 space-y-3">
                        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 min-h-[34px]">
                          {service.description}
                        </p>

                        {/* Hardware Telemetry Specs */}
                        {spec.telemetry && spec.telemetry.length > 0 && (
                          <div className="bg-black/50 border border-zinc-800/80 rounded-lg p-2.5 space-y-1.5 text-[11px] font-mono">
                            {spec.telemetry.map((t, tIdx) => (
                              <div key={tIdx} className="flex items-center justify-between">
                                <span className="text-zinc-500">{t.label}:</span>
                                <span className="text-zinc-300 font-medium text-right truncate ml-2">{t.val}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Feature Chips */}
                        {spec.chips && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {spec.chips.map((chip, cIdx) => (
                              <span 
                                key={cIdx} 
                                className={`text-[10px] px-2 py-0.5 rounded border ${
                                  chip.highlight 
                                    ? "bg-[#ef233c]/10 border-[#ef233c]/20 text-[#ef233c] font-medium" 
                                    : "bg-zinc-800/40 border-zinc-800 text-zinc-400"
                                }`}
                              >
                                {chip.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-4 pt-0">
                      <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onSelectService(service); }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-[#ef233c] text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors cursor-pointer"
                        >
                          <span>View Details</span>
                          <ChevronRight size={13} />
                        </button>

                        <button 
                          onClick={(e) => { e.stopPropagation(); onTriggerQuote(service.id); }}
                          className="inline-flex items-center justify-center p-2 rounded-lg border border-[#ef233c]/30 bg-[#ef233c]/10 text-[#ef233c] hover:bg-[#ef233c] hover:text-white transition-colors cursor-pointer"
                          title="Get Quote"
                        >
                          <Calculator size={14} />
                        </button>
                        
                        <a 
                          href={`https://wa.me/923064422550?text=${encodeURIComponent(`Hello Core Vision Pakistan, I would like to inquire about ${service.title}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center p-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                          title="WhatsApp Inquiry"
                        >
                          <MessageCircle size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#0a0a0c] border border-white/10 rounded-3xl max-w-xl mx-auto mt-6 shadow-2xl">
              <div className="h-12 w-12 rounded-2xl bg-[#ef233c]/10 border border-[#ef233c]/20 text-[#ef233c] flex items-center justify-center mx-auto mb-4">
                <ShieldAlert size={22} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">No matching services found</h3>
              <p className="text-zinc-400 text-xs max-w-sm mx-auto leading-relaxed font-sans">
                No security hardware or structural parameters matched "{searchQuery}". Restructure your search query or reset filters.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="mt-5 bg-[#ef233c] hover:bg-[#d90429] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all tracking-wider cursor-pointer shadow-[0_0_15px_rgba(239,35,60,0.3)]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Enterprise Compliance & Hardware Standards Strip */}
        <div className="mt-16 bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award size={14} className="text-[#ef233c]" />
              <span className="block text-[10px] font-mono text-[#ef233c] uppercase tracking-widest font-black">
                ENTERPRISE OEM HARDWARE COMPLIANCE
              </span>
            </div>
            <h4 className="text-white font-bold text-sm sm:text-base">
              Configured exclusively with certified telecom, optical, and surveillance standards
            </h4>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-zinc-400 font-mono font-bold tracking-widest">
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">ZKTECO</span>
            <span>•</span>
            <span className="hover:text-[#ef233c] transition-colors cursor-pointer">HIKVISION</span>
            <span>•</span>
            <span className="hover:text-[#ef233c] transition-colors cursor-pointer">DAHUA</span>
            <span>•</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">IMOU</span>
            <span>•</span>
            <span className="hover:text-rose-500 transition-colors cursor-pointer">HUAWEI</span>
            <span>•</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">CISCO</span>
            <span>•</span>
            <span className="hover:text-[#ef233c] transition-colors cursor-pointer">VIVANCO</span>
            <span>•</span>
            <span className="hover:text-rose-400 transition-colors cursor-pointer">CORNING</span>
          </div>
        </div>

      </div>
    </div>
  );
};

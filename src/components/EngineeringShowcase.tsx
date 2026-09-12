import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";

interface EngineeringShowcaseProps {
  onTriggerQuote: (serviceId?: string) => void;
  onExploreServices: () => void;
}

const engineeringPillars = [
  {
    title: "4K AI Surveillance Matrix",
    subtitle: "Precision Optical Mapping",
    desc: "Laser-calculated camera positioning with ultra 4K Sony Starvis sensors, eliminating blindspots and optical reflections.",
    specs: [
      { label: "Sensor Array", val: "Sony Starvis 4K UHD" },
      { label: "Coverage", val: "Zero Blindspots Verified" },
      { label: "Stream Security", val: "H.265+ / AES-256 GCM" }
    ]
  },
  {
    title: "Japanese Optical Fusion",
    subtitle: "Fujikura Core-Alignment",
    desc: "Sub-decibel optical trunk splicing ensuring lossless data transit over multi-kilometer corporate backbones.",
    specs: [
      { label: "Insertion Loss", val: "≤ 0.018 dB Certified" },
      { label: "Equipment", val: "Fujikura Japan Core Align" },
      { label: "Verification", val: "Dual 1310/1550nm OTDR" }
    ]
  },
  {
    title: "10G Structured Cabling",
    subtitle: "Cat6A High-Throughput Core",
    desc: "Modular patch bay topologies with 500 MHz solid copper cabling, physical metallic conduit shielding, and VLAN isolation.",
    specs: [
      { label: "Frequency", val: "500 MHz Solid Copper" },
      { label: "Testing", val: "100% Fluke Link Certified" },
      { label: "Backbone", val: "10 Gbps SFP+ Uplink" }
    ]
  },
  {
    title: "Enterprise SLA & Support",
    subtitle: "Guaranteed On-Site Dispatch",
    desc: "Continuous SLA support with rapid field dispatch throughout Islamabad and Rawalpindi industrial & commercial zones.",
    specs: [
      { label: "Dispatch Window", val: "<60 Min Priority SLA" },
      { label: "Parts Standard", val: "100% OEM Brand Genuine" },
      { label: "Warranty", val: "1-Year Comprehensive" }
    ]
  }
];

const deploymentSteps = [
  {
    num: "01",
    title: "Laser Site Survey & CAD Mapping",
    desc: "Complete structural inspection, angle laser scans, and CAD routing design to ensure zero blindspots."
  },
  {
    num: "02",
    title: "Fujikura Fusion & Optical Pull",
    desc: "Precision core-alignment fusion splicing with sub-decibel attenuation bounds across all fiber links."
  },
  {
    num: "03",
    title: "VLAN Segmentation & 4K Setup",
    desc: "Layer 3 firewall routing, isolated CCTV data channels, and encrypted smartphone cloud DDNS configuration."
  },
  {
    num: "04",
    title: "Fluke Certification & PDF Handover",
    desc: "Link-by-link OTDR & Cat6A Fluke testing with complete signed SLA audit documentation delivered to client."
  }
];

export const EngineeringShowcase: React.FC<EngineeringShowcaseProps> = ({
  onTriggerQuote,
  onExploreServices
}) => {
  return (
    <section className="py-16 bg-black text-white text-left font-['Open_Sans']">
      <div className="w-[85%] max-w-[1500px] mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-block text-[#ef233c] font-mono text-[10px] font-bold uppercase tracking-widest">
              CERTIFIED DEPLOYMENT STANDARDS
            </div>
            <h2 className="font-['Open_Sans_Condensed'] font-light text-3xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
              Precision Infrastructure & <br />
              <span className="text-[#ef233c] font-bold">Quality Benchmarks</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pt-1">
              Every deployment adheres to rigorous international telecom and surveillance standards, certified with calibrated Japanese equipment.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onTriggerQuote()}
              className="bg-[#ef233c] hover:bg-[#d90429] text-white px-5 py-3 rounded-xl font-['Open_Sans'] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(239,35,60,0.35)] hover:shadow-[0_0_30px_rgba(239,35,60,0.5)] flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Launch Quote Simulator</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Grid (Red Noir Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
          {engineeringPillars.map((pillar, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-[#0a0a0c] border border-white/10 hover:border-[#ef233c] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_35px_rgba(239,35,60,0.25)] select-none"
              >
                <div>
                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="font-['Open_Sans_Condensed'] font-bold text-2xl text-white uppercase tracking-wide leading-tight group-hover:text-[#ef233c] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Micro Specs Table */}
                  <div className="mt-5 pt-3 border-t border-white/10 space-y-1.5 font-mono text-[10px]">
                    {pillar.specs.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between">
                        <span className="text-zinc-500">{s.label}:</span>
                        <span className="font-bold text-zinc-200">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-5 mt-4 border-t border-white/10">
                  <button
                    onClick={() => onExploreServices()}
                    className="w-full py-2.5 rounded-xl border border-white/10 group-hover:border-[#ef233c] bg-[#121214] group-hover:bg-[#ef233c] text-zinc-300 group-hover:text-white font-['Open_Sans'] font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4-Step Deployment Workflow Timeline */}
        <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[#ef233c] font-mono text-[10px] font-extrabold uppercase tracking-widest">
              DEPLOYMENT PROTOCOL
            </span>
            <h3 className="font-['Open_Sans_Condensed'] text-3xl sm:text-4xl text-white font-light uppercase tracking-wide">
              Engineering Execution Process
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Standardized step-by-step procedure guaranteeing zero defect handovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deploymentSteps.map((step, sIdx) => (
              <div 
                key={step.num}
                className="bg-black border border-white/10 rounded-2xl p-6 text-left relative space-y-2 hover:border-[#ef233c] transition-colors shadow-lg"
              >
                <span className="font-mono text-3xl font-black text-zinc-800 group-hover:text-[#ef233c] block leading-none">
                  {step.num}
                </span>
                <h4 className="font-['Open_Sans'] font-bold text-sm text-white">
                  {step.title}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

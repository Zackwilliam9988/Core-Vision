import React, { useState } from "react";
import { Calculator, Sparkles, ChevronRight, ShieldCheck, Clock, Zap, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface QuickQuoteEstimatorProps {
  onTriggerQuote: (serviceId?: string) => void;
}

export const QuickQuoteEstimator: React.FC<QuickQuoteEstimatorProps> = ({ onTriggerQuote }) => {
  const [cctvCount, setCctvCount] = useState<number>(8);
  const [fiberCores, setFiberCores] = useState<number>(24);
  const [cableDrops, setCableDrops] = useState<number>(16);

  // Dynamic estimate calculations
  const estimatedDays = Math.max(1, Math.ceil((cctvCount * 0.25) + (fiberCores * 0.1) + (cableDrops * 0.15)));
  const estimatedTechnicians = cctvCount > 16 || fiberCores > 48 || cableDrops > 32 ? 4 : 2;

  return (
    <section className="py-20 bg-black relative overflow-hidden border-b border-white/10 text-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-5 text-left space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#ef233c]/10 border border-[#ef233c]/30 rounded-full px-3.5 py-1 text-[10px] text-[#ef233c] font-mono font-bold uppercase tracking-widest">
              <Calculator size={12} className="text-[#ef233c]" />
              <span>INTERACTIVE PARAMETER CALCULATOR</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Instant Site Scope & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff4d6d]">
                SLA Timeline Estimator
              </span>
            </h2>

            <p className="text-zinc-300 text-sm leading-relaxed font-sans">
              Select your expected hardware units to instantly preview project execution capacity. Our certified technicians arrive equipped with Fujikura splicers and Fluke link analyzers.
            </p>

            <div className="space-y-2.5 pt-2 font-mono text-xs">
              <div className="flex items-center gap-2.5 text-zinc-300 font-medium">
                <CheckCircle2 size={15} className="text-[#ef233c] shrink-0" />
                <span>Zero Hidden Fees • Written Itemized Estimates</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-300 font-medium">
                <CheckCircle2 size={15} className="text-[#ef233c] shrink-0" />
                <span>100% Tested under Sub-Decibel Optical Criteria</span>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-300 font-medium">
                <CheckCircle2 size={15} className="text-[#ef233c] shrink-0" />
                <span>Encrypted DDNS / Cloud Remote Feeds Included</span>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Sliders & Output Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-6">
              
              {/* Slider 1: 4K CCTV Cameras */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#ef233c]" />
                    <span>4K IP CCTV Cameras:</span>
                  </span>
                  <span className="font-mono font-black text-[#ef233c] bg-[#ef233c]/15 border border-[#ef233c]/30 px-2.5 py-0.5 rounded-lg text-xs">
                    {cctvCount} Units
                  </span>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={64} 
                  value={cctvCount} 
                  onChange={(e) => setCctvCount(Number(e.target.value))}
                  className="w-full accent-[#ef233c] cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                  <span>1 Cam (Retail / Home)</span>
                  <span>32 Cams (Warehouse)</span>
                  <span>64+ Cams (Industrial Campus)</span>
                </div>
              </div>

              {/* Slider 2: Fiber Splicing Core Points */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Optical Fiber Splicing Cores:</span>
                  </span>
                  <span className="font-mono font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg text-xs">
                    {fiberCores} Cores
                  </span>
                </div>
                <input 
                  type="range" 
                  min={2} 
                  max={96} 
                  step={2}
                  value={fiberCores} 
                  onChange={(e) => setFiberCores(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                  <span>2 Cores</span>
                  <span>48 Cores</span>
                  <span>96+ Ribbon Cores</span>
                </div>
              </div>

              {/* Slider 3: Cat6A Structured Drops */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>Cat6A Structured Network Drops:</span>
                  </span>
                  <span className="font-mono font-black text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-lg text-xs">
                    {cableDrops} Nodes
                  </span>
                </div>
                <input 
                  type="range" 
                  min={4} 
                  max={120} 
                  step={4}
                  value={cableDrops} 
                  onChange={(e) => setCableDrops(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                  <span>4 Drops</span>
                  <span>60 Drops</span>
                  <span>120+ Corporate Drops</span>
                </div>
              </div>

              {/* Output Live Projections Metric Box */}
              <div className="bg-[#121214] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-bold">ESTIMATED FIELD DEPLOYMENT</span>
                  <span className="block text-2xl font-black text-white font-display mt-0.5">
                    ~{estimatedDays} Business {estimatedDays === 1 ? "Day" : "Days"}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Staffed by {estimatedTechnicians} certified field specialists
                  </span>
                </div>

                <button 
                  onClick={() => onTriggerQuote()}
                  className="bg-[#ef233c] hover:bg-[#d90429] text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(239,35,60,0.35)] hover:shadow-[0_0_30px_rgba(239,35,60,0.5)] cursor-pointer text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 group shrink-0"
                >
                  <Sparkles size={14} className="stroke-[2.5]" />
                  <span>Generate Full AI Proposal</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

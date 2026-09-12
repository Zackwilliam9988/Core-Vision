import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  Shield, 
  Cpu, 
  Activity, 
  Layers, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Workflow
} from "lucide-react";

export interface TimelineMilestone {
  year: string;
  quarter?: string;
  title: string;
  desc: string;
  metric?: string;
  metricLabel?: string;
  tags?: string[];
  icon: React.ElementType;
  status: "completed" | "active" | "future";
}

const defaultMilestones: TimelineMilestone[] = [
  {
    year: "2018",
    quarter: "Q2",
    title: "Enterprise Conception & Rollout",
    desc: "Core Vision Pakistan established in Islamabad, launching high-precision commercial structured cabling, industrial CCTV networks, and ELV containment frameworks for corporate clients.",
    metric: "100%",
    metricLabel: "Initial Deployment Uptime",
    tags: ["Structured Cabling", "Analogue & IP CCTV", "ELV Containment"],
    icon: Shield,
    status: "completed"
  },
  {
    year: "2020",
    quarter: "Q1",
    title: "Fiber Splice Core Alignment Lab",
    desc: "Commissioned dedicated OTDR laser calibration and Fujikura core-alignment fusion splicers, achieving sub-0.02dB loss across mission-critical singlemode trunk backbones.",
    metric: "< 0.02 dB",
    metricLabel: "Average Splicing Loss",
    tags: ["OTDR Laser Diagnostics", "Fusion Splicing", "Singlemode Fiber"],
    icon: Cpu,
    status: "completed"
  },
  {
    year: "2022",
    quarter: "Q3",
    title: "Metro Smart Surveillance Contracts",
    desc: "Secured enterprise surveillance integrations across multi-tenant commercial hubs and industrial zones with centralized 4K NVR arrays, AI perimeter defense, and automated alerting.",
    metric: "500+",
    metricLabel: "Active 4K Channels",
    tags: ["Smart City Grids", "AI Perimeter", "Multi-site VMS"],
    icon: Radio,
    status: "completed"
  },
  {
    year: "2024",
    quarter: "Q4",
    title: "High-Density Datacenter Trunks",
    desc: "Standardized Cat6A 10Gbps shielded topologies and OM4 fiber backbones for enterprise data rooms, server racks, and financial institutions adhering to ISO 27001 physical security.",
    metric: "10 Gbps",
    metricLabel: "Standard Trunk Throughput",
    tags: ["Datacenter Racks", "Shielded 10G", "ISO Standards"],
    icon: Layers,
    status: "completed"
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "Biometric & Cloud Security Ecosystem",
    desc: "Introduced unified biometric access control nodes with cloud telemetry sync, contactless multi-factor facial recognition, and zero-trust door controller relays across 50+ enterprise sites.",
    metric: "50+ Sites",
    metricLabel: "Unified Cloud Sync",
    tags: ["Biometric Access", "Zero-Trust Relays", "Cloud Sync"],
    icon: Activity,
    status: "completed"
  },
  {
    year: "2026+",
    quarter: "NEXT-GEN",
    title: "AI-Autonomous Security & Telemetry",
    desc: "Deploying next-generation autonomous incident triage, predictive fiber degradation monitoring, and real-time remote surveillance diagnostics powered by edge AI compute.",
    metric: "24/7 AI",
    metricLabel: "Autonomous Threat Triage",
    tags: ["Edge AI Compute", "Predictive Diagnostics", "Autonomous Grid"],
    icon: Sparkles,
    status: "active"
  }
];

interface ScrollJourneyAboutProps {
  milestones?: TimelineMilestone[];
}

export const ScrollJourneyAbout: React.FC<ScrollJourneyAboutProps> = ({
  milestones = defaultMilestones
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"]
  });

  // Smooth spring physics for fluid laser trajectory
  const pathSpring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 bg-[#000000] text-white rounded-3xl border border-white/10 overflow-hidden my-16 shadow-2xl"
    >
      {/* Background Ambience & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(239,35,60,0.1)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(239,35,60,0.07)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Workflow size={14} className="animate-pulse" />
          <span>Proven Engineering Trajectory</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-white mb-4">
          Scroll-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff6b6b]">Milestone Journey</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From pioneering commercial cabling to deploying nation-scale optical fiber networks and intelligent security infrastructure, follow our evolution.
        </p>
      </div>

      {/* Timeline Wrapper with Central SVG Beam */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* SVG Laser Path Container (Desktop Center Line) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none hidden md:block">
          <svg 
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 32 1000"
          >
            <defs>
              {/* Crimson Neon Glow Filter */}
              <filter id="crimsonLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur1" />
                <feGaussianBlur stdDeviation="6" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef233c" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff4d6d" stopOpacity="1" />
                <stop offset="100%" stopColor="#ef233c" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Base Background Track */}
            <line
              x1="16"
              y1="0"
              x2="16"
              y2="1000"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Scroll-Driven Glowing Animated Laser Path */}
            <motion.path
              d="M 16 0 L 16 1000"
              fill="none"
              stroke="url(#laserBeamGrad)"
              strokeWidth="3.5"
              filter="url(#crimsonLaserGlow)"
              style={{
                pathLength: pathSpring
              }}
            />
          </svg>
        </div>

        {/* Mobile Left-aligned SVG Line */}
        <div className="absolute left-6 top-0 bottom-0 -translate-x-1/2 w-6 pointer-events-none md:hidden">
          <svg 
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 24 1000"
          >
            <defs>
              <filter id="mobileLaserGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line
              x1="12"
              y1="0"
              x2="12"
              y2="1000"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <motion.path
              d="M 12 0 L 12 1000"
              fill="none"
              stroke="#ef233c"
              strokeWidth="3"
              filter="url(#mobileLaserGlow)"
              style={{
                pathLength: pathSpring
              }}
            />
          </svg>
        </div>

        {/* Milestones Stack */}
        <div className="space-y-12 sm:space-y-20 relative z-10">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                } pl-12 md:pl-0 gap-6 md:gap-12 group`}
              >
                {/* Center Node Indicator */}
                <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-0 md:-translate-y-1/2 z-20">
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing outer aura */}
                    <div className="absolute h-8 w-8 rounded-full bg-[#ef233c]/20 group-hover:scale-125 transition-transform duration-300 animate-ping opacity-40" />
                    <div className="h-6 w-6 rounded-full bg-black border-2 border-[#ef233c] flex items-center justify-center shadow-[0_0_15px_#ef233c] group-hover:bg-[#ef233c] transition-colors duration-300">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Milestone Card Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="w-full md:w-[calc(50%-2.5rem)] text-left"
                >
                  <div className="bg-[#0c0c0e] hover:bg-[#121215] border border-zinc-800 hover:border-[#ef233c]/50 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-xl relative overflow-hidden group/card">
                    {/* Top Accent Strip */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ef233c]/40 to-transparent group-hover/card:via-[#ef233c] transition-all" />

                    {/* Card Header */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-white bg-[#ef233c] px-2.5 py-0.5 rounded shadow-sm">
                          {item.year}
                        </span>
                        {item.quarter && (
                          <span className="font-mono text-[10px] text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase font-semibold">
                            {item.quarter}
                          </span>
                        )}
                      </div>

                      <div className="h-8 w-8 rounded-lg bg-[#ef233c]/10 border border-[#ef233c]/20 text-[#ef233c] flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg sm:text-xl font-bold font-sans text-white mb-2 group-hover/card:text-[#ef233c] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                      {item.desc}
                    </p>

                    {/* Metric & Status Box */}
                    {item.metric && (
                      <div className="bg-black/60 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono text-zinc-400">
                          {item.metricLabel || "Key Metric"}
                        </span>
                        <span className="text-sm font-mono font-bold text-white flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span>{item.metric}</span>
                        </span>
                      </div>
                    )}

                    {/* Feature Chips */}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Empty spacer for the opposite side in desktop alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  Eye, 
  Target, 
  Award, 
  Users, 
  Cpu, 
  Globe, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Heart 
} from "lucide-react";

export const AboutPage: React.FC = () => {
  const coreValues = [
    {
      icon: Shield,
      title: "Absolute Protection",
      description: "We deploy defense-grade surveillance systems and rigorous protocols to protect digital and physical critical infrastructure.",
      accentColor: "#ef233c"
    },
    {
      icon: Cpu,
      title: "Pristine Calibration",
      description: "Our optical fiber splices and network cabling systems adhere to nanosecond response budgets and 100% loss-free validation.",
      accentColor: "#ef233c"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Enterprise operations require constant uptime. We provide rapid emergency support dispatch within 2 hours.",
      accentColor: "#ef233c"
    }
  ];

  const teamMembers = [
    {
      name: "Ahtesham Akram",
      role: "Lead Infrastructure Architect",
      specialty: "High-capacity Fiber & CCTV Systems",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Rao Ubaidullah Javed",
      role: "Senior Security Engineer",
      specialty: "Biometric Access Control & CCTV Maintenance",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Muhammad Maaz",
      role: "Chief Network Solutions Architect",
      specialty: "Enterprise Switching, Splicing & Datacenters",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const milestones = [
    { year: "2018", title: "Enterprise Conception", desc: "Core Vision Pakistan begins high-end commercial cabling & CCTV rollouts in Islamabad." },
    { year: "2020", title: "Fiber Splice Core", desc: "Acquired state-of-the-art OTDR core-alignment splicing units to service optical feeds." },
    { year: "2022", title: "Smart City Contract", desc: "Deployed integrated surveillance systems covering major commercial zones." },
    { year: "2025", title: "Biometric Integration Hub", desc: "Launched central biometric database syncing cloud metrics for 50+ enterprise sites." }
  ];

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen text-white font-sans relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(239,35,60,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,35,60,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION FOR ABOUT US */}
        <div className="text-left mb-16 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-none mb-6"
          >
            Engineering Pristine <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff4d6d]">Security Landscapes</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-xl leading-relaxed font-sans"
          >
            Core Vision Pakistan is a specialized high-performance security systems integrator and infrastructure engineering collective. We service commercial buildings, residential hubs, and industrial warehouses, laying fast optical fibers, smart networks, and unified CCTV grids.
          </motion.p>
        </div>

        {/* MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0a0b0e] border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-2xl hover:border-[#ef233c]/50 hover:shadow-[0_0_30px_rgba(239,35,60,0.2)] transition-all duration-300 tech-bracket"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-mono text-[#ef233c] bg-[#ef233c]/10 px-2 py-0.5 rounded border border-[#ef233c]/20 font-bold uppercase">
                STRATEGIC MANDATE
              </span>
              <span className="text-[9px] font-mono text-zinc-500">ISO 27001 ALIGNED</span>
            </div>
            <h3 className="text-2xl font-mono font-bold tracking-wider text-white mb-3">Our Mission</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-sans">
              To engineer and maintain bulletproof security grids, high-speed networking paths, and automated bio-tracking modules that guarantee commercial clients continuous uptime, maximum asset protection, and streamlined oversight.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0a0b0e] border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-2xl hover:border-[#ef233c]/50 hover:shadow-[0_0_30px_rgba(239,35,60,0.2)] transition-all duration-300 tech-bracket"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">
                FUTURE ARCHITECTURE
              </span>
              <span className="text-[9px] font-mono text-zinc-500">NEXT-GEN ELV</span>
            </div>
            <h3 className="text-2xl font-mono font-bold tracking-wider text-white mb-3">Our Vision</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-sans">
              To become the benchmark across Pakistan for high-precision optical fiber trunking and enterprise ELV surveillance infrastructure, defined by zero defect tolerances and instant telemetry.
            </p>
          </motion.div>
        </div>

        {/* CORE VALUES */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-4 font-sans">
              The Principles Behind Core Vision Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-6 relative transition-all duration-300 group hover:scale-[1.02] shadow-xl hover:border-[#ef233c] hover:shadow-[0_0_25px_rgba(239,35,60,0.2)]"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] flex items-center justify-center mb-3">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-lg font-black text-white mb-2 font-sans group-hover:text-[#ef233c] transition-colors">{value.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ACHIEVEMENTS / HISTORIC TIMELINE */}
        <div className="mb-20 bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="text-left mb-12">
            <h2 className="text-3xl font-black font-sans text-white mt-4">Proven Service Trajectory</h2>
          </div>

          <div className="relative border-l-2 border-zinc-800 pl-6 sm:pl-10 space-y-12">
            {milestones.map((m, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative text-left"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 h-4 w-4 rounded-full bg-black border-2 border-[#ef233c] shadow-[0_0_12px_rgba(239,35,60,0.6)]" />
                
                <span className="text-sm font-mono font-black text-[#ef233c] bg-[#ef233c]/10 px-3 py-1 rounded-md border border-[#ef233c]/30 inline-block mb-2">
                  {m.year}
                </span>
                <h4 className="text-xl font-bold font-sans text-white">{m.title}</h4>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl font-sans leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PROFESSIONAL TEAM SECTION */}
        <div className="mb-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-4 font-sans">
              Our Senior Engineering Team
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Meet the specialists leading on-site configurations, OTDR laser calculations, and enterprise CCTV network deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-[#ef233c] hover:shadow-[0_0_30px_rgba(239,35,60,0.25)] transition-all duration-300 text-left group"
              >
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.9]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[9px] font-mono font-bold text-[#ef233c] bg-black/80 backdrop-blur-md border border-[#ef233c]/40 px-2.5 py-0.5 rounded shadow-sm">
                      VERIFIED
                    </span>
                  </div>
                </div>
                
                <div className="p-5 text-center">
                  <h4 className="text-base font-bold text-white font-sans group-hover:text-[#ef233c] transition-colors">{member.name}</h4>
                  <p className="text-xs text-zinc-400 font-medium mt-1">{member.role}</p>
                  <p className="text-[10px] text-zinc-500 mt-1.5 font-mono uppercase">{member.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

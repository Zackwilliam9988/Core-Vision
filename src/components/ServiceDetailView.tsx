import React, { useEffect } from "react";
import { 
  ArrowLeft, 
  Shield, 
  Zap, 
  Cable, 
  Network, 
  Activity, 
  Fingerprint, 
  Shuffle, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Briefcase,
  HelpCircle,
  FileText,
  Lock,
  Compass,
  Database,
  MessageCircle
} from "lucide-react";
import { motion } from "motion/react";
import { Service } from "../types";
import { LucideIcon } from "./LucideIcon";

// Detailed custom data mapping for each professional service
const serviceMetadata: Record<string, {
  tagline: string;
  benefits: { title: string; desc: string; icon: string }[];
  features: string[];
  process: { step: string; title: string; desc: string }[];
}> = {
  "cctv-install": {
    tagline: "Enterprise HD Security Surveillance Solutions",
    benefits: [
      { title: "Zero Blindspots", desc: "Our specialists execute complete laser angle mappings to cover all entry points.", icon: "ShieldCheck" },
      { title: "24/7 Remote Live Feed", desc: "Encrypted stream access directly from your iPhone, Android, or laptop.", icon: "Smartphone" },
      { title: "Smart Motion Alerts", desc: "AI-powered thermal triggers that isolate humans/vehicles and ignore noises.", icon: "Zap" }
    ],
    features: [
      "Ultra 4K IP Dome & Bullet Cameras",
      "Robust Night-Vision Infrared Array System",
      "Localized RAID-Redundant NVR Storage",
      "Encrypted Signal Feed Trunking Lines",
      "Intelligent PTZ Active Smart Tracking"
    ],
    process: [
      { step: "01", title: "Site Field Analysis", desc: "Engineering sweep of physical blindspots and glare zones." },
      { step: "02", title: "Conduit Trunking", desc: "Laying weatherproof metallic channels to seal copper/fiber links." },
      { step: "03", title: "Hardware Integration", desc: "Rigid dome/bullet mounting, terminal patch blocks, and camera calibration." },
      { step: "04", title: "Session Encryption", desc: "DDNS settings configurations and priority mobile app sync." }
    ]
  },
  "fiber-splicing": {
    tagline: "Sub-Decibel Loss Fusion Splicing & Terminations",
    benefits: [
      { title: "Fujikura Precision", desc: "Using industry-leading Japanese Fujikura Core-Alignment Splicers for sub-decibel loss.", icon: "Activity" },
      { title: "Fused Resilience", desc: "Physical core-alignment splicing wrapped in protective micro-shrink sleeves.", icon: "Cable" },
      { title: "OTDR Verification", desc: "Full optical time-domain reflectometer reporting on every spliced pathway.", icon: "ShieldCheck" }
    ],
    features: [
      "Fujikura Core-Alignment Thermal Fusion",
      "Multi-core Single-mode & Multi-mode Splicing",
      "Optical Patch Panel Terminations",
      "Weatherproof Joint Enclosure Seals",
      "Fiber Ribbon High-Density Splicing"
    ],
    process: [
      { step: "01", title: "Core Stripping & Cleaning", desc: "Micro-stripped cladding cleaned with pure isopropyl solutions." },
      { step: "02", title: "Cleaver Cutting Precision", desc: "Fitted with diamond cleavers to establish exact 90-degree fiber faces." },
      { step: "03", title: "Fusion Arc Ignition", desc: "Automatic electric arc discharge matching core coordinates precisely." },
      { step: "04", title: "OTDR Attenuation Sweep", desc: "Confirming loss bounds before heat-shrinking protective sleeves." }
    ]
  },
  "network-setup": {
    tagline: "High-Capacity Enterprise Local & Cloud Networking",
    benefits: [
      { title: "Zero Signal Dead-Zones", desc: "Calculated high-gain Access Point placements to ensure uniform speed.", icon: "Network" },
      { title: "Traffic VLAN Isolation", desc: "Segregating security cameras, corporate work, and guest networks securely.", icon: "Shield" },
      { title: "Firewall Lockdown", desc: "Deep packet inspection and policy definitions to block external malware.", icon: "Zap" }
    ],
    features: [
      "Multi-SSID High-Coverage Smart APs",
      "Gigabit Managed Switch Integrations",
      "Advanced Edge Router & Firewall Policies",
      "Intelligent Network Monitoring Tools",
      "Dynamic Routing Protocols Setup"
    ],
    process: [
      { step: "01", title: "RF Signal Site Mapping", desc: "Spectrum sweep to calculate channel overlaps and dead-zones." },
      { step: "02", title: "Structured Wire Pulling", desc: "Laying modular horizontal Cat6/Fiber backplanes to active desks." },
      { step: "03", title: "Core Configuration", desc: "Setting VLAN divisions, router protocols, DHCP pools, and AP channels." },
      { step: "04", title: "Stress Load Testing", desc: "Packet loss check under peak traffic hours before final handover." }
    ]
  },
  "cctv-repair": {
    tagline: "Rapid-Response CCTV System Diagnostics & Restoration",
    benefits: [
      { title: "Immediate Response", desc: "Local diagnostic units dispatched to resolve blank streams within 60 minutes.", icon: "Zap" },
      { title: "Genuine Sourced Components", desc: "We deploy high-integrity replacement hardware certified by top brands.", icon: "ShieldCheck" },
      { title: "Continuous Video Backups", desc: "Verification and repair of storage drives to prevent loss of logs.", icon: "Activity" }
    ],
    features: [
      "Troubleshooting feed losses and signal noise",
      "Replacement of failed video baluns and connectors",
      "Centralized power supply diagnostic testing",
      "NVR / DVR storage data block rebuilds",
      "Firmware updates and system health audits"
    ],
    process: [
      { step: "01", title: "Visual Signal Mapping", desc: "Comprehensive testing to trace signal noise and volt drops." },
      { step: "02", title: "Hardware Replacement", desc: "Resolving camera board failures and rebuilding damaged cable heads." },
      { step: "03", title: "Power Infrastructure Balance", desc: "Installing clean, regulated backup power supplies to prevent future spikes." },
      { step: "04", title: "Archival Verification", desc: "Double check that storage schedules are active and remote alerts fire." }
    ]
  },
  "fiber-testing": {
    tagline: "Advanced Optical Time-Domain Reflectometer Analysis",
    benefits: [
      { title: "Precise Distance Mapping", desc: "Determines physical fracture locations down to the nearest centimeter.", icon: "Activity" },
      { title: "dB Loss Analysis Logs", desc: "Calculates attenuation losses along entire fiber loops for certified SLA records.", icon: "FileText" },
      { title: "Proactive Bug Sweeps", desc: "Identifies dangerous microbends before they trigger link breakdowns.", icon: "ShieldCheck" }
    ],
    features: [
      "OTDR Diagnostic Trace Diagrams",
      "Optical Fiber Fracture Pinpointing",
      "Splice and Connector Attenuation Logs",
      "Polarization Mode Dispersion Checks",
      "Full Optical Loop Compliance Certification"
    ],
    process: [
      { step: "01", title: "Laser Wave Setup", desc: "Aligning laser pulse configurations for 1310/1550nm thresholds." },
      { step: "02", title: "Loop Launch Fiber Setup", desc: "Connecting physical launch cords to ensure full OTDR reading range." },
      { step: "03", title: "Reflectometer Execution", desc: "Firing laser pulses to capture backscatter graphs and loss tables." },
      { step: "04", title: "Engineering Log Drafting", desc: "Publishing complete reports showing splice loss, cable faults, and distance charts." }
    ]
  },
  "biometric-system": {
    tagline: "Intelligent Access Controls & Schedule Synced Terminals",
    benefits: [
      { title: "Zero Clock Fraud", desc: "Biometric and IR facial algorithms completely eradicate proxy clock-ins.", icon: "Fingerprint" },
      { title: "Database Automation", desc: "Real-time sync to automated payroll spreadsheets and employee logs.", icon: "ShieldCheck" },
      { title: "Physical Access Locking", desc: "Connects biometric sensors directly with electronic magnetic door locks.", icon: "Lock" }
    ],
    features: [
      "Contactless Facial Scan IR Terminals",
      "Anti-spoof Fingerprint Capacitive Sensors",
      "Relay Integrations for Electromagnetic Locks",
      "Cloud Database Employee Management software",
      "Multi-Shift Scheduling Custom Rules"
    ],
    process: [
      { step: "01", title: "Access Node Mapping", desc: "Plotting doorway dimensions, user counts, and lock relay requirements." },
      { step: "02", title: "Physical Mounting & Locks", desc: "Installing magnetic locks, emergency exit buttons, and terminal devices." },
      { step: "03", title: "Database Setup", desc: "Configuring employee registers, work hour schedules, and shift boundaries." },
      { step: "04", title: "Enrollment Handover", desc: "Training administrative staff on user registration and database exports." }
    ]
  },
  "structured-cabling": {
    tagline: "Enterprise Cat6 Cabling Frame & Clean Rack Assembly",
    benefits: [
      { title: "Unmatched Speed Limits", desc: "Certified Cat6 copper channels designed to handle 10-Gigabit traffic lanes.", icon: "Zap" },
      { title: "Neat Rack Management", desc: "Color-coded cable organization that turns complex wires into modular layouts.", icon: "Shuffle" },
      { title: "Conduit Armor Protection", desc: "Cables run inside rigid protective trunking shields to prevent physical wear.", icon: "ShieldCheck" }
    ],
    features: [
      "Flawless Cat6 Horizontal Cabling Blocks",
      "Sleek Network Server Rack Installations",
      "Modular Patch Panel Connections",
      "Segment-by-Segment Cable Certification Reports",
      "Protective Metallic Wire Conduits & Trunkings"
    ],
    process: [
      { step: "01", title: "Path Layout Blueprints", desc: "Plotting structural pathways away from high-voltage interference lines." },
      { step: "02", title: "Structured Conduit Installation", desc: "Laying neat metallic cable trays and protective conduit channels." },
      { step: "03", title: "Cable Pulling & Termination", desc: "Pulling premium copper pairs and terminating keystones with precision." },
      { step: "04", title: "Digital Channel Audit", desc: "Certifying connection parameters and organizing clean rack cords." }
    ]
  },
  "remote-cctv": {
    tagline: "Secure Dynamic DNS Remote Camera Stream Integrations",
    benefits: [
      { title: "Anywhere Surveillance", desc: "Watch high-definition live feeds from anywhere around the globe.", icon: "Smartphone" },
      { title: "Network Firewalls", desc: "Secures router settings to shield system feeds from unauthorized eyes.", icon: "ShieldCheck" },
      { title: "Instant Notification Logs", desc: "Sends motion-alert screenshots directly to your phone within seconds.", icon: "Zap" }
    ],
    features: [
      "Secure Router Port Forwarding Protocols",
      "Dynamic DNS (DDNS) Cloud Registrations",
      "Multi-user Credentials Isolation Policies",
      "Full iOS & Android Mobile App Syncs",
      "Network Attached Storage (NAS) Backups"
    ],
    process: [
      { step: "01", title: "Camera IP Allocation", desc: "Assigning rigid static IP coordinates to all cameras and NVR units." },
      { step: "02", title: "Router Port Rules", desc: "Configuring rules to safely route remote camera requests." },
      { step: "03", title: "Dynamic DNS Mapping", desc: "Linking active networks with premium domain names to prevent signal drops." },
      { step: "04", title: "Device Configuration", desc: "Activating encrypted apps on smartphones and setting up motion rules." }
    ]
  }
};

// Generic fallback data generator for newly created custom services
const getFallbackMetadata = (title: string) => {
  return {
    tagline: `Premium Certified ${title} Infrastructure`,
    benefits: [
      { title: "Certified Standards", desc: "Engineered in perfect compliance with strict commercial-grade parameters.", icon: "ShieldCheck" },
      { title: "High-Caliber Execution", desc: "Carried out by our experienced hardware systems integration team.", icon: "Zap" },
      { title: "Reliability Guaranteed", desc: "Backed by 1-year operational SLA support and comprehensive warranties.", icon: "Activity" }
    ],
    features: [
      "Custom system layout design & on-site planning",
      "High-end hardware components sourced from global brands",
      "Clean physical wire trunking and armored enclosures",
      "Fully certified performance audits post-integration",
      "Dedicated client walkthrough and dynamic admin panels"
    ],
    process: [
      { step: "01", title: "On-site Analysis", desc: "Detailed review of site specifications and structural layouts." },
      { step: "02", title: "Custom Drafting", desc: "Compiling system architecture designs, cable pathways, and lists." },
      { step: "03", title: "Technical Integration", desc: "Mounting, fiber fusion, structured conduit laying, and core configurations." },
      { step: "04", title: "Handover Verification", desc: "Double-checking signal parameters and giving client training." }
    ]
  };
};

interface ServiceDetailViewProps {
  service: Service;
  onBack: () => void;
  onBook: (serviceId: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service, onBack, onBook }) => {
  const meta = serviceMetadata[service.id] || getFallbackMetadata(service.title);

  const openWhatsAppContact = () => {
    const message = `Hello, I would like to contact Core Vision Pakistan about the ${service.title} service.`;
    window.open(`https://wa.me/923064422550?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [service.id]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pt-24 pb-16 min-h-screen text-white bg-black font-sans relative overflow-hidden"
    >
      {/* Background red ambient lights */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(239,35,60,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute top-[50%] right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,35,60,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(239,35,60,0.04),transparent_50%)] pointer-events-none" />

      {/* PROFESSIONAL HERO SECTION */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-6 text-left">
            <button onClick={onBack} className="hover:text-[#ef233c] transition-colors cursor-pointer">Landing</button>
            <span>/</span>
            <span className="text-zinc-500">Services</span>
            <span>/</span>
            <span className="text-[#ef233c]">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#ef233c]/10 border border-[#ef233c]/30 rounded-full px-3.5 py-1.5 text-[10px] text-[#ef233c] font-mono font-bold uppercase tracking-widest">
                <LucideIcon name={service.iconName} size={13} className="text-[#ef233c]" />
                <span>CORE VISION PAKISTAN SPECIFICATION</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {service.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff4d6d] font-sans font-black uppercase text-lg sm:text-2xl mt-3 tracking-widest font-mono">
                  {meta.tagline}
                </span>
              </h1>

              <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl font-sans">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3.5 pt-2">
                <button 
                  onClick={openWhatsAppContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-black py-3.5 px-6 rounded-2xl transition-all shadow-lg hover:shadow-2xl text-xs uppercase tracking-widest font-mono"
                >
                  <MessageCircle size={16} className="text-white" />
                  <span>Contact on WhatsApp</span>
                </button>
                <button 
                  onClick={onBack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0a0a0c] hover:bg-[#121214] text-white border border-white/10 hover:border-[#ef233c] font-mono font-bold py-3.5 px-5 rounded-2xl transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  Explore other solutions
                </button>
              </div>
            </div>

            {/* Hero Right Column: Beautiful Visual Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md h-[280px] sm:h-[340px] rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_35px_rgba(0,0,0,0.8)] group">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICE DETAILS & DESCRIPTION */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Description Block */}
            <div className="lg:col-span-7 text-left space-y-8">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-display font-black text-2xl text-white tracking-tight">Technical Scope & Specifications</h2>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest font-black mt-1">Detailed Service Inclusions</p>
              </div>
              
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                {service.fullDescription || service.description}
              </p>

              {/* Dynamic Engineering standards panel */}
              <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-6 shadow-xl text-left">
                <h4 className="font-display font-black text-white mb-3.5 flex items-center gap-2 text-base">
                  <Briefcase size={16} className="text-[#ef233c]" />
                  <span>Engineering Standards Checklist</span>
                </h4>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-sans">
                  Our professional on-site deployments strictly conform to certified telecom, optical attenuation boundaries, and rigid physical layouts.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-sans">
                    <CheckCircle size={14} className="text-[#ef233c] shrink-0" />
                    <span>UL-Listed Weatherproof Cabling</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-sans">
                    <CheckCircle size={14} className="text-[#ef233c] shrink-0" />
                    <span>Regulated Surge Isolation Loops</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-sans">
                    <CheckCircle size={14} className="text-[#ef233c] shrink-0" />
                    <span>Micro-Loss Splicing Compliance</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-sans">
                    <CheckCircle size={14} className="text-[#ef233c] shrink-0" />
                    <span>1-Year Operations SLA Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Sidebar */}
            <div className="lg:col-span-5 text-left bg-[#0a0a0c] border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-red-500/5 blur-2xl pointer-events-none" />
              <div>
                <h3 className="font-display font-black text-lg text-white">System Features</h3>
                <p className="text-[10px] font-mono text-[#ef233c] uppercase tracking-widest font-extrabold mt-1">Physical Hardware Parameters</p>
              </div>

              <div className="space-y-3 pt-2">
                {meta.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#121214] rounded-xl border border-white/5 transition-all hover:border-[#ef233c]/40 hover:bg-[#18181b] group">
                    <div className="p-1.5 bg-[#ef233c]/10 text-[#ef233c] rounded-lg group-hover:bg-[#ef233c] group-hover:text-white transition-colors">
                      <CheckCircle size={12} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-16 border-y border-white/10 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto">
            <span className="text-[10px] font-mono text-[#ef233c] uppercase tracking-widest font-black bg-[#ef233c]/10 border border-[#ef233c]/30 px-3.5 py-1.5 rounded-full inline-block">
              Premium Corporate Benefits
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mt-4">
              Why Corporate Clients Choose Core Vision Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {meta.benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="bg-[#0a0b0e] border border-white/10 hover:border-[#ef233c] p-6.5 rounded-2xl flex flex-col items-center text-center hover:bg-[#121214] hover:shadow-[0_0_25px_rgba(239,35,60,0.25)] transition-all duration-300 relative group tech-bracket"
              >
                <div className="p-3 bg-[#ef233c]/10 border border-[#ef233c]/30 text-[#ef233c] group-hover:bg-[#ef233c] group-hover:text-white rounded-xl shrink-0 mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <LucideIcon name={benefit.icon} size={20} />
                </div>
                
                <h4 className="font-mono font-bold text-white mb-2 leading-snug text-base group-hover:text-[#ef233c] transition-colors uppercase tracking-wider">
                  {benefit.title}
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROCESS / HOW IT WORKS SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto">
            <span className="text-[10px] font-mono text-[#ef233c] uppercase tracking-widest font-black bg-[#ef233c]/10 border border-[#ef233c]/30 px-3.5 py-1.5 rounded-full inline-block">
              Operational Roadmap
            </span>
            <h2 className="font-mono font-bold text-2xl sm:text-4xl text-white tracking-wider mt-4 uppercase">
              4-Phase System <span className="text-[#ef233c]">Deployment Protocol</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative">
            {meta.process.map((step, idx) => (
              <div key={idx} className="bg-[#0a0b0e] border border-white/10 p-6 rounded-2xl text-left shadow-xl hover:border-[#ef233c] transition-all relative overflow-hidden group tech-bracket">
                <span className="absolute top-2 right-4 text-4xl font-mono font-black text-zinc-800 group-hover:text-[#ef233c]/30 transition-colors">
                  {step.step}
                </span>
                <div className="h-1 w-10 bg-[#ef233c] rounded-full mb-5 group-hover:w-16 transition-all" />
                <h4 className="font-mono font-bold text-white text-sm mb-2 group-hover:text-[#ef233c] transition-colors uppercase tracking-wide">{step.title}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0a0a0c] via-black to-[#0a0a0c] border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-12 text-left relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="text-[9px] font-mono text-[#ef233c] uppercase tracking-widest font-black bg-[#ef233c]/10 px-3 py-1 border border-[#ef233c]/30 rounded-full inline-block">Secure Your Infrastructure Today</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Ready to Initiate Certified Systems Setup?
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Connect with our certified Islamabad engineering dispatch team. We compile customized loss budgets, network diagnostics, and high-precision blueprints to address your security concerns.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button 
                  onClick={openWhatsAppContact}
                  className="bg-[#ef233c] hover:bg-[#d90429] text-white font-mono font-black py-3 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(239,35,60,0.35)] hover:scale-[1.02] cursor-pointer text-xs uppercase tracking-wider text-center border-none"
                >
                  Contact
                </button>
                <button 
                  onClick={onBack}
                  className="bg-[#0a0a0c] hover:bg-[#121214] text-white border border-white/10 hover:border-[#ef233c] font-mono font-bold py-3 px-5 rounded-xl transition-all text-xs uppercase tracking-wider text-center cursor-pointer"
                >
                  Explore Other Solutions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

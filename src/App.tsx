import React, { useState, useEffect } from "react";
import logo from "./assets/images/coreguard_logo_1782336134989.jpg";
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  ArrowUp, 
  Sparkles, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Zap,
  Users,
  Coins,
  Award,
  Headphones,
  Camera,
  Layers,
  CheckCircle2,
  Lock,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  FileDown,
  Cable,
  Server
} from "lucide-react";

import { SERVICES as DEFAULT_SERVICES, BENEFITS as DEFAULT_BENEFITS, STATS as DEFAULT_STATS, FAQS as DEFAULT_FAQS } from "./data";
import { Service, Benefit, Stat, FAQItem } from "./types";
import { LucideIcon } from "./components/LucideIcon";
import { FloatingGeometrics } from "./components/FloatingGeometrics";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { QuoteDialog } from "./components/QuoteDialog";
import { NetworkBackground } from "./components/NetworkBackground";
import { ServiceDetailView } from "./components/ServiceDetailView";
import { ContactPage } from "./components/ContactPage";
import { ServicesPage } from "./components/ServicesPage";
import { AboutPage } from "./components/AboutPage";
import { WhyUsPage } from "./components/WhyUsPage";
import { PartnersPage } from "./components/PartnersPage";
import { Navbar } from "./components/Navbar";
import { CCTVCamera } from "./components/CCTVCamera";
import { SuccessNotification } from "./components/SuccessNotification";
import { CustomCursor } from "./components/CustomCursor";
import { SophiaChat } from "./components/SophiaChat";
import { HeroVideoBackground } from "./components/HeroVideoBackground";
import { EngineeringShowcase } from "./components/EngineeringShowcase";
import { PartnersShowcase } from "./components/PartnersShowcase";
import { ShowroomCard3D } from "./components/ShowroomCard3D";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Application Dynamic States (manageable from Backend)
  const [services, setServices] = useState<Service[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  
  // Manageable Contact Details
  const [contactInfo, setContactInfo] = useState({
    phone: "0306 4422550",
    email: "corevisionpk@gmail.com",
    address: "Flat #2, Ist Floor, Abdullah Plaza, Phase 4-A, Ghouri Town, Islamabad",
    latitude: "33.6186",
    longitude: "73.1368",
    whatsapp: "+92 306 4422550"
  });

  // Manageable Hero & About Config
  const [heroInfo, setHeroInfo] = useState({
    title1: "Powering Networks",
    title2: "Through",
    highlightText: "Security & Precision",
    tagline: "Professional HD CCTV, high-capacity fusion splicing, and robust structured cabling solutions designed to keep your business fully connected and absolutely secure.",
    cta1: "Get a Quote",
    cta2: "Explore Services"
  });

  const [aboutInfo, setAboutInfo] = useState({
    title: "Who We Are",
    tagline: "Secure. Connect. Protect.",
    headline: "Your Premier Infrastructure Systems Engineering Team",
    description1: "Core Vision Pakistan has emerged as a premier technology solution provider, introducing extreme attention-to-detail into hardware installations. We service commercial buildings, residential hubs, and industrial warehouses, laying fast optical fibers and smart networks.",
    description2: "Our engineering guidelines bypass general shortcuts, delivering certified calibrations, neat cabling, and lifetime peace of mind. Let us protect what matters to you with the highest standard in security systems."
  });

  // General App States
  const [currentRoute, setCurrentRoute] = useState<{ page: string; serviceId?: string }>({ page: "home" });
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Interactive Modals
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);

  // Public Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [showGlobalSuccess, setShowGlobalSuccess] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Load persistence database from localStorage on mount
  useEffect(() => {
    // Services
    const savedServices = localStorage.getItem("coreguard_services_db");
    if (savedServices) {
      try {
        const parsed = JSON.parse(savedServices) as Service[];
        const migrated = parsed.map(s => {
          const defaultService = DEFAULT_SERVICES.find(ds => ds.id === s.id);
          if (defaultService) {
            return { ...s, imageUrl: defaultService.imageUrl };
          }
          return s;
        });
        setServices(migrated);
        localStorage.setItem("coreguard_services_db", JSON.stringify(migrated));
      } catch (e) {
        setServices(DEFAULT_SERVICES);
      }
    } else {
      setServices(DEFAULT_SERVICES);
    }

    // Benefits
    const savedBenefits = localStorage.getItem("coreguard_benefits_db");
    if (savedBenefits) {
      try {
        setBenefits(JSON.parse(savedBenefits));
      } catch (e) {
        setBenefits(DEFAULT_BENEFITS);
      }
    } else {
      setBenefits(DEFAULT_BENEFITS);
    }

    // Stats
    const savedStats = localStorage.getItem("coreguard_stats_db");
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        setStats(DEFAULT_STATS);
      }
    } else {
      setStats(DEFAULT_STATS);
    }

    // FAQs
    const savedFaqs = localStorage.getItem("coreguard_faqs_db");
    if (savedFaqs) {
      try {
        setFaqs(JSON.parse(savedFaqs));
      } catch (e) {
        setFaqs(DEFAULT_FAQS);
      }
    } else {
      setFaqs(DEFAULT_FAQS);
    }

    // Contact info
    const savedContact = localStorage.getItem("coreguard_contact_db");
    if (savedContact) {
      try {
        const parsed = JSON.parse(savedContact);
        if (parsed.email === "support@coreguard.com" || parsed.phone?.includes("5826202") || parsed.address?.includes("I-8")) {
          const updated = {
            ...parsed,
            phone: "0306 4422550",
            email: "corevisionpk@gmail.com",
            address: "Flat #2, Ist Floor, Abdullah Plaza, Phase 4-A, Ghouri Town, Islamabad",
            latitude: "33.6186",
            longitude: "73.1368",
            whatsapp: "+92 306 4422550"
          };
          setContactInfo(updated);
          localStorage.setItem("coreguard_contact_db", JSON.stringify(updated));
        } else {
          setContactInfo(parsed);
        }
      } catch (e) {}
    }

    // Hero Customization
    const savedHero = localStorage.getItem("coreguard_hero_db");
    if (savedHero) {
      try {
        setHeroInfo(JSON.parse(savedHero));
      } catch (e) {}
    }

    // About Customization
    const savedAbout = localStorage.getItem("coreguard_about_db");
    if (savedAbout) {
      try {
        setAboutInfo(JSON.parse(savedAbout));
      } catch (e) {}
    }
  }, []);

  // Sync to database savers
  const saveServicesToStorage = (updated: Service[]) => {
    localStorage.setItem("coreguard_services_db", JSON.stringify(updated));
    setServices(updated);
  };

  const saveContactToStorage = (updated: typeof contactInfo) => {
    localStorage.setItem("coreguard_contact_db", JSON.stringify(updated));
    setContactInfo(updated);
  };

  const saveHeroToStorage = (updated: typeof heroInfo) => {
    localStorage.setItem("coreguard_hero_db", JSON.stringify(updated));
    setHeroInfo(updated);
  };

  const saveAboutToStorage = (updated: typeof aboutInfo) => {
    localStorage.setItem("coreguard_about_db", JSON.stringify(updated));
    setAboutInfo(updated);
  };

  const saveBenefitsToStorage = (updated: Benefit[]) => {
    localStorage.setItem("coreguard_benefits_db", JSON.stringify(updated));
    setBenefits(updated);
  };

  const saveStatsToStorage = (updated: Stat[]) => {
    localStorage.setItem("coreguard_stats_db", JSON.stringify(updated));
    setStats(updated);
  };

  // Core loading trigger mimics security sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 150);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 12;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Sticky header and back-to-top thresholds
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced path and hash-based routing system
  const parseCurrentRoute = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;
    
    if (path === "/contact" || path === "/contact/" || hash === "#/contact" || hash === "#contact") {
      return { page: "contact" };
    }
    if (path === "/services" || path === "/services/" || hash === "#/services" || hash === "#services") {
      return { page: "services" };
    }
    if (path === "/about" || path === "/about/" || hash === "#/about" || hash === "#about") {
      return { page: "about" };
    }
    if (path === "/why-us" || path === "/why-us/" || hash === "#/why-us" || hash === "#why-us") {
      return { page: "why-us" };
    }
    if (path === "/partners" || path === "/partners/" || hash === "#/partners" || hash === "#partners") {
      return { page: "partners" };
    }
    
    const servicePathMatch = path.match(/^\/service\/([^/]+)/);
    if (servicePathMatch) {
      return { page: "service", serviceId: servicePathMatch[1] };
    }
    
    const serviceHashMatch = hash.match(/^#\/service\/([^/]+)/);
    if (serviceHashMatch) {
      return { page: "service", serviceId: serviceHashMatch[1] };
    }
    
    const params = new URLSearchParams(search);
    const serviceId = params.get("service");
    if (serviceId) {
      return { page: "service", serviceId };
    }
    
    return { page: "home" };
  };

  const navigateTo = (route: { page: string; serviceId?: string }) => {
    let url = "/";
    if (route.page === "service" && route.serviceId) {
      url = `/service/${route.serviceId}`;
    } else if (route.page === "services") {
      url = "/services";
    } else if (route.page === "about") {
      url = "/about";
    } else if (route.page === "why-us") {
      url = "/why-us";
    } else if (route.page === "partners") {
      url = "/partners";
    } else if (route.page === "contact") {
      url = "/contact";
    }
    
    window.history.pushState(null, "", url);
    
    // Defer the popstate event to decouple it from current React render or event task queue
    setTimeout(() => {
      window.dispatchEvent(new Event("popstate"));
    }, 0);
  };

  useEffect(() => {
    const checkRoute = () => {
      const parsed = parseCurrentRoute();
      
      // Dynamic premium page loading transitions
      setPageLoading(true);
      setTimeout(() => {
        setCurrentRoute(parsed);
        setPageLoading(false);
        window.scrollTo(0, 0);
      }, 350);
    };

    checkRoute();

    window.addEventListener("popstate", checkRoute);
    window.addEventListener("hashchange", checkRoute);

    return () => {
      window.removeEventListener("popstate", checkRoute);
      window.removeEventListener("hashchange", checkRoute);
    };
  }, []);

  const triggerQuote = (serviceId?: string) => {
    window.dispatchEvent(new CustomEvent("open-sophia-chat", { detail: { serviceId } }));
  };

  const selectServiceDetail = (service: Service) => {
    navigateTo({ page: "service", serviceId: service.id });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccess(true);
      setShowGlobalSuccess(true);
      setContactForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => {
        setContactSuccess(false);
      }, 5000);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-sans text-white">
        <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-dashed border-[#ef233c] animate-[spin_40s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full border border-dotted border-[#d90429] animate-[spin_60s_linear_infinite_reverse]" />
        </div>

        <div className="relative text-center max-w-sm px-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#0a0a0c] rounded-full border-2 border-[#ef233c] shadow-[0_0_30px_rgba(239,35,60,0.4)] relative animate-bounce overflow-hidden flex items-center justify-center">
              <img
                src={logo}
                alt="Core Vision Pakistan Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            CORE<span className="text-[#ef233c]">GUARD</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#ef233c] font-bold mt-1.5">
            Secure • Connect • Protect
          </p>

          <div className="mt-8">
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-[#ef233c] to-[#d90429] shadow-[0_0_12px_#ef233c] rounded-full transition-all duration-150"
                style={{ width: `${Math.min(loadingProgress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mt-2">
              <span className="text-[#ef233c] font-semibold animate-pulse">
                {loadingProgress < 40 ? "Checking Hardware Interfaces..." : 
                 loadingProgress < 80 ? "Verifying Telecom Trunking..." : 
                 "Red Noir Protocol Initialized."}
              </span>
              <span>{Math.min(loadingProgress, 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-[#ef233c] selection:text-white relative">
      <CustomCursor />
      
      {/* INTERACTIVE SOPHIA CHATBOT ASSISTANT */}
      <SophiaChat />

      {/* FLOAT BACK TO TOP */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-8 z-40 flex items-center justify-center h-10 w-10 rounded-full bg-[#0a0a0c] text-zinc-300 hover:text-[#ef233c] border border-white/10 hover:border-[#ef233c] shadow-lg hover:shadow-[0_0_20px_rgba(239,35,60,0.35)] transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 animate-in slide-in-from-bottom-5"
          aria-label="Back to Top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* BACKGROUND FLOATING PLEXUS LINES & PASTEL GEOMETRICS */}
      <NetworkBackground />
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-25">
        <FloatingGeometrics />
      </div>

      {/* NEW GLASSMORPHISM PREMIUM NAVBAR */}
      <Navbar 
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        contactPhone={contactInfo.phone}
        onTriggerQuote={(srvId) => triggerQuote(srvId)}
      />

      {/* CONDITIONAL MAIN CONTENT DISPLAY */}
      <AnimatePresence mode="wait">
        {currentRoute.page === "services" ? (
          <ServicesPage 
            key="services-page"
            services={services}
            onSelectService={(s) => selectServiceDetail(s)}
            onBackToHome={() => navigateTo({ page: "home" })}
            onTriggerQuote={(srvId) => triggerQuote(srvId)}
          />
        ) : currentRoute.page === "service" ? (
          (() => {
            const selectedService = services.find(s => s.id === currentRoute.serviceId);
            if (!selectedService) return <div className="pt-32 pb-24 text-center text-zinc-500 font-mono text-sm">Service not found.</div>;
            return (
              <ServiceDetailView 
                key={`service-${currentRoute.serviceId}`}
                service={selectedService} 
                onBack={() => navigateTo({ page: "home" })} 
                onBook={(srvId) => triggerQuote(srvId)} 
              />
            );
          })()
        ) : currentRoute.page === "contact" ? (
          <ContactPage 
            key="contact-page"
            contactInfo={contactInfo} 
            onTriggerQuote={(srvId) => triggerQuote(srvId)} 
          />
        ) : currentRoute.page === "about" ? (
          <AboutPage key="about-page" />
        ) : currentRoute.page === "why-us" ? (
          <WhyUsPage key="why-us-page" />
        ) : currentRoute.page === "partners" ? (
          <PartnersPage 
            key="partners-page"
            onTriggerQuote={(srvId) => triggerQuote(srvId)}
          />
        ) : (
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black min-h-screen text-white font-['Open_Sans'] pt-16"
          >
            {/* INOVE HEADER IMAGE / AI VIDEO SHOWCASE (himage) */}
            <div className="inove-himage shadow-2xl">
              <HeroVideoBackground />
            </div>

            {/* INOVE BLOCK 1: ABOUT / MANIFEST WITH SWIPE-LEFT SCROLL ANIMATION */}
            <motion.div 
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 90, damping: 16, mass: 0.9 }}
              className="w-[85%] max-w-[1500px] mx-auto py-16 sm:py-20 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Column 1: Core Vision Purpose Statement */}
                <motion.div 
                  initial={{ opacity: 0, x: 70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.05 }}
                  className="md:col-span-4 bg-zinc-950/80 border border-white/10 rounded-2xl p-7 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between min-h-[260px]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-[#ef233c] uppercase tracking-wider">
                        Enterprise Infrastructure
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        ISO / OEM Spec
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-300 font-normal">
                      Architecting mission-critical IT infrastructure, enterprise ELV systems, smart surveillance grids, and high-speed optical fusion backbones.
                    </p>
                  </div>
                  
                  <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Core <span className="text-[#ef233c]">Guard</span>
                    </h2>
                    <span className="text-xs text-zinc-500 font-mono">
                      Est. 2026
                    </span>
                  </div>
                </motion.div>

                {/* Column 2: Engineering & Precision Manifesto */}
                <motion.div 
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.12 }}
                  className="md:col-span-5 bg-zinc-950/80 border border-white/10 rounded-2xl p-7 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between min-h-[260px]"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 tracking-wide">
                        Engineering Precision
                      </span>
                      <span className="text-[10px] font-mono text-[#ef233c]">
                        Zero Defect Standard
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      Mission-Critical <span className="text-[#ef233c]">Reliability</span>
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-normal">
                      From sub-decibel Fujikura optical fusion loops to high-density Cat6A patch matrices, we engineer networks built for 99.98% high-uptime uptime.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span>Fluke Tested & Certified</span>
                    <span className="text-emerald-400 font-medium">10G Ready</span>
                  </div>
                </motion.div>

                {/* Column 3: Direct Channels & SLA Commitments */}
                <motion.div 
                  initial={{ opacity: 0, x: 90 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.18 }}
                  className="md:col-span-3 bg-zinc-950/80 border border-white/10 rounded-2xl p-7 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between min-h-[260px]"
                >
                  <div>
                    <h3 className="text-base font-bold text-white mb-3 tracking-wide flex items-center justify-between">
                      <span>NOC Dispatch</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                        Online
                      </span>
                    </h3>
                    
                    <div className="flex items-center gap-2 pt-1">
                      <a 
                        href={`https://wa.me/${contactInfo.phone.replace(/\D/g, "")}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all flex items-center justify-center gap-1.5 text-xs font-medium"
                        title="Direct WhatsApp Support"
                      >
                        <MessageSquare size={13} />
                        <span>Chat</span>
                      </a>

                      <a 
                        href={`tel:${contactInfo.phone.replace(/\D/g, "")}`} 
                        className="flex-1 py-2 px-3 rounded-lg border border-white/10 hover:bg-white/5 text-white transition-all flex items-center justify-center gap-1.5 text-xs font-medium"
                        title="Priority Hotline"
                      >
                        <Phone size={13} />
                        <span>Call</span>
                      </a>

                      <button 
                        onClick={() => triggerQuote()}
                        className="p-2 rounded-lg bg-[#ef233c] hover:bg-[#d90429] text-white transition-all cursor-pointer"
                        title="Launch Quote Simulator"
                      >
                        <Sparkles size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Quality & Response Commitments */}
                  <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-zinc-400 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span>SLA COMMITMENT:</span>
                      <b className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        99.98% Guaranteed
                      </b>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>RESPONSE:</span>
                      <b className="text-[#ef233c] font-bold">&lt; 2 Hours Dispatch</b>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* HORIZONTAL LINE DIVIDER */}
            <div className="inove-hline" />

            {/* INOVE BLOCK 2: SHOWROOM GALLERY, CLIENTS & PROJECT TAGS (.block.tri.showroom) */}
            <div className="inove-block inove-tri showroom text-left">
              {/* Column 1: Showroom Gallery (Strictly User's 8 Services with 3D Side Swipe-In) */}
              <div className="inove-bbox inove-gallery">
                <motion.h2 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-mono text-2xl sm:text-3xl font-bold text-white mb-8 uppercase tracking-wider"
                >
                  Solutions <span className="text-[#ef233c]">Matrix</span>
                </motion.h2>

                <div className="space-y-1">
                  {services.map((service, idx) => (
                    <ShowroomCard3D
                      key={service.id}
                      service={service}
                      index={idx}
                      onSelect={selectServiceDetail}
                    />
                  ))}
                </div>
              </div>

              {/* Column 2: Commercial Sectors */}
              <div className="inove-bbox inove-clients">
                <h2 className="font-semibold text-2xl sm:text-3xl text-white mb-8 tracking-tight">
                  Enterprise <span className="text-[#ef233c]">Sectors</span>
                </h2>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs text-white">Corporate High-Rises</span>
                      <span className="text-[9px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">ELV Infrastructure</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">Integrated biometric checkpoints, perimeter surveillance, and building-wide Gigabit fiber backbones.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs text-white">Industrial Logistics & Warehouses</span>
                      <span className="text-[9px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">Thermal PTZ</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">Wide-angle thermal PTZ cameras, license-plate recognition, and heavy armored cabling conduits.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs text-white">Residential Compounds & Embassies</span>
                      <span className="text-[9px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">High Security</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">Low-profile 4K multi-lens cameras, smart intercoms, and redundant fiber internet loops.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-zinc-300">
                    <div className="p-2.5 rounded-lg border border-white/10 bg-zinc-950/80 text-center hover:border-white/20 transition-all">Datacenters</div>
                    <div className="p-2.5 rounded-lg border border-white/10 bg-zinc-950/80 text-center hover:border-white/20 transition-all">Commercial Plazas</div>
                  </div>
                </div>
              </div>

              {/* Column 3: Project Tags */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inove-bbox inove-tags"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-['Open_Sans_Condensed'] text-3xl sm:text-4xl font-light text-white">
                    Project Tags
                  </h2>
                  <span className="text-[10px] font-mono font-bold text-[#ef233c] uppercase tracking-widest bg-[#ef233c]/10 px-2 py-0.5 rounded-full border border-[#ef233c]/20">
                    Live Taxonomy
                  </span>
                </div>

                <motion.div 
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.04,
                        delayChildren: 0.1
                      }
                    }
                  }}
                  className="inove-tag-list"
                >
                  {[
                    { text: "4K Surveillance", isLarge: true },
                    { text: "Fujikura Fusion", isLarge: false },
                    { text: "OTDR Diagnostics", isLarge: true },
                    { text: "Cat6A Solid Copper", isLarge: false },
                    { text: "Biometric AI", isLarge: true },
                    { text: "VLAN Isolation", isLarge: false },
                    { text: "Ultra-High Uptime", isLarge: true },
                    { text: "Remote Cloud DDNS", isLarge: false },
                    { text: "Fluke Tested", isLarge: true },
                    { text: "RAID NVR Storage", isLarge: false },
                    { text: "Smart PTZ Tracking", isLarge: true },
                    { text: "Armored Conduit", isLarge: false },
                    { text: "H.265+ Compression", isLarge: true },
                    { text: "Patch Bay Modular", isLarge: false },
                    { text: "Zero Dead-Zones", isLarge: true }
                  ].map((tag, idx) => (
                    <motion.span
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
                        show: { 
                          opacity: 1, 
                          x: 0, 
                          filter: "blur(0px)",
                          transition: { type: "spring", stiffness: 140, damping: 15 }
                        }
                      }}
                      whileHover={{ scale: 1.08, x: -3, transition: { duration: 0.15 } }}
                      className="inline-block cursor-pointer select-none"
                    >
                      {tag.isLarge ? (
                        <h4>{tag.text}</h4>
                      ) : (
                        <h5>{tag.text}</h5>
                      )}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Action Blueprint Button */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => triggerQuote()}
                    className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-['Open_Sans'] font-bold text-xs py-3.5 px-4 rounded-xl uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(239,35,60,0.35)] hover:shadow-[0_0_30px_rgba(239,35,60,0.5)] cursor-pointer text-center flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} />
                    <span>Generate Instant Quote</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* HORIZONTAL LINE DIVIDER */}
            <div className="inove-hline" />

            {/* OFFICIAL OEM PARTNERS & HARDWARE COMPLIANCE MARQUEE */}
            <PartnersShowcase />

            {/* HORIZONTAL LINE DIVIDER */}
            <div className="inove-hline" />

            {/* CERTIFIED ENGINEERING SHOWCASE & DEPLOYMENT PROTOCOL */}
            <EngineeringShowcase 
              onTriggerQuote={(srvId) => triggerQuote(srvId)}
              onExploreServices={() => navigateTo({ page: "services" })}
            />

            {/* HORIZONTAL LINE DIVIDER */}
            <div className="inove-hline" />

            {/* INOVE BLOCK 3: FOOTER (.block.footer) */}
            <div className="inove-block inove-footer text-center py-12 space-y-4">
              <a 
                className="font-['Open_Sans'] text-sm sm:text-base text-zinc-300 hover:text-[#ef233c] font-medium tracking-wide transition-colors block"
                href={`mailto:${contactInfo.email}`}
              >
                {contactInfo.email.replace("@", " @ ")}
              </a>
              <div className="w-12 h-12 mx-auto rounded-full overflow-hidden border border-white/20 bg-[#0a0a0c] shadow-[0_0_15px_rgba(239,35,60,0.2)]">
                <img src={logo} alt="Core Vision Pakistan" className="w-full h-full object-cover" />
              </div>
              <div className="font-['Open_Sans'] text-xs text-zinc-500 font-bold tracking-widest uppercase">
                2026 • Core Vision Pakistan • Islamabad HQ
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED PREMIUM RED NOIR ENTERPRISE FOOTER (For Subpages) */}
      {currentRoute.page !== "home" && (
        <footer className="bg-[#0a0a0c] text-zinc-400 pt-16 pb-8 text-left relative border-t border-white/10 z-10 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10 text-sm">
            
            {/* Column 1 info and desc */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full border border-white/15 overflow-hidden bg-black shrink-0 shadow-sm">
                  <img
                    src={logo}
                    alt="Core Vision Pakistan Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-display font-black text-lg text-white leading-none uppercase">
                  Core <span className="text-[#ef233c]">Vision</span> Pakistan
                </span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-xs font-medium">
                A premium tech services provider specialized in corporate structured cabling trunkings, biometrics controls, smart optical fibers terminations, and high-definition CCTV security configurations.
              </p>
              <div className="flex gap-2.5 pt-2 text-[9px] font-mono uppercase tracking-wider font-bold">
                <span className="text-[#ef233c] hover:underline cursor-pointer">secure</span>
                <span className="text-zinc-700">|</span>
                <span className="text-[#ef233c] hover:underline cursor-pointer">connect</span>
                <span className="text-zinc-700">|</span>
                <span className="text-[#ef233c] hover:underline cursor-pointer">protect</span>
              </div>
            </div>

            {/* Column 2 navigation links */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="font-sans font-extrabold text-[11px] uppercase tracking-widest text-white">Portal Index</h4>
              <ul className="space-y-2 text-xs font-semibold text-zinc-400 font-mono">
                <li><button onClick={() => navigateTo({ page: "home" })} className="hover:text-[#ef233c] text-left transition-colors cursor-pointer">Home landing</button></li>
                <li><button onClick={() => navigateTo({ page: "services" })} className="hover:text-[#ef233c] text-left transition-colors cursor-pointer">Solutions Catalog</button></li>
                <li><button onClick={() => navigateTo({ page: "about" })} className="hover:text-[#ef233c] text-left transition-colors cursor-pointer">About Engineering</button></li>
                <li><button onClick={() => navigateTo({ page: "why-us" })} className="hover:text-[#ef233c] text-left transition-colors cursor-pointer">Certified Promise</button></li>
                <li><button onClick={() => navigateTo({ page: "partners" })} className="hover:text-[#ef233c] text-left transition-colors cursor-pointer">OEM Alliances</button></li>
                <li><button onClick={() => navigateTo({ page: "contact" })} className="hover:text-[#ef233c] text-left transition-colors cursor-pointer">Security Dispatch</button></li>
              </ul>
            </div>

            {/* Column 3 Quick request actions */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="font-sans font-extrabold text-[11px] uppercase tracking-widest text-white">Key Solutions</h4>
              <ul className="space-y-2 text-xs text-zinc-400 font-semibold font-mono">
                <li><button onClick={() => triggerQuote("cctv-install")} className="hover:text-[#ef233c] text-left cursor-pointer transition-colors">CCTV HD Deployments</button></li>
                <li><button onClick={() => triggerQuote("fiber-splicing")} className="hover:text-[#ef233c] text-left cursor-pointer transition-colors">Optical Fiber Splicing</button></li>
                <li><button onClick={() => triggerQuote("network-setup")} className="hover:text-[#ef233c] text-left cursor-pointer transition-colors">Enterprise Setup Routing</button></li>
                <li><button onClick={() => triggerQuote("biometric-system")} className="hover:text-[#ef233c] text-left cursor-pointer transition-colors">SSID & Biometric Loggers</button></li>
              </ul>
            </div>

            {/* Column 4 dispatch support info */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="font-sans font-extrabold text-[11px] uppercase tracking-widest text-white">Support Desk</h4>
              <p className="text-xs text-zinc-400 leading-normal font-medium">
                Islamabad HQ Hub Block:<br />
                {contactInfo.address}
              </p>
              <div className="pt-2">
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-1.5 bg-[#ef233c]/10 border border-[#ef233c]/30 hover:bg-[#ef233c] hover:text-white text-[#ef233c] py-2 px-3.5 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider hover:shadow-[0_0_15px_rgba(239,35,60,0.3)] transition-all cursor-pointer"
                >
                  <Phone size={10} /> Call Dispatch Priority
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium mt-8">
            <span>Copyright © 2026 Core Vision Pakistan Technology Services Company. All Rights Reserved.</span>
            <div className="flex gap-4 font-mono text-[9px] uppercase tracking-wider items-center">
              <span className="hover:text-[#ef233c] cursor-pointer">Terms</span>
              <span>•</span>
              <span className="hover:text-[#ef233c] cursor-pointer">Privacy Protocol</span>
            </div>
          </div>

        </div>
      </footer>
      )}
      {/* ESTIMATE QUOTE TRIGGER OVERLAY */}
      <QuoteDialog 
        isOpen={quoteDialogOpen}
        onClose={() => { setQuoteDialogOpen(false); setPreselectedService(undefined); }}
        preselectedServiceId={preselectedService}
        services={services}
        onSuccess={() => setShowGlobalSuccess(true)}
      />

      {/* DEDICATED THEMATIC SUCCESS NOTIFICATION */}
      <SuccessNotification 
        isOpen={showGlobalSuccess}
        onClose={() => setShowGlobalSuccess(false)}
      />

    </div>
  );
}

import React, { useState, useEffect } from "react";
import logo from "../assets/images/coreguard_logo_1782336134989.jpg";
import { Phone, Menu, X, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentRoute: { page: string; serviceId?: string };
  onNavigate: (route: { page: string; serviceId?: string }) => void;
  contactPhone: string;
  onTriggerQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, contactPhone, onTriggerQuote }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const threshold = 8;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Always show navbar near top of page
      if (currentY < 60) {
        setIsVisible(true);
        setScrolled(currentY > 15);
        lastY = currentY;
        return;
      }

      setScrolled(true);

      // Check scroll direction with threshold to prevent jitter
      if (Math.abs(currentY - lastY) > threshold) {
        if (currentY > lastY) {
          // Scrolling DOWN -> Hide navbar smoothly
          setIsVisible(false);
          setMobileMenuOpen(false);
        } else {
          // Scrolling UP -> Reveal navbar smoothly
          setIsVisible(true);
        }
        lastY = currentY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent, targetPage: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate({ page: targetPage });
  };

  const isActive = (pageName: string) => currentRoute.page === pageName;

  const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.65-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.057-.378-.018-.53-.074-.152-.707-1.7-.97-2.324-.262-.624-.524-.524-.724-.553-.198-.028-.399-.028-.592-.028-.2 0-.52.074-.792.372-.272.299-.988.968-.988 2.481 0 1.512 1.102 2.977 1.256 3.182.154.205 1.664 2.646 4.013 3.747 1.41.662 2.507.87 3.377.93 1.048.077 1.632-.125 2.022-.381.502-.33.799-.72.918-1.097.12-.377.06-.704-.03-.885-.09-.181-.333-.297-.63-.447z" />
    </svg>
  );

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.32, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.9)] border-b border-white/10' 
          : 'bg-black/85 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      {/* Enterprise Status Strip */}
      <div className="hidden sm:block border-b border-white/5 bg-black/80 px-4 py-1.5 text-[10px] font-mono text-zinc-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              24/7 NOC Active
            </span>
            <span className="text-zinc-600">/</span>
            <span>Uptime: <strong className="text-zinc-200">99.98%</strong></span>
            <span className="hidden md:inline text-zinc-600">/</span>
            <span className="hidden md:inline">ELV & Optical Splicing</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={`tel:${contactPhone}`} className="text-zinc-400 hover:text-white transition-colors">
              Support: {contactPhone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate({ page: 'home' })}>
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center bg-zinc-900">
              <img src={logo} alt="Core Vision Pakistan Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm sm:text-base text-white tracking-tight flex items-center gap-1">
                Core <span className="text-[#ef233c]">Guard</span>
              </span>
              <span className="hidden sm:block text-[9px] text-zinc-500 font-mono tracking-wider">
                Precision Infrastructure
              </span>
            </div>
          </div>

          {/* Center: primary links */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { id: 'home', label: 'Home', path: '/' },
              { id: 'services', label: 'Services', path: '/services' },
              { id: 'partners', label: 'Partners', path: '/partners' },
              { id: 'about', label: 'About', path: '/about' },
              { id: 'why-us', label: 'Why Us', path: '/why-us' },
              { id: 'contact', label: 'Contact', path: '/contact' },
            ].map((link) => (
              <a
                key={link.id}
                href={link.path}
                onClick={(e) => handleNavLinkClick(e, link.id)}
                className={`text-xs tracking-wide transition-colors ${
                  isActive(link.id) 
                    ? 'text-white font-semibold border-b border-[#ef233c] pb-1' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <a href={`tel:${contactPhone}`} className="hidden xl:inline-flex items-center gap-2 text-xs font-mono text-zinc-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors border border-white/10">
              <Phone size={12} className="text-[#ef233c]" />
              <span>{contactPhone}</span>
            </a>

            <button 
              onClick={onTriggerQuote} 
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#ef233c] hover:bg-[#d90429] text-white px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer"
            >
              <Sparkles size={12} />
              <span>Get a Quote</span>
            </button>

            <a 
              href="https://wa.me/923064422550" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 shadow-xs transition-colors"
              title="WhatsApp Direct"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            {/* Mobile: menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0a0a0c] border-t border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="px-5 py-4 space-y-3">
              {[ 'home', 'services', 'partners', 'about', 'why-us', 'contact' ].map((id) => (
                <a 
                  key={id} 
                  href={`/${id === 'home' ? '' : id}`} 
                  onClick={(e) => handleNavLinkClick(e, id)} 
                  className={`block text-sm uppercase font-mono tracking-wider py-2 px-3 rounded-lg ${
                    isActive(id) ? 'bg-[#ef233c]/10 text-[#ef233c] font-bold border border-[#ef233c]/20' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  {id === 'why-us' ? 'Why Us' : id === 'partners' ? 'Partners' : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10">
                <button 
                  onClick={() => { setMobileMenuOpen(false); onTriggerQuote(); }} 
                  className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white py-3 rounded-xl font-mono font-bold uppercase text-xs tracking-wider shadow-[0_0_20px_rgba(239,35,60,0.35)] flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} />
                  <span>Launch Quote Simulator</span>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

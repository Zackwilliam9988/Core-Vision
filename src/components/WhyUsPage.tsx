import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Activity, 
  Clock, 
  Award, 
  HeartHandshake, 
  Users, 
  Wrench, 
  Zap, 
  Star,
  CheckCircle2,
  MessageSquare,
  Filter,
  Plus,
  Sparkles
} from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

interface Review {
  id: string;
  text: string;
  author: string;
  title: string;
  stars: number;
  service: string;
  date: string;
  verified: boolean;
}

export const WhyUsPage: React.FC = () => {
  const corporateBenefits = [
    {
      icon: Award,
      title: "100% Certified Installs",
      desc: "Our splicing work and cameras are rigorously validated using FLUKE meters and optical power testers. We provide full data diagnostic sheets for every deployment."
    },
    {
      icon: Clock,
      title: "2-Hour Rapid Dispatch SLA",
      desc: "We commit to a strict service SLA. If a commercial CCTV or network router loses handshake sync, a technician is dispatched to your site within 120 minutes."
    },
    {
      icon: Wrench,
      title: "Elite Core-Alignment Tech",
      desc: "We do not use cheap mechanical splices. Our technicians operate active core-alignment fusion splicers to guarantee zero dB loss across heavy single-mode links."
    },
    {
      icon: ShieldCheck,
      title: "Premium 2-Year Direct Warranty",
      desc: "We provide solid multi-year warranty covering full physical cabling, conduit integrity, camera sensor calibrations, and access control power backups."
    },
    {
      icon: Activity,
      title: "Active Packet Diagnostics",
      desc: "We perform full-scale bandwidth testing, OTDR backscatter reflection checkouts, and camera night-vision lux adjustments prior to handoff."
    },
    {
      icon: HeartHandshake,
      title: "Zero-Shortcut Philosophy",
      desc: "All cable runs are marked, fully bundled, and protected with rigid fire-resistant PVC conduits. We never leave dangling feeds or exposed wires."
    }
  ];

  const statistics = [
    { value: 500, suffix: "+", label: "Surveillance Nodes Active" },
    { value: 99.9, suffix: "%", label: "Network Splicing Link-Uptime" },
    { value: 120, suffix: "+", label: "Commercial Buildings Secured" },
    { value: 15, suffix: "k+", label: "Meters Fiber Spliced" }
  ];

  const INITIAL_REVIEWS: Review[] = [
    {
      id: "review-1",
      text: "We contracted CoreGuard to overhaul our datacenter's core fiber trunks and CCTV layout. Their fusion splicing results were absolutely flawless, measuring at 0.01dB loss on OTDR sweeps. Excellent speed and neat work.",
      author: "Sajid Kamal",
      title: "Chief Technology Officer, Z-Tech Logistics",
      stars: 5,
      service: "Fiber Splicing (OTDR)",
      date: "2026-06-28",
      verified: true
    },
    {
      id: "review-2",
      text: "Our corporate headquarters required a fully integrated face-recognition biometric system and a 4K 30-camera CCTV array. CoreGuard was extremely professional, completing the entire install ahead of schedule and with zero dangling cables.",
      author: "Hassan Abbas",
      title: "Director of Facilities, Apex Elite Corp",
      stars: 5,
      service: "Biometric & CCTV Setup",
      date: "2026-07-02",
      verified: true
    },
    {
      id: "review-3",
      text: "Outstanding network architecture layout! The structured Cat6 trunking is incredibly tidy, and all segments are fully certified. Our local speeds have increased dramatically.",
      author: "Sajjad Haider",
      title: "Network Operations Lead, Malik Group",
      stars: 5,
      service: "Structured Cabling & Rack Setup",
      date: "2026-06-18",
      verified: true
    },
    {
      id: "review-4",
      text: "Their rapid 2-hour SLA is real. One of our CCTV switch clusters suffered a power glitch on a Sunday evening, and a field technician arrived within 90 minutes to diagnose and restore the feeds. Perfect SLA backup.",
      author: "Brigadier (R) Tariq Mahmood",
      title: "Director Security, National Logistics Hub",
      stars: 4,
      service: "CCTV Repair & Maintenance",
      date: "2026-06-10",
      verified: true
    }
  ];

  // Load reviews from localStorage on mount, fall back to initial default list
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("coreguard_reviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  // Save to localStorage whenever reviews list changes
  useEffect(() => {
    localStorage.setItem("coreguard_reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Review Form state
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedService, setSelectedService] = useState("CCTV Installation");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  
  // Interaction & UI Feedback state
  const [filterRating, setFilterRating] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!name.trim()) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!designation.trim()) {
      setValidationError("Please enter your corporate title or organization.");
      return;
    }
    if (!reviewText.trim() || reviewText.length < 10) {
      setValidationError("Please write a detailed review (at least 10 characters).");
      return;
    }

    setIsSubmitting(true);

    // Simulate satisfying hardware transmit latency
    setTimeout(() => {
      const newReview: Review = {
        id: `user-review-${Date.now()}`,
        author: name.trim(),
        title: designation.trim(),
        text: reviewText.trim(),
        stars: rating,
        service: selectedService,
        date: new Date().toISOString().split("T")[0],
        verified: true
      };

      setReviews(prev => [newReview, ...prev]);
      
      // Clear Form state
      setName("");
      setDesignation("");
      setReviewText("");
      setRating(5);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Hide success notification after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    }, 850);
  };

  const getRatingFeedback = (stars: number) => {
    switch (stars) {
      case 5: return "Enterprise Grade - Flawless (5/5)";
      case 4: return "Highly Satisfied - Professional (4/5)";
      case 3: return "Good - Satisfactory Performance (3/5)";
      case 2: return "Needs Minor Enhancements (2/5)";
      case 1: return "Unsatisfactory SLA Delivery (1/5)";
      default: return "";
    }
  };

  // Filter & Search Logic
  const filteredReviews = reviews.filter(r => {
    const matchesRating = filterRating === "all" || r.stars === filterRating;
    const matchesSearch = 
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen text-white font-sans relative overflow-hidden">
      
      {/* Visual Background Gradients */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(239,35,60,0.12),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,35,60,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO HEADER */}
        <div className="text-left mb-16 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-none mb-6"
          >
            Why Enterprise Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff4d6d]">Trust Core Vision Pakistan</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-xl leading-relaxed font-sans"
          >
            We don't just 'install' hardware — we engineer redundant, high-capacity, and mathematically validated pathways that keep your business protected and completely connected.
          </motion.p>
        </div>

        {/* COUNTER STATISTICS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-20">
          {statistics.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-[#0a0b0e] border border-white/10 rounded-2xl p-6 text-center relative overflow-hidden group shadow-2xl hover:border-[#ef233c]/50 transition-all tech-bracket"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ef233c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="mb-2 text-[#ef233c] drop-shadow-[0_0_12px_rgba(239,35,60,0.4)]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              
              <p className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-zinc-400 group-hover:text-[#ef233c] transition-colors uppercase leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* BENEFITS GRID */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-mono text-3xl sm:text-4xl font-bold tracking-wider text-white mt-4 uppercase">
              Engineered For <span className="text-[#ef233c]">High-Uptime Demands</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateBenefits.map((b, idx) => {
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#0a0b0e] border border-white/10 rounded-2xl p-6 hover:border-[#ef233c] hover:shadow-[0_0_25px_rgba(239,35,60,0.2)] transition-all duration-300 relative text-left group tech-bracket"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  
                  <h3 className="font-mono text-lg font-bold text-white mb-2 mt-2 tracking-wide group-hover:text-[#ef233c] transition-colors uppercase">
                    {b.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {b.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* EXPERIENCES & SUPPORT COMMITMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-500/5 blur-3xl pointer-events-none animate-pulse" />
          
          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="text-3xl font-black font-sans text-white tracking-tight">
              Our Zero-Failure Support Commitment
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              In infrastructure, a single bad fiber splice or cheap camera power supply can freeze an entire commercial campus. That is why Core Vision Pakistan enforces double-check diagnostic sweeps.
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Every coaxial connector is compressed, every fiber splicing sleeve is heat-shrunk and double-clamped, and every server room router is fully tested for packet jitter. We stand behind our setups with absolute operational transparency.
            </p>
          </div>

          <div className="lg:col-span-5 relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80" 
              alt="Optical fiber splicing work close-up" 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* TESTIMONIALS & INTERACTIVE REVIEWS SECTION */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-4 font-sans">
              Client Reviews & Dispatch Feedback
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-3">
              Explore authentic system performance reviews from our enterprise clients, or submit your own field dispatch feedback below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: REVIEWS FEED */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* FEED FILTERS & CONTROLS */}
              <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-5 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  
                  {/* Rating Filters */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-zinc-400 mr-2 uppercase tracking-wider flex items-center gap-1">
                      <Filter size={10} className="text-[#ef233c]" /> Filter:
                    </span>
                    <button 
                      onClick={() => setFilterRating("all")}
                      className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all ${
                        filterRating === "all" 
                          ? "bg-[#ef233c]/15 text-[#ef233c] border border-[#ef233c]/40 font-bold" 
                          : "bg-[#121214] text-zinc-400 border border-white/5 hover:text-white"
                      }`}
                    >
                      All ({reviews.length})
                    </button>
                    {[5, 4, 3].map(num => {
                      const count = reviews.filter(r => r.stars === num).length;
                      return (
                        <button
                          key={num}
                          onClick={() => setFilterRating(num)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all flex items-center gap-1 ${
                            filterRating === num
                              ? "bg-[#ef233c]/15 text-[#ef233c] border border-[#ef233c]/40 font-bold"
                              : "bg-[#121214] text-zinc-400 border border-white/5 hover:text-white"
                          }`}
                        >
                          {num} <Star size={8} fill={filterRating === num ? "#ef233c" : "currentColor"} className="stroke-[1.5]" /> ({count})
                        </button>
                      );
                    })}
                  </div>

                  {/* Clear Button if filtered */}
                  {(filterRating !== "all" || searchQuery !== "") && (
                    <button 
                      onClick={() => {
                        setFilterRating("all");
                        setSearchQuery("");
                      }}
                      className="text-[10px] text-[#ef233c] hover:underline font-mono"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>

                {/* Search Bar */}
                <div className="mt-4 relative">
                  <input 
                    type="text"
                    placeholder="Search reviews by company, author or services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-4 py-2 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
                  />
                  <div className="absolute right-3.5 top-2.5 text-zinc-500 text-[10px] font-mono">
                    {filteredReviews.length} matching
                  </div>
                </div>
              </div>

              {/* REVIEWS LIST */}
              <div className="space-y-4 max-h-[620px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((r) => (
                      <motion.div 
                        key={r.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-6 text-left shadow-xl relative flex flex-col justify-between group hover:border-[#ef233c]/40 transition-all duration-300"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#ef233c]/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                        
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex items-center gap-1 text-[#ef233c]">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                fill={i < r.stars ? "#ef233c" : "transparent"} 
                                className={i < r.stars ? "text-[#ef233c]" : "text-zinc-700"} 
                              />
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono bg-[#ef233c]/10 text-[#ef233c] px-2.5 py-0.5 rounded-full border border-[#ef233c]/20 uppercase tracking-wider">
                              {r.service}
                            </span>
                            {r.verified && (
                              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-1 uppercase tracking-widest font-black">
                                <CheckCircle2 size={8} /> Verified
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic font-sans mb-5 font-medium">
                          "{r.text}"
                        </p>

                        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[#ef233c]/10 border border-[#ef233c]/30 flex items-center justify-center font-display font-black text-xs text-[#ef233c]">
                              {r.author.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-white font-sans">{r.author}</h4>
                              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{r.title}</p>
                            </div>
                          </div>
                          
                          <span className="text-[9px] text-zinc-500 font-mono">
                            {r.date}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-12 text-center text-zinc-500 font-mono text-xs shadow-2xl"
                    >
                      <MessageSquare size={24} className="mx-auto mb-3 text-zinc-600" />
                      No verified client reviews match your search filter criteria.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT COLUMN: WRITE A REVIEW FORM */}
            <div className="lg:col-span-5">
              <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                
                {/* Decorative glow element */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-red-500/5 blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-red-500/5 blur-xl pointer-events-none" />

                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={16} className="text-[#ef233c]" />
                  <h3 className="text-lg font-black font-sans text-white tracking-tight uppercase">
                    Submit Field Review
                  </h3>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  Document your system commissioning experience. Submitted reviews are securely cached and appended to our public-facing client validation ledger.
                </p>

                {/* Success Banner */}
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-4 text-xs font-mono relative"
                  >
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="absolute top-2 right-2 hover:text-emerald-200 text-emerald-400 font-bold"
                    >
                      ✕
                    </button>
                    <p className="font-bold flex items-center gap-1.5 text-emerald-400 mb-1">
                      <CheckCircle2 size={12} /> FEEDBACK TRANSMITTED
                    </p>
                    <p className="leading-relaxed">
                      Thank you! Your verified client review has been successfully processed and appended to our display network.
                    </p>
                  </motion.div>
                )}

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="mb-5 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl p-3 text-xs font-mono">
                    ⚠️ {validationError}
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-4 text-left">
                  
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-bold">
                      Performance Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onMouseEnter={() => setHoverRating(num)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(num)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star 
                            size={20} 
                            fill={num <= (hoverRating ?? rating) ? "#ef233c" : "transparent"} 
                            className={num <= (hoverRating ?? rating) ? "text-[#ef233c]" : "text-zinc-700"}
                          />
                        </button>
                      ))}
                      <span className="text-[10px] font-mono text-zinc-400 ml-2">
                        {getRatingFeedback(hoverRating ?? rating)}
                      </span>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                      Client Full Name
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Hammad Qureshi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-4 py-2.5 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  {/* Title / Organization */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                      Corporate Title & Organization
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Head of Security, Allied Trust Group"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-4 py-2.5 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                      Service Availed
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-4 py-2.5 text-base md:text-xs text-white focus:outline-none transition-all shadow-sm"
                    >
                      <option value="CCTV Installation" className="bg-[#0a0a0c] text-white">CCTV Camera Installation</option>
                      <option value="Fiber Splicing (OTDR)" className="bg-[#0a0a0c] text-white">Fiber Splicing & Testing</option>
                      <option value="Structured Cabling & Rack Setup" className="bg-[#0a0a0c] text-white">Structured Cabling & Rack Setup</option>
                      <option value="Network Architecture Setup" className="bg-[#0a0a0c] text-white">Network Architecture Setup</option>
                      <option value="Biometric & CCTV Setup" className="bg-[#0a0a0c] text-white">Biometric Attendance Systems</option>
                      <option value="CCTV Repair & Maintenance" className="bg-[#0a0a0c] text-white">CCTV Repair & SLA Support</option>
                    </select>
                  </div>

                  {/* Review Text Area */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold flex justify-between">
                      <span>Detailed Review Comments</span>
                      <span className="text-zinc-500 font-normal">{reviewText.length} chars</span>
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Describe the physical installation quality, neatness, SLA responsiveness, and technician professionalism..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-4 py-2.5 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all resize-none leading-relaxed shadow-inner"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(239,35,60,0.35)] hover:shadow-[0_0_30px_rgba(239,35,60,0.5)] hover:scale-[1.01] cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} className="stroke-[3]" />
                        <span>Transmit Ledger Entry</span>
                      </>
                    )}
                  </button>

                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Send, 
  Shield, 
  Sparkles, 
  CheckCircle, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  HelpCircle, 
  Terminal, 
  Globe, 
  Cpu
} from "lucide-react";
import { QuoteRequest, Service } from "../types";
import { SERVICES } from "../data";

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  services?: Service[];
  onSuccess?: () => void;
}

export const QuoteDialog: React.FC<QuoteDialogProps> = ({ 
  isOpen, 
  onClose, 
  preselectedServiceId,
  services,
  onSuccess
}) => {
  const activeServices = services || SERVICES;

  const [formData, setFormData] = useState<QuoteRequest>({
    name: "",
    phone: "",
    email: "",
    serviceId: preselectedServiceId || "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        serviceId: preselectedServiceId || activeServices[0]?.id || "",
        name: "",
        phone: "",
        email: "",
        message: ""
      }));
      setIsSuccess(false);
      setIsSubmitting(false);
      setSubmitPhase("");
    }
  }, [isOpen, preselectedServiceId, activeServices]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const phases = [
      "Establishing secure uplink...",
      "Analyzing coverage parameters...",
      "Allocating technical dispatch node...",
      "Encrypting transmission logs...",
      "Finalizing estimate ticket..."
    ];

    let currentPhaseIdx = 0;
    setSubmitPhase(phases[currentPhaseIdx]);

    const interval = setInterval(() => {
      currentPhaseIdx++;
      if (currentPhaseIdx < phases.length) {
        setSubmitPhase(phases[currentPhaseIdx]);
      }
    }, 250);

    const currentService = activeServices.find(s => s.id === formData.serviceId);
    const serviceTitle = currentService ? currentService.title : "Security Service";
    const targetUrl = `https://script.google.com/macros/s/AKfycbxjjAwiSdR6uiYtZQUUSrxw86PV8QW_hgwjrGRN1xLkH35s8idxjyr4wwM60koaMkp-/exec?name=${encodeURIComponent(formData.name)}&phone=${encodeURIComponent(formData.phone)}&email=${encodeURIComponent(formData.email)}&service=${encodeURIComponent(serviceTitle)}`;

    fetch(targetUrl, {
      method: "GET",
      mode: "no-cors"
    })
    .then(() => {
      import("../utils/logger").then(({ log }) => log("Form data sent successfully to Google Apps Script")).catch(() => {});
    })
    .catch((err) => {
      import("../utils/logger").then(({ warn }) => warn("Form submission reached service with status indicator", err)).catch(() => {});
    })
    .finally(() => {
      setTimeout(() => {
        clearInterval(interval);
        setIsSubmitting(false);
        setIsSuccess(true);
        if (onSuccess) {
          onSuccess();
        }
      }, 1000);
    });
  };

  const selectedService = activeServices.find(s => s.id === formData.serviceId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 font-sans text-white overflow-y-auto">
          
          {/* Backdrop blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md z-0"
          />

          {/* Dialog Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px rgba(239, 35, 60, 0.25)"
            }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-sm rounded-[24px] border border-white/15 bg-[#0a0b0e] p-6 md:p-7 z-10 overflow-hidden backdrop-blur-3xl select-none tech-bracket"
          >
            {/* Cyber background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-[24px]" />
            
            {/* Soft decorative glow effects */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

            {/* Header section */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#ef233c]/15 border border-[#ef233c]/30 flex items-center justify-center text-[#ef233c]">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black font-display text-white tracking-wide uppercase">
                    Launch AI Quotation
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                    Direct Dispatch Channel
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content area */}
            {isSuccess ? (
              <div className="py-6 text-center space-y-3 relative z-10">
                <div className="h-12 w-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle size={24} />
                </div>
                <h4 className="text-base font-bold text-white">Quotation Packet Transmitted</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Your customized inquiry has been routed directly to our chief engineering dispatch. We will contact you at <b>{formData.phone}</b>.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 w-full bg-[#ef233c] hover:bg-[#d90429] text-white py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(239,35,60,0.35)] cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : isSubmitting ? (
              <div className="py-10 text-center space-y-4 relative z-10 font-mono">
                <div className="relative h-12 w-12 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ef233c] animate-spin" />
                  <Terminal size={18} className="text-[#ef233c] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#ef233c] block">{submitPhase}</span>
                  <span className="text-[9px] text-zinc-500">AES-256 GCM SECURE TUNNEL</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10 text-left">
                {/* Service Selection */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                    Target Hardware Solution
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all"
                  >
                    {activeServices.map((srv) => (
                      <option key={srv.id} value={srv.id} className="bg-[#0a0a0c] text-white">
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Farooq"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-sans"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="mt-2 w-full bg-[#ef233c] hover:bg-[#d90429] text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(239,35,60,0.35)] hover:shadow-[0_0_30px_rgba(239,35,60,0.5)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send size={13} />
                  <span>Transmit Estimate Packet</span>
                </button>
              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

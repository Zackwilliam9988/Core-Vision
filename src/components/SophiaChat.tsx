import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  Check, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  RefreshCw,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../data";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  isServiceSelector?: boolean;
}

export const SophiaChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("None / Just Callback");
  const [comment, setComment] = useState("");
  const [step, setStep] = useState<"phone" | "name" | "email" | "service" | "comment" | "completed">("phone");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [unreadCount, setUnreadCount] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSubmittedRef = useRef(false);
  const submissionTimer = useRef<NodeJS.Timeout | null>(null);

  const latestDataRef = useRef({ name: "", email: "", phone: "", service: "None / Just Callback", comment: "" });

  useEffect(() => {
    latestDataRef.current = { name, email, phone, service: selectedService, comment };
  }, [name, email, phone, selectedService, comment]);

  useEffect(() => {
    return () => {
      if (submissionTimer.current) {
        clearTimeout(submissionTimer.current);
      }
    };
  }, []);

  const scheduleSubmission = () => {
    if (submissionTimer.current) {
      clearTimeout(submissionTimer.current);
    }
    submissionTimer.current = setTimeout(() => {
      triggerSubmission(false);
    }, 30000); // 30 seconds delay
  };

  const triggerSubmission = (isFinal: boolean = false, finalComment?: string) => {
    if (hasSubmittedRef.current && !isFinal) return;

    const currentData = latestDataRef.current;
    if (!currentData.phone && !currentData.email && !currentData.name) {
      return;
    }

    if (submissionTimer.current) {
      clearTimeout(submissionTimer.current);
      submissionTimer.current = null;
    }

    if (isFinal) {
      hasSubmittedRef.current = true;
    }

    const resolvedComment = finalComment !== undefined ? finalComment : currentData.comment;

    submitData(
      currentData.name,
      currentData.phone,
      currentData.email,
      currentData.service,
      resolvedComment,
      isFinal
    );
  };

  // Initialize with exactly one message from Sophia
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      if (messages.length === 0) {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setMessages([
            {
              id: "msg-welcome",
              sender: "bot",
              text: "Aslamoalikum this is Sophia Your AI help agent Please provide your phone number so we can reach you:"
            }
          ]);
          setStep("phone");
          setInputVal("+92");
          setIsTyping(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, messages.length]);

  // Listen to open-sophia-chat custom event
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ serviceId?: string }>;
      setIsOpen(true);
      
      const serviceId = customEvent.detail?.serviceId;
      if (serviceId) {
        const srv = SERVICES.find(s => s.id === serviceId);
        if (srv) {
          setMessages(prev => {
            const hasPreselect = prev.some(m => m.id.startsWith("bot-quote-trigger-"));
            if (hasPreselect) return prev;

            return [
              ...prev,
              {
                id: `bot-quote-trigger-${Date.now()}`,
                sender: "bot",
                text: `I see you are interested in our "${srv.title}" solution! Let's configure a custom quote for you.`
              }
            ];
          });
        }
      }
    };

    window.addEventListener("open-sophia-chat", handleOpenEvent);
    return () => window.removeEventListener("open-sophia-chat", handleOpenEvent);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[^0-9]/g, "");
    return cleaned.length >= 7;
  };

  const validateEmail = (mail: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const submitData = (
    fullName: string,
    phoneNumber: string,
    emailAddress: string,
    serviceName: string,
    userComment: string,
    isFinal: boolean
  ) => {
    const targetUrl = `https://script.google.com/macros/s/AKfycbxjjAwiSdR6uiYtZQUUSrxw86PV8QW_hgwjrGRN1xLkH35s8idxjyr4wwM60koaMkp-/exec?name=${encodeURIComponent(fullName || "Sophia Client")}&email=${encodeURIComponent(emailAddress || "Not Provided")}&phone=${encodeURIComponent(phoneNumber)}&service=${encodeURIComponent(serviceName || "General Support")}&comment=${encodeURIComponent(userComment || "No extra comment")}`;

    setIsSubmitting(true);
    fetch(targetUrl, {
      method: "GET",
      mode: "no-cors"
    })
    .then(() => {
      import("../utils/logger").then(({ log }) => log("Sophia partial data sent successfully to Google Apps Script")).catch(() => {});
    })
    .catch((err) => {
      import("../utils/logger").then(({ warn }) => warn("Sophia submission error/warning", err)).catch(() => {});
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleSendForm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputVal.trim();
    if (!val) return;

    setErrorText("");

    if (step === "phone") {
      if (!validatePhone(val)) {
        setErrorText("Please enter a valid phone number (at least 7 digits).");
        return;
      }
      setPhone(val);
      const userMsg: Message = { id: `user-phone-${Date.now()}`, sender: "user", text: val };
      setMessages(prev => [...prev, userMsg]);
      setInputVal("");
      setIsTyping(true);

      scheduleSubmission();

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `bot-name-${Date.now()}`,
            sender: "bot",
            text: "Great! May I know your full name?"
          }
        ]);
        setStep("name");
      }, 500);
      return;
    }

    if (step === "name") {
      setName(val);
      const userMsg: Message = { id: `user-name-${Date.now()}`, sender: "user", text: val };
      setMessages(prev => [...prev, userMsg]);
      setInputVal("");
      setIsTyping(true);

      scheduleSubmission();

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `bot-email-${Date.now()}`,
            sender: "bot",
            text: `Nice to meet you, ${val}! Please enter your email address for quote delivery:`
          }
        ]);
        setStep("email");
      }, 500);
      return;
    }

    if (step === "email") {
      if (!validateEmail(val)) {
        setErrorText("Please enter a valid email address (e.g. name@domain.com).");
        return;
      }
      setEmail(val);
      const userMsg: Message = { id: `user-email-${Date.now()}`, sender: "user", text: val };
      setMessages(prev => [...prev, userMsg]);
      setInputVal("");
      setIsTyping(true);

      scheduleSubmission();

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `bot-service-select-${Date.now()}`,
            sender: "bot",
            text: "Which of our security or optical services are you interested in?",
            isServiceSelector: true
          }
        ]);
        setStep("service");
      }, 500);
      return;
    }

    if (step === "comment") {
      const finalCommentText = (val.toLowerCase() === "none" || val.toLowerCase() === "skip") ? "No extra comment" : val;
      setComment(finalCommentText);
      const userMsg: Message = { id: `user-comment-${Date.now()}`, sender: "user", text: val };
      setMessages(prev => [...prev, userMsg]);
      setInputVal("");
      setIsTyping(true);

      triggerSubmission(true, finalCommentText);

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `bot-done-${Date.now()}`,
            sender: "bot",
            text: `Thank you! Your inquiry for "${selectedService}" has been received. Our team will contact you shortly at ${phone}.`
          }
        ]);
        setStep("completed");
      }, 600);
      return;
    }
  };

  const handleSelectService = (srvTitle: string) => {
    setSelectedService(srvTitle);
    const userMsg: Message = { id: `user-srv-${Date.now()}`, sender: "user", text: srvTitle };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    scheduleSubmission();

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-comment-ask-${Date.now()}`,
          sender: "bot",
          text: `You selected "${srvTitle}". Any specific requirements or cameras/meters needed? (Type details or "none"):`
        }
      ]);
      setStep("comment");
    }, 500);
  };

  const handleToggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleCloseChat = () => {
    triggerSubmission(false);
    setIsOpen(false);
  };

  const handleReset = () => {
    if (submissionTimer.current) {
      clearTimeout(submissionTimer.current);
      submissionTimer.current = null;
    }
    hasSubmittedRef.current = false;
    setName("");
    setPhone("");
    setEmail("");
    setSelectedService("None / Just Callback");
    setComment("");
    setStep("phone");
    setMessages([]);
    setInputVal("+92");
    setErrorText("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          id: "msg-welcome-re",
          sender: "bot",
          text: "Aslamoalikum this is Sophia Your AI help agent Please provide your phone number so we can reach you:"
        }
      ]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div id="sophia-chatbot-root" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="absolute bottom-18 right-0 w-[calc(100vw-32px)] sm:w-[390px] h-[72vh] sm:h-[550px] min-h-[400px] max-h-[550px] bg-[#0a0b0e] border border-white/15 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(239,35,60,0.25)] overflow-hidden flex flex-col p-[1px] bg-gradient-to-b from-[#ef233c]/30 via-[#0a0b0e] to-[#ef233c]/10 tech-bracket"
          >
            {/* Main Inner Container */}
            <div className="w-full h-full bg-[#0a0b0e] rounded-2xl flex flex-col overflow-hidden">
              
              {/* Header banner */}
              <div className="p-4 bg-gradient-to-r from-black via-[#0a0a0c] to-black border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-[#ef233c]/30 animate-ping opacity-75" />
                    <div className="relative w-10 h-10 rounded-full bg-[#ef233c]/20 border border-[#ef233c]/40 p-[1px] overflow-hidden flex items-center justify-center text-[#ef233c]">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <Bot size={18} className="text-[#ef233c] animate-pulse" />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-black shadow-sm" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-white tracking-wide">Sophia</span>
                      <span className="text-[8px] font-mono font-extrabold uppercase bg-[#ef233c]/10 text-[#ef233c] px-1.5 py-0.5 rounded border border-[#ef233c]/30 flex items-center gap-0.5 tracking-wider">
                        <Sparkles size={8} className="animate-spin" style={{ animationDuration: "3s" }} /> AI ASSISTANT
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">Core Vision Pakistan Technical Help</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    title="Reset Conversation"
                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <RefreshCw size={14} />
                  </button>
                  <button
                    onClick={handleCloseChat}
                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => {
                    const isUser = msg.sender === "user";
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30, delay: idx * 0.04 }}
                        className={`flex gap-2.5 max-w-[88%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                      >
                        {/* Avatar */}
                        <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs border transition-transform duration-300 ${
                          isUser
                            ? "bg-[#ef233c]/20 border-[#ef233c]/40 text-[#ef233c] hover:rotate-12"
                            : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:-rotate-12"
                        }`}>
                          {isUser ? <User size={13} /> : <Bot size={13} />}
                        </div>

                        {/* Content block */}
                        <div className="space-y-2 text-left">
                          <div className={`p-3 rounded-2xl text-xs leading-relaxed transition-all duration-200 ${
                            isUser
                              ? "bg-[#ef233c] text-white rounded-tr-none font-medium shadow-[0_4px_15px_rgba(239,35,60,0.35)]"
                              : "bg-[#18181b] border border-white/10 text-white rounded-tl-none shadow-md"
                          }`}>
                            {msg.text}
                          </div>

                          {/* Interactive Service Buttons */}
                          {msg.isServiceSelector && step === "service" && (
                            <div className="mt-3.5 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              {SERVICES.map((srv) => (
                                <button
                                  key={srv.id}
                                  disabled={isSubmitting}
                                  onClick={() => handleSelectService(srv.title)}
                                  className="w-full text-left bg-[#121214] hover:bg-[#ef233c]/15 border border-white/10 hover:border-[#ef233c] text-zinc-200 hover:text-white px-3.5 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer group disabled:opacity-50"
                                >
                                  <span className="truncate">{srv.title}</span>
                                  <ArrowRight size={12} className="text-zinc-500 group-hover:text-[#ef233c] group-hover:translate-x-0.5 transition-all" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Bot Typing Simulator */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5 max-w-[80%] mr-auto items-center"
                  >
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-zinc-800 border border-zinc-700 text-zinc-300">
                      <Bot size={13} />
                    </div>
                    <div className="bg-[#18181b] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Error Alert Display */}
              {errorText && (
                <div className="mx-4 mb-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-[11px] text-red-400 text-left animate-in shake duration-200">
                  <AlertCircle size={13} className="shrink-0 text-red-400" />
                  <span>{errorText}</span>
                </div>
              )}

              {/* Form Input Container */}
              <div className="p-4 border-t border-white/10 bg-black">
                {(step === "name" || step === "email" || step === "phone" || step === "comment") ? (
                  <form onSubmit={handleSendForm} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={step === "email" ? "email" : "text"}
                        required
                        placeholder={
                          step === "name"
                            ? "Type your full name + hit Enter..."
                            : step === "email"
                              ? "Type email + hit Enter..."
                              : step === "phone"
                                ? "Type phone number + hit Enter..."
                                : "Type custom request or 'none' to skip..."
                        }
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        className="w-full bg-[#121214] border border-white/10 focus:border-[#ef233c] focus:ring-1 focus:ring-[#ef233c]/40 rounded-xl pl-9 pr-3 py-3 text-base md:text-xs text-white placeholder-zinc-500 focus:outline-none transition-all font-semibold"
                      />
                      {step === "name" ? (
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={13} />
                      ) : step === "email" ? (
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={13} />
                      ) : step === "phone" ? (
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={13} />
                      ) : (
                        <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={13} />
                      )}
                    </div>
                    <button
                      type="submit"
                      className="p-3 bg-[#ef233c] hover:bg-[#d90429] active:scale-95 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(239,35,60,0.35)] border-none"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                ) : step === "service" ? (
                  <div className="text-center text-[11px] font-mono text-zinc-400 py-2.5 flex items-center justify-center gap-2 bg-[#121214] rounded-xl border border-white/10">
                    {isSubmitting ? (
                      <>
                        <Loader2 size={12} className="animate-spin text-[#ef233c]" />
                        <span className="text-[#ef233c]">Transmitting secure telemetry...</span>
                      </>
                    ) : (
                      <>
                        <Cpu size={12} className="text-[#ef233c] animate-pulse" />
                        <span>Tap a service above to customize your quote</span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <div className="text-center text-[11px] font-mono text-emerald-400 py-1.5 flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <Check size={12} className="text-emerald-400" />
                      <span>Support Transmission Completed</span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="w-full py-2.5 bg-[#ef233c]/10 hover:bg-[#ef233c]/20 border border-[#ef233c]/30 text-[#ef233c] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw size={12} />
                      <span>Start a New Session</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleOpen}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_35px_rgba(239,35,60,0.45)] transition-all duration-300 cursor-pointer group active:scale-95 ${
            isOpen 
              ? "bg-[#0a0a0c] border border-white/20 text-white hover:border-[#ef233c]" 
              : "bg-[#ef233c] border border-transparent text-white hover:bg-[#d90429] hover:scale-105"
          }`}
          aria-label="Toggle Sophia Support Assistant"
        >
          {isOpen ? (
            <X className="h-5.5 w-5.5" />
          ) : (
            <>
              {unreadCount > 0 && (
                <span className="absolute top-[-3.5px] right-[-3.5px] flex h-5.5 w-5.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow ring-2 ring-black animate-bounce">
                  {unreadCount}
                </span>
              )}
              <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform text-white" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

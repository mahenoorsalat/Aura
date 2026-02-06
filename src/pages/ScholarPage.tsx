import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import AuraCard from "@/components/AuraCard";
import {
  FileText,
  Search,
  Upload,
  MessageSquare,
  ArrowUpRight,
  Send,
  MoreHorizontal,
  Brain,
  Zap,
  Sparkles,
  Layers,
  Activity
} from "lucide-react";

import { api } from '@/services/api';

const mockDocuments = [
  { id: 1, name: "Neural_Architectures_v4.pdf", pages: 42, date: "2h ago", size: "4.2MB" },
  { id: 2, name: "Bio_Synthesis_Index.pdf", pages: 15, date: "1d ago", size: "1.8MB" },
  { id: 3, name: "Quantum_Ethics_2026.docx", pages: 8, date: "3d ago", size: "0.9MB" },
];

export default function ScholarPage() {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchHistory = async () => {
    try {
      const data = await api.getScholarHistory();
      setConversation(data);
    } catch (e) {
      console.error("Failed to fetch history", e);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg = {
      role: "user",
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation(prev => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    try {
      await api.sendScholarQuery(query);
      // Wait a bit for the backend to "process" and then refresh history
      setTimeout(fetchHistory, 1200);
      setIsTyping(false);
    } catch (e) {
      setIsTyping(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-16">
        {/* Scholar Header */}
        <header className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="status-dot bg-primary" />
            <span className="section-label mb-0">SCHOLAR_1 NODE OPERATIONAL</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-primary leading-none mb-4">Research Lab.</h1>
              <p className="text-xl text-muted-foreground font-medium max-w-xl">Deep processing of academic data via the Nexos Core.</p>
            </div>
            <div className="flex items-center gap-4 bg-white p-2 rounded-3xl border border-black/5 shadow-sm">
              <div className="px-6 py-2 border-r border-black/5">
                <span className="section-label mb-1">Index capacity</span>
                <p className="text-2xl font-black tracking-tighter leading-none">84.2%</p>
              </div>
              <div className="px-6 py-2">
                <span className="section-label mb-1">Processing</span>
                <Activity className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Knowledge Rail */}
          <div className="lg:col-span-4 space-y-8">
            <AuraCard span="full" className="p-12 border-dashed border-2 bg-slate-50/50 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:bg-white transition-all shadow-none hover:shadow-2xl">
              <div className="w-16 h-16 rounded-3xl bg-primary text-white shadow-xl shadow-black/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Upload className="w-7 h-7" />
              </div>
              <div className="text-center">
                <p className="text-lg font-black tracking-tight">Ingest Dataset</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">PDF, DOCX, MD UP TO 50MB</p>
              </div>
            </AuraCard>

            <div className="space-y-4">
              <span className="section-label px-2">Active Knowledge Base</span>
              <div className="space-y-3">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-5 p-5 rounded-[1.8rem] bg-white border border-black/[0.03] hover:border-black/10 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-black/5 group-hover:bg-primary group-hover:text-white transition-all">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black truncate leading-tight mb-1">{doc.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40">{doc.pages} PAGES</span>
                        <div className="w-1 h-1 rounded-full bg-black/5" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40">{doc.date}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            <AuraCard span="full" className="p-8 bg-primary text-white border-none shadow-2xl relative overflow-hidden group">
              <Zap className="w-8 h-8 text-secondary mb-6" />
              <p className="text-sm font-black leading-relaxed relative z-10">Cross-reference with <span className="text-secondary underline decoration-2 underline-offset-4">"Bio_Synthesis"</span> suggested for higher synergy.</p>
              <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-white/5 blur-3xl rounded-full" />
            </AuraCard>
          </div>

          {/* Main Terminal interface */}
          <div className="lg:col-span-8">
            <AuraCard span="full" className="h-[500px] lg:h-[800px] flex flex-col p-0 border-none shadow-2xl overflow-hidden bg-white">
              {/* Terminal Tabs */}
              <div className="p-8 border-b border-black/[0.03] bg-white flex justify-between items-center relative z-10 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-black/5">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest">Synthesis Thread</h3>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
                    <Layers className="w-4 h-4" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest">Knowledge Graph</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="status-dot bg-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">LATENCY: 12MS</span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground ml-2" />
                </div>
              </div>

              {/* Streamed Conversation */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-12 space-y-16 scrollbar-hide bg-[#fdfbf6]/40 relative"
              >
                <AnimatePresence mode="popLayout">
                  {conversation.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={msg.role === 'user'
                        ? "max-w-[70%] bg-primary text-white p-8 rounded-[2rem] rounded-tr-sm shadow-2xl shadow-black/20"
                        : "max-w-[85%] space-y-6"}>

                        {msg.role === 'assistant' && (
                          <div className="flex items-center gap-3 text-primary">
                            <div className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm">
                              <Sparkles className="w-4 h-4 text-secondary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Resilience AI Insight</span>
                            <span className="text-[10px] font-black opacity-20 ml-auto">{msg.time}</span>
                          </div>
                        )}

                        {msg.role === 'user' && (
                          <div className="flex justify-between items-center mb-4 opacity-40">
                            <span className="text-[10px] font-black uppercase tracking-widest">User Query</span>
                            <span className="text-[10px] font-black">{msg.time}</span>
                          </div>
                        )}

                        <p className={`text-base font-bold leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-primary'}`}>{msg.content}</p>

                        {msg.role === 'assistant' && (
                          <div className="pt-6 border-t border-black/[0.05] flex gap-3">
                            <button className="px-4 py-2 bg-white rounded-xl border border-black/5 text-[9px] font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-all">Extract Citation</button>
                            <button className="px-4 py-2 bg-white rounded-xl border border-black/5 text-[9px] font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-all">Map Synergy</button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-primary/40 font-black text-[10px] uppercase tracking-widest"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary/10 animate-pulse" />
                      Synthesizing dataset...
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty state hint */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                  <Brain className="w-96 h-96 text-primary" />
                </div>
              </div>

              {/* Command input */}
              <div className="p-10 bg-white border-t border-black/[0.03] relative z-10 shadow-[0_-10px_50px_rgba(0,0,0,0.02)]">
                <div className="relative flex items-center bg-slate-50 border border-black/[0.05] rounded-[2rem] p-3 focus-within:bg-white focus-within:border-black/10 focus-within:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-black/5 ml-1 shrink-0">
                    <Search className="w-5 h-5 text-muted-foreground/40" />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Aura to synthesize research threads..."
                    className="flex-1 bg-transparent border-none outline-none py-4 px-6 text-base font-black placeholder:text-muted-foreground/20"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-primary text-white p-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </AuraCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import AuraCard from "@/components/AuraCard";
import {
  Users,
  MessageCircle,
  Heart,
  Search,
  Filter,
  ArrowUpRight,
  UserCheck,
  Zap,
  Star,
  Sparkles,
  Command
} from "lucide-react";
import { toast } from "sonner";

import { api } from '@/services/api';

const identityTags = ["First-gen", "Neurodivergent", "STEM", "Arts", "International", "Working Student", "Grad School", "Transfer"];


export default function VillagePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [peers, setPeers] = useState<any[]>([]);

  const fetchPeers = async () => {
    try {
      const data = await api.getPeers();
      setPeers(data);
    } catch (e) {
      console.error("Failed to fetch peers", e);
    }
  };

  useEffect(() => {
    fetchPeers();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <AppLayout>
      <div className="space-y-16 lg:space-y-24">
        {/* Village Header */}
        <header className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="status-dot bg-emerald-500" />
            <span className="section-label mb-0">SYNERGY PROTOCOL ACTIVE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-primary leading-none mb-4">The Village.</h1>
              <p className="text-xl text-muted-foreground font-medium max-w-xl">Curated peer matching for high-impact academic collaboration.</p>
            </div>
            <div className="flex -space-x-3 mb-2">
              {[1, 2, 3, 4, 5, 6].map(x => (
                <div key={x} className="w-12 h-12 rounded-2xl border-2 border-background bg-slate-100 overflow-hidden shadow-lg grayscale hover:grayscale-0 transition-all cursor-pointer">
                  <img src={`https://i.pravatar.cc/50?u=${x + 10}`} alt="Active" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-2xl border-2 border-background bg-primary flex items-center justify-center text-[10px] text-white font-black shadow-lg">942+</div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Identity Filtering sidebar */}
          <div className="lg:col-span-3 space-y-12">
            <div className="space-y-6">
              <span className="section-label px-2">Identities & Tags</span>
              <div className="flex flex-col gap-2">
                {identityTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`flex items-center justify-between px-6 py-4 rounded-[1.2rem] text-xs font-black transition-all border ${selectedTags.includes(tag)
                      ? "bg-primary text-white border-primary shadow-xl shadow-black/20 translate-x-3"
                      : "bg-white border-black/[0.03] text-primary hover:bg-slate-50 hover:border-black/10"
                      }`}
                  >
                    {tag}
                    {selectedTags.includes(tag) && <Zap className="w-3 h-3 text-secondary fill-secondary" />}
                  </button>
                ))}
              </div>
            </div>

            <AuraCard span="full" className="p-8 bg-[#fdfbf6] border border-black/[0.03] shadow-none">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Premium Synergy</span>
              </div>
              <p className="text-xs font-bold leading-relaxed text-muted-foreground">Matches are calculated based on academic latency, project history, and identity alignment weights.</p>
            </AuraCard>
          </div>

          {/* Peer Discovery main list */}
          <div className="lg:col-span-9 space-y-12">
            {/* High-fidelity Search */}
            <div className="bg-white border border-black/[0.03] p-3 rounded-[2rem] flex items-center gap-4 shadow-xl shadow-black/[0.02]">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl ml-1 flex items-center justify-center border border-black/5">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search the village for peers, skills, or shared academic goals..."
                className="bg-transparent border-none outline-none text-base font-black flex-1 text-primary placeholder:text-muted-foreground/20 px-4"
              />
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-black/5 px-4 py-2 rounded-xl mr-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                <Command className="w-3 h-3" />
                <span>S</span>
              </div>
              <button className="px-6 md:px-10 py-3 md:py-4 bg-primary text-white rounded-[1.4rem] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all mr-1">Search</button>
            </div>

            {/* Diversity Grid */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <AnimatePresence mode="popLayout">
                {peers.map((peer) => (
                  <motion.div
                    key={peer.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <AuraCard span="full" className="p-0 border-none shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-700">
                      <div className="relative h-72">
                        <img
                          src={peer.img}
                          alt={peer.name}
                          className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                        />
                        <div className="absolute top-6 left-6 flex gap-2">
                          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-white" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{peer.match}% Synergy</span>
                          </div>
                          {peer.online && (
                            <div className="bg-emerald-500/80 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-400/20 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              <span className="text-[10px] font-black text-white uppercase tracking-widest">Online</span>
                            </div>
                          )}
                        </div>
                        <div className="absolute bottom-6 right-6">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-black/5 shadow-xl">
                            <p className="text-xs font-black">{peer.projects}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-10 space-y-8">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-3xl font-black text-primary leading-none">{peer.name}</h3>
                            <UserCheck className="w-5 h-5 text-emerald-500" />
                          </div>
                          <p className="text-base text-muted-foreground font-medium leading-relaxed">{peer.bio}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {peer.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 px-4 py-2 rounded-xl border border-black/5">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4 pt-8 border-t border-black/[0.03]">
                          <button
                            onClick={() => toast.success(`Synergy request sent to ${peer.name}!`)}
                            className="flex-1 bg-primary text-white py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                          >
                            <MessageCircle className="w-5 h-5 transition-transform group-hover/btn:rotate-12" />
                            Synergize
                          </button>
                          <button
                            onClick={() => toast.info(`${peer.name} added to your Favorites.`)}
                            className="w-16 h-16 bg-white border border-black/[0.05] rounded-[1.5rem] text-slate-300 hover:text-red-500 hover:border-red-500/20 flex items-center justify-center transition-all group/heart"
                          >
                            <Heart className="w-6 h-6 transition-all group-hover/heart:fill-red-500" />
                          </button>
                        </div>
                      </div>
                    </AuraCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show more / empty hint */}
            <div className="pt-24 pb-12 flex flex-col items-center gap-6 text-center opacity-30">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center animate-bounce">
                <span className="text-lg font-black italic">!</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">End of the curated village directory</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
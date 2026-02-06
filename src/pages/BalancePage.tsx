import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import AuraCard from "@/components/AuraCard";
import {
  Moon,
  Footprints,
  Droplets,
  Plus,
  Check,
  Zap,
  Activity,
  Play,
  RotateCcw,
  Trophy,
  Wind,
  Shield,
  Sparkles
} from "lucide-react";

const wellnessTasks = [
  { id: 1, name: "60-min electronic curfew", icon: Moon, completed: true, streak: 5 },
  { id: 2, name: "Digital fast duration (4h)", icon: Activity, completed: true, streak: 3 },
  { id: 3, name: "Mindful walk / Grounding", icon: Footprints, completed: false, streak: 12 },
  { id: 4, name: "Hydrate (H2O Synergy)", icon: Droplets, completed: false, streak: 7 },
];

import { api } from '@/services/api';

export default function BalancePage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Inhale");

  const fetchWellness = async () => {
    try {
      const data = await api.getWellness();
      setTasks(data);
    } catch (e) {
      console.error("Failed to fetch wellness", e);
    }
  };

  useEffect(() => {
    fetchWellness();
  }, []);

  const toggleTask = async (id: number) => {
    try {
      await api.toggleWellness(id);
      fetchWellness();
    } catch (e) {
      console.error("Failed to toggle wellness", e);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathPhase((prev) => (prev === "Inhale" ? "Exhale" : "Inhale"));
      }, 4000);
    } else {
      setBreathPhase("Inhale");
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <AppLayout>
      <div className="space-y-16 lg:space-y-24">
        {/* Balance Header */}
        <header className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="status-dot bg-primary shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
            <span className="section-label mb-0">RESILIENCE ARCHITECTURE ACTIVE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-primary leading-none mb-4">Resilience.</h1>
              <p className="text-xl text-muted-foreground font-medium max-w-xl">Systemic homeostasis and cognitive reset via atmospheric synchronization.</p>
            </div>

            <div className="flex items-center gap-6 bg-white p-4 rounded-[1.8rem] border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 px-6 border-r border-black/5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="section-label mb-0 leading-none">tier status</span>
                  <p className="text-lg font-black tracking-tight leading-none mt-1">Tier 4 Optimal</p>
                </div>
              </div>
              <div className="px-6 flex items-center gap-3">
                <Trophy className="w-5 h-5 text-secondary fill-secondary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Pre-Peak State</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Main Atmosphere Visualizer */}
          <div className="lg:col-span-8">
            <AuraCard span="full" className="h-[750px] flex flex-col items-center justify-center p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden relative bg-white">
              <div className="absolute inset-0 bg-[#fdfbf6]/40 -z-10" />

              {/* Advanced Atmospheric Geometry */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-40">
                <motion.div
                  animate={isBreathing ? {
                    scale: [1, 1.4, 1],
                    rotate: [0, 180, 360]
                  } : { rotate: 360 }}
                  transition={isBreathing ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 60, repeat: Infinity, ease: "linear" }}
                  className="w-[800px] h-[800px] border border-black/[0.03] rounded-[4rem]"
                />
                <motion.div
                  animate={isBreathing ? {
                    scale: [1.2, 1.6, 1.2],
                    rotate: [360, 180, 0]
                  } : { rotate: -360 }}
                  transition={isBreathing ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : { duration: 90, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[600px] h-[600px] border border-black/[0.05] rounded-[6rem] border-dashed"
                />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-20">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full border border-black/5 flex items-center justify-center bg-white shadow-2xl transition-all duration-1000">
                    <motion.div
                      animate={isBreathing ? {
                        scale: breathPhase === "Inhale" ? 1.5 : 0.8,
                        backgroundColor: breathPhase === "Inhale" ? "#FFCC33" : "#0a0a0a",
                        boxShadow: breathPhase === "Inhale"
                          ? "0 0 100px rgba(255,204,51,0.5)"
                          : "0 0 40px rgba(10,10,10,0.2)"
                      } : { scale: 1, backgroundColor: "#FFCC33" }}
                      transition={{ duration: 4, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  <div className="absolute -inset-12 border border-black/[0.01] rounded-full -z-10 animate-[ping_6s_linear_infinite]" />
                  <div className="absolute -inset-24 border border-black/[0.01] rounded-full -z-10 animate-[ping_8s_linear_infinite]" />
                </div>

                <div className="text-center space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={isBreathing ? breathPhase : "Ready"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-4xl font-black text-primary tracking-tighter"
                    >
                      {isBreathing ? breathPhase : "Pulse Breath"}
                    </motion.h3>
                  </AnimatePresence>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-40 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        animate={isBreathing ? { x: ["-100%", "0%", "-100%"] } : { x: "-100%" }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full bg-primary"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">Frequency: 0.1Hz Atmos-Sync</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsBreathing(!isBreathing)}
                    className={`${isBreathing ? 'bg-primary text-white' : 'bg-primary text-white'} px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.25em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center gap-6 group`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary group-hover:bg-secondary transition-colors">
                      {isBreathing ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-primary ml-1" />}
                    </div>
                    {isBreathing ? "Terminate Session" : "Initiate Reset Session"}
                  </button>
                </div>
              </div>

              {/* Environmental Dashboard */}
              <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-black/[0.03] pt-12">
                <div className="flex gap-20">
                  <div className="group cursor-default">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-3.5 h-3.5 text-muted-foreground/30" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Atmospheric pressure</p>
                    </div>
                    <p className="text-3xl font-black text-primary tracking-tighter group-hover:text-secondary transition-colors">1.02 ATM</p>
                  </div>
                  <div className="group cursor-default">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-3.5 h-3.5 text-muted-foreground/30" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Cognitive load</p>
                    </div>
                    <p className="text-3xl font-black text-primary tracking-tighter group-hover:text-emerald-500 transition-colors">12.4%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/20 mb-4 inline-flex items-center gap-3">
                    <Zap className="w-3 h-3 text-secondary fill-secondary" />
                    12 Day Synergy Streak
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/20 italic">Nexus stability verified</p>
                </div>
              </div>
            </AuraCard>
          </div>

          {/* Right Architecture Side-rail */}
          <div className="lg:col-span-4 space-y-12">
            <div className="flex items-center justify-between px-2">
              <span className="section-label mb-0 leading-none">Habit Architecture</span>
              <button className="w-12 h-12 rounded-[1.2rem] bg-white border border-black/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md group">
                <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => {
                const Icon = task.icon;
                return (
                  <motion.div
                    layout
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-6 p-6 rounded-[2rem] transition-all border cursor-pointer group shadow-sm hover:shadow-2xl hover:-translate-y-1 ${task.completed
                      ? "bg-[#fdfbf6] border-black/5"
                      : "bg-white border-transparent"
                      }`}
                  >
                    <div className={`w-16 h-16 rounded-[1.4rem] flex items-center justify-center transition-all duration-700 shadow-sm ${task.completed ? "bg-secondary text-primary rotate-[360deg] shadow-lg shadow-secondary/30" : "bg-slate-50 border border-black/5 text-slate-300 group-hover:text-primary"
                      }`}>
                      {task.completed ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-lg font-black tracking-tight leading-none mb-2 ${task.completed ? "text-slate-300 line-through" : "text-primary"}`}>
                        {task.name}
                      </p>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">{task.streak} Day Synergy Streak</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <AuraCard span="full" className="p-10 border-none bg-primary rounded-[3rem] text-white overflow-hidden relative group shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Resilience protocol</span>
              </div>
              <p className="text-lg font-bold leading-relaxed relative z-10 italic">
                "Resilience is not the absence of stress, but the high-fidelity capacity of a system to maintain its core purpose."
              </p>
              <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-white/5 blur-3xl pointer-events-none rounded-full" />
            </AuraCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
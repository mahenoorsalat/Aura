import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuraCard from '@/components/AuraCard';
import { AppLayout } from "@/components/layout/AppLayout";
import {
  ArrowUpRight,
  Brain,
  Users,
  Utensils,
  Wind,
  Sparkles,
  Timer,
  CheckCircle2,
  Circle,
  TrendingUp,
  Activity,
  Calendar,
  Zap,
  Pause,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import { api } from '@/services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [userName, setUserName] = useState("Scholar");

  const [isFocusing, setIsFocusing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2700); // 45:00

  const completedCount = tasks.filter(t => t.done).length;

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);

      const userRes = await api.getMetadata("student_name");
      if (userRes.value) setUserName(userRes.value.split(' ')[0]);
    } catch (e) {
      console.error("Failed to fetch dashboard data", e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let interval: any;
    if (isFocusing && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsFocusing(false);
      toast.success("Focus Session Complete!");
    }
    return () => clearInterval(interval);
  }, [isFocusing, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTask = async (id: number) => {
    try {
      await api.toggleTask(id);
      fetchTasks();
      toast.success("Protocol status updated.");
    } catch (e) {
      toast.error("Network sync failed.");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-16 lg:space-y-24">

        {/* Dynamic Welcome Header */}
        <header className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="status-dot bg-amber-400" />
            <span className="section-label mb-0">SYMBIO_OS KERNAL ACTIVE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-12">
            <div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 max-w-4xl leading-[0.9]">
                Welcome back, <br />
                <span className="text-primary italic">{userName}.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
                Unified student resilience stack active. Monitoring <span className="text-primary font-bold">Scholar-1 AI</span> synthesis and village synergy.
              </p>
            </div>

            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(x => (
                <div key={x} className="w-16 h-16 rounded-3xl border-4 border-background bg-slate-200 overflow-hidden shadow-xl hover:scale-110 hover:z-10 transition-all cursor-pointer">
                  <img src={`https://i.pravatar.cc/100?u=${x}`} alt="Peer" />
                </div>
              ))}
              <div
                onClick={() => navigate('/village')}
                className="w-16 h-16 rounded-3xl border-4 border-background bg-primary flex items-center justify-center text-white text-xs font-black shadow-xl hover:scale-110 hover:z-10 transition-all cursor-pointer"
              >
                +12
              </div>
            </div>
          </div>

          {/* High-Fidelity Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 bg-black/[0.02] rounded-[2rem] border border-black/[0.05]">
            {[
              { label: "Scholar Sync", val: "84%", color: "bg-primary", path: "/scholar" },
              { label: "Resilience", val: "Tier 4", color: "bg-secondary", path: "/balance" },
              { label: "Village Matches", val: "128", color: "bg-primary/40", path: "/village" },
              { label: "Academic Latency", val: "2.4ms", color: "bg-emerald-500", path: "/" }
            ].map((stat, i) => (
              <div
                key={i}
                onClick={() => navigate(stat.path)}
                className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-black/5 hover:shadow-md transition-all group cursor-pointer"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-8">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-black tracking-tighter">{stat.val}</span>
                  <div className={`w-8 h-8 rounded-xl ${stat.color} group-hover:rotate-45 transition-transform`} />
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* The Bento Core */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

          {/* Main Focus Slab (Scholar AI) */}
          <div className="md:col-span-8 space-y-8">
            <AuraCard span="full" className="p-0 overflow-hidden border-none shadow-2xl relative group">
              <div className="grid lg:grid-cols-2 h-full">
                <div className="bg-primary p-12 text-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-10">
                      <Brain className="w-6 h-6 text-amber-400" />
                      <span className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Intelligence Node</span>
                    </div>
                    <h3 className="text-5xl font-black tracking-tighter mb-6 leading-none">Scholar AI Synthesis.</h3>
                    <p className="text-white/40 text-lg font-medium leading-relaxed mb-12">
                      Omni-directional processing engaged on <span className="text-white italic">"Neural Architectures v4"</span>. 8 key insights discovered in the 2h window.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/scholar')}
                    className="w-full bg-white text-black py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all flex items-center justify-center gap-4 group/btn shadow-xl shadow-black/20"
                  >
                    Access Knowledge Graph
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
                <div className="bg-slate-50 p-12 flex flex-col gap-6 relative overflow-hidden">
                  <span className="section-label">Real-time Stream</span>
                  <div className="space-y-3">
                    {["Processing weights...", "Mapping citations...", "Generating abstract...", "Optimizing context..."].map((line, i) => (
                      <div key={i} className="flex items-center gap-4 text-xs font-black text-primary/40 font-mono">
                        <span className="opacity-20">{">"}</span>
                        <span>{line}</span>
                        <div className="flex-1 border-b border-black/[0.05] border-dashed" />
                        <span className="text-[10px] text-amber-500">{(i + 1) * 12}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-8 border-t border-black/[0.05] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-black">AI STABILITY: 99.4%</span>
                    </div>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  {/* Abstract background shape */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />
                </div>
              </div>
            </AuraCard>

            {/* Quick Utility Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AuraCard
                onClick={() => navigate('/village')}
                span="full" className="p-8 hover:bg-slate-50/50 cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-black/5 flex items-center justify-center text-primary">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="section-label mb-0">Village Status</span>
                </div>
                <h4 className="text-2xl font-black mb-2">12 New Matches</h4>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Synergy with Top Picks: 98%</p>
                <div className="mt-8 flex justify-between items-center border-t border-black/5 pt-6 group/link">
                  <span className="text-[10px] font-black uppercase tracking-widest">Open Directory</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform opacity-20 group-hover:opacity-100" />
                </div>
              </AuraCard>

              <AuraCard
                onClick={() => navigate('/nourish')}
                span="full" className="p-8 hover:bg-slate-50/50 cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-600">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <span className="section-label mb-0">Nourish Audit</span>
                </div>
                <h4 className="text-2xl font-black mb-2">$34.20 Left</h4>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Healthy Margin +5.2%</p>
                <div className="mt-8 flex justify-between items-center border-t border-black/5 pt-6 group/link">
                  <span className="text-[10px] font-black uppercase tracking-widest">Audit Analytics</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform opacity-20 group-hover:opacity-100" />
                </div>
              </AuraCard>

              <AuraCard
                onClick={() => navigate('/balance')}
                span="full" className="p-8 hover:bg-slate-50/50 col-span-1 lg:col-span-1 border-secondary/20 bg-secondary/[0.02] cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                    <Wind className="w-6 h-6" />
                  </div>
                  <span className="section-label mb-0">Balance Tier</span>
                </div>
                <h4 className="text-2xl font-black mb-2">12 Day Streak</h4>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Peak Resilience tier</p>
                <div className="mt-8 flex justify-between items-center border-t border-black/5 pt-6 group/link">
                  <span className="text-[10px] font-black uppercase tracking-widest">Review Resilience</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform opacity-20 group-hover:opacity-100" />
                </div>
              </AuraCard>
            </div>
          </div>

          {/* Right Rail Polished Sidebar */}
          <div className="md:col-span-4 space-y-8">
            <AuraCard span="full" className="p-10 flex flex-col justify-between h-[500px] border-none shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <span className="section-label mb-0 leading-none">Concentration Engine</span>
                  <button
                    onClick={() => setTimeLeft(2700)}
                    className="w-8 h-8 rounded-xl bg-slate-50 border border-black/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-5xl font-black tracking-tighter mb-2">Deep Flow.</h2>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Focus Level: {isFocusing ? 'Active' : 'Standby'}</p>
              </div>

              <div className="relative z-10 flex flex-col items-center py-8">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="80" className="stroke-slate-100 fill-none stroke-[16]" />
                    <motion.circle
                      cx="96" cy="96" r="80"
                      initial={{ strokeDashoffset: 502 }}
                      animate={{ strokeDashoffset: 502 - (502 * (1 - timeLeft / 2700)) }}
                      transition={{ duration: 1, ease: "linear" }}
                      className="stroke-primary fill-none stroke-[16]"
                      strokeDasharray="502"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black tracking-tighter">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <button
                  onClick={() => setIsFocusing(!isFocusing)}
                  className="w-full bg-primary text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                >
                  {isFocusing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                  {isFocusing ? 'Pause Session' : 'Initialize Pomodoro'}
                </button>
              </div>
              {/* Background atmosphere */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/[0.05] rounded-full blur-3xl pointer-events-none group-hover:bg-secondary/10 transition-colors" />
            </AuraCard>

            <AuraCard span="full" className="p-0 overflow-hidden shadow-lg">
              <div className="p-8 border-b border-black/[0.03] flex items-center justify-between">
                <span className="section-label mb-0">Daily Synergy Protocols</span>
                <div className="px-3 py-1 bg-slate-50 rounded-full border border-black/5 font-black text-[10px]">{completedCount} / {tasks.length}</div>
              </div>
              <div className="divide-y divide-black/[0.03]">
                {tasks.map((t, i) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className="group p-6 flex items-center gap-6 hover:bg-slate-50/50 transition-all cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${t.done ? 'bg-secondary text-primary shadow-lg shadow-secondary/20' : 'bg-slate-50 border border-black/5 text-slate-200'}`}>
                      {t.done ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </div>
                    <span className={`flex-1 text-sm font-black transition-all ${t.done ? 'text-muted-foreground/40 line-through' : 'text-primary'}`}>{t.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </AuraCard>
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import AuraCard from "@/components/AuraCard";
import {
  Utensils,
  TrendingUp,
  Activity,
  Calendar,
  Sparkles,
  ArrowRight,
  Zap,
  DollarSign,
  ShoppingCart,
  Layers,
  CheckCircle2,
  Clock
} from "lucide-react";
import { api } from '@/services/api';

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function NourishPage() {
  const [budget, setBudget] = useState(45);
  const [selectedDay, setSelectedDay] = useState("Mon");

  const fetchBudget = async () => {
    try {
      const data = await api.getMetadata('nourish_budget');
      if (data.value) setBudget(Number(data.value));
    } catch (e) {
      console.error("Failed to fetch budget", e);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  const handleBudgetChange = async (val: number) => {
    setBudget(val);
    try {
      await api.updateMetadata('nourish_budget', val);
    } catch (e) {
      console.error("Failed to update budget", e);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-16 lg:space-y-24">
        {/* Nourish Header */}
        <header className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="status-dot bg-amber-400" />
            <span className="section-label mb-0">METABOLIC BUDGET ANALYTICS</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-primary leading-none mb-4">Research Lab.</h1>
              <p className="text-xl text-muted-foreground font-medium max-w-xl">Optimizing nutritional intake and budgetary thresholds via the nexus.</p>
            </div>

            <div className="flex items-center gap-6 bg-white p-4 rounded-[1.8rem] border border-black/5 shadow-sm">
              <div className="flex items-center gap-4 px-6 border-r border-black/5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <span className="section-label mb-0 leading-none">Grocery list</span>
                  <p className="text-lg font-black tracking-tight leading-none mt-1">12 Items</p>
                </div>
              </div>
              <div className="px-6 flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Efficient</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Financials & Inventory Rail */}
          <div className="lg:col-span-4 space-y-12">
            <AuraCard span="full" className="p-6 md:p-12 border-none shadow-2xl relative group overflow-hidden">
              <div className="flex items-center justify-between mb-16">
                <span className="section-label mb-0">Financial Statement</span>
                <button className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl border border-black/5 group-hover:bg-primary group-hover:text-white transition-all">
                  <Layers className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-12 relative z-10">
                <div>
                  <p className="section-label mb-4 opacity-40">Dynamic Weekly Threshold</p>
                  <div className="flex items-baseline justify-between mb-10 overflow-hidden">
                    <span className="text-5xl md:text-7xl font-black tracking-tighter text-primary">${budget}</span>
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Optimal
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="overflow-hidden h-3 mb-10 text-xs flex rounded-full bg-slate-100 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "72%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      />
                      {/* Marker */}
                      <div className="absolute left-[72%] top-0 bottom-0 w-1 bg-amber-400 ring-4 ring-white" title="Safe Limit" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 border border-black/5 p-4 rounded-2xl">
                    <DollarSign className="w-4 h-4 text-muted-foreground/30" />
                    <input
                      type="range"
                      min="20" max="100"
                      value={budget}
                      onChange={(e) => handleBudgetChange(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-12 xl:col-span-4 space-y-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                  <span className="section-label mb-0">Quick Inventory</span>
                </div>
                <div className="space-y-3">
                  {["Oatmeal (Sync)", "Almond Milk", "Blueberries"].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white border border-black/[0.03] rounded-2xl">
                      <span className="text-xs font-black uppercase tracking-widest">{item}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Background abstract decoration */}
              <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-slate-50 rounded-full blur-[100px] pointer-events-none" />
            </AuraCard>

            <div className="space-y-6">
              <span className="section-label px-2">Inventory Sync Dashboard</span>
              <div className="space-y-4">
                {[
                  { item: "Bulk Protein (Lentils)", balance: "$8.50", status: "High", color: "bg-primary" },
                  { item: "Vitamin Intake (Veggies)", balance: "$3.00", status: "Critical", color: "bg-amber-400" },
                  { item: "Hydration Status", balance: "$0.00", status: "Optimal", color: "bg-emerald-500" }
                ].map((x, i) => (
                  <div key={i} className="flex justify-between items-center p-6 rounded-[1.8rem] bg-white border border-black/[0.03] hover:border-black/10 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="flex items-center gap-5">
                      <div className={`w-3 h-3 rounded-full ${x.color} group-hover:scale-125 transition-transform`} />
                      <div>
                        <p className="text-sm font-black text-primary leading-tight mb-1">{x.item}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none opacity-40">{x.status}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-primary/40 group-hover:text-primary transition-colors underline underline-offset-4 decoration-black/10">{x.balance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Synthesis Scheduler Main Area */}
          <div className="lg:col-span-8">
            <AuraCard span="full" className="h-auto lg:h-[800px] flex flex-col p-0 border-none shadow-2xl overflow-hidden bg-white">
              <div className="p-6 md:p-12 border-b border-black/[0.03] bg-slate-50/50">
                <span className="section-label mb-8 block">Projected Identity Alignment</span>
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full border-8 border-primary border-t-amber-400 flex items-center justify-center shrink-0">
                    <span className="text-xl font-black text-primary">94%</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary leading-tight mb-2">High resonance detected.</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed text-balance">Identity weights are shifting towards "Executive Stability" based on meal consistency.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-10 border-b border-black/[0.03] bg-white flex flex-col sm:flex-row justify-between items-center gap-8 relative z-10 shadow-sm">
                <div className="flex items-center gap-5 overflow-x-auto w-full sm:w-auto">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-black/5 flex items-center justify-center shadow-sm">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-1">Synthesis Planner</h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">System Synced: 14m AGO</p>
                  </div>
                </div>
                <button className="w-full sm:w-auto text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-secondary px-10 py-5 rounded-full flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-secondary/20 group">
                  <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Optimize Plan
                </button>
              </div>

              <div className="flex-1 bg-[#fdfbf6]/40 p-6 md:p-10 lg:p-16">
                <div className="flex gap-3 mb-16 overflow-x-auto scrollbar-hide pb-4">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`flex-1 min-w-[80px] py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${selectedDay === day ? "bg-primary text-white border-primary shadow-2xl shadow-black/20 translate-y-[-4px]" : "bg-white text-muted-foreground border-black/5 hover:bg-white hover:border-black/10 hover:shadow-lg"
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {["08:00 AM", "01:00 PM", "07:00 PM"].map((time, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8 }}
                      className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-black/[0.03] shadow-lg hover:shadow-2xl transition-all cursor-pointer space-y-8 md:space-y-12 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-8">
                          <span className="section-label mb-0">{time}</span>
                          <Clock className="w-4 h-4 text-muted-foreground/20" />
                        </div>
                        <h4 className="text-2xl font-black text-primary group-hover:text-primary/70 transition-colors leading-tight">Metabolic <br />Sync Bowl</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-4 opacity-40">High Protein Synthesis</p>
                      </div>
                      <div className="flex justify-between items-end border-t border-black/[0.03] pt-8">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-black text-primary underline decoration-amber-400 underline-offset-8 decoration-2">$1.20 COST</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Consensus Block */}
                <div className="p-12 bg-primary rounded-[3rem] text-white flex flex-col lg:flex-row justify-between lg:items-center gap-10 relative overflow-hidden group shadow-2xl shadow-black/30">
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-secondary flex items-center justify-center shadow-2xl shrink-0">
                      <Zap className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">Daily Efficiency Protocol</p>
                      <p className="text-3xl md:text-5xl font-black tracking-tighter leading-none">${(3.60).toFixed(2)} TOTAL COST</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span className="text-[11px] font-black uppercase tracking-widest">3.2k Calories Synthesized</span>
                    </div>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 mr-2 leading-none mt-2 italic">Nexus verified nutrition stack</p>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] pointer-events-none rounded-full" />
                </div>
              </div>
            </AuraCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
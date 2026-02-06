import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  HelpCircle,
  ChevronRight,
  Save,
} from "lucide-react";
import { api } from "@/services/api";
import { toast } from "sonner";

export default function SettingsPage() {
  const [name, setName] = useState("Active Scholar");
  const [major, setMajor] = useState("Unspecified Cluster");
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    try {
      const nameData = await api.getMetadata("student_name");
      const majorData = await api.getMetadata("student_major");
      if (nameData.value) setName(nameData.value);
      if (majorData.value) setMajor(majorData.value);
    } catch (e) {
      console.error("Failed to fetch settings", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.updateMetadata("student_name", name);
      await api.updateMetadata("student_major", major);
      toast.success("Identity vectors updated.");
    } catch (e) {
      toast.error("Network sync conflict.");
    } finally {
      setIsSaving(false);
    }
  };

  const settingSections = [
    {
      title: "Account Architecture",
      items: [
        {
          icon: User,
          label: "Identity Vector",
          component: (
            <div className="space-y-4 p-6 bg-slate-50/50 rounded-2xl border border-black/[0.03]">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Display Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 ring-primary/5 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Academic Cluster</label>
                <input
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 ring-primary/5 transition-all"
                />
              </div>
            </div>
          )
        },
        { icon: Bell, label: "System Sync", description: "Customize module notifications" },
      ],
    },
    {
      title: "Project Interface",
      items: [
        { icon: Palette, label: "Appearance", description: "Adjust theme and display density" },
        { icon: Shield, label: "Nexus Privacy", description: "Manage your data anonymization" },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-12 pb-24">
        {/* Header */}
        <header className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Configuration Engine</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-primary">Settings.</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" /> : <Save className="w-4 h-4" />}
            Sync Identity
          </button>
        </header>

        {/* Settings blocks */}
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-2">
                {section.title}
              </h3>
              <div className="aura-slab divide-y divide-black/5 overflow-hidden">
                {section.items.map((item: any, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="group">
                      <button
                        className="w-full flex items-center gap-6 p-6 hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-primary">{item.label}</p>
                          {item.description && (
                            <p className="text-[11px] font-bold text-muted-foreground uppercase opacity-60">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all" />
                      </button>
                      {item.component && (
                        <div className="px-6 pb-6">
                          {item.component}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* System Info Footnote */}
        <div className="pt-12 border-t border-black/5 flex justify-between items-center text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-[10px] text-white font-black">A</div>
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Aura v2.4.0 <span className="opacity-30">Stable Release</span></span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-tighter">Designed for student resilience</p>
        </div>
      </div>
    </AppLayout>
  );
}
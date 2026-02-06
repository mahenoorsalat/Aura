import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Settings,
  Bell,
  Zap,
  Command,
  HelpCircle,
  Inbox,
  Sparkles,
  Search,
  Brain,
  Users,
  Utensils,
  Wind
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const navItems = [
  { label: "Overview", path: "/", icon: Zap },
  { label: "Scholar", path: "/scholar", icon: Brain },
  { label: "Village", path: "/village", icon: Users },
  { label: "Nourish", path: "/nourish", icon: Utensils },
  { label: "Balance", path: "/balance", icon: Wind },
];

const mockNotifications = [
  { id: 1, title: "Scholar Sync Complete", desc: "Neural Architectures v4 has been synthesized.", time: "2m ago", unread: true },
  { id: 2, title: "New Village Match", desc: "Alex Chen is looking for a STEM collaborator.", time: "1h ago", unread: true },
  { id: 3, title: "Resilience Reminder", desc: "Time for your scheduled digital fast.", time: "3h ago", unread: false },
];

import { api } from "@/services/api";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ name: "Active Scholar", major: "Tier 4 Sync" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const nameData = await api.getMetadata("student_name");
        const majorData = await api.getMetadata("student_major");
        setUser({
          name: nameData.value || "Active Scholar",
          major: majorData.value || "Tier 4 Sync"
        });
      } catch (e) {
        console.error("Failed to fetch sidebar user", e);
      }
    };
    fetchUser();
    // Refresh when location changes (in case settings were updated)
  }, [location.pathname]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-4 max-w-[1440px] mx-auto w-full">
      {/* Brand area */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 border border-black/5 rounded-2xl flex items-center justify-center bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
          <Zap className="w-5 h-5 text-primary fill-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tighter leading-none">Aura</span>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 leading-none mt-1">v2.4 Final</span>
        </div>
      </Link>

      {/* Navigation Pills */}
      <div className="hidden lg:flex nav-header shadow-md group">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-pill",
                isActive && "nav-pill-active"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="hidden sm:flex items-center gap-3 bg-black/[0.03] border border-black/5 rounded-2xl px-4 py-2 hover:bg-black/[0.05] transition-all cursor-pointer mr-4"
        >
          <Command className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">K · Search</span>
        </button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList className="aura-slab border-none p-2">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {navItems.map((item) => (
                <CommandItem
                  key={item.path}
                  onSelect={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50"
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-bold">{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem
                onSelect={() => {
                  navigate("/settings");
                  setOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-slate-50"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-bold">Preferences</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <div className="flex items-center gap-1 group">
          <button className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-black/5 transition-all text-muted-foreground/60 hover:text-primary">
            <HelpCircle className="w-5 h-5" />
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-black/5 transition-all text-muted-foreground/60 hover:text-primary relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-amber-400 rounded-full ring-2 ring-white" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 mr-4 mt-2 aura-slab overflow-hidden border-none shadow-2xl">
              <div className="p-6 border-b border-black/[0.03] bg-white flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">System Notifications</span>
                <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">2 New</span>
              </div>
              <div className="divide-y divide-black/[0.03]">
                {mockNotifications.map(n => (
                  <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex gap-4">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", n.unread ? "bg-amber-100 text-amber-600" : "bg-slate-50 text-slate-300")}>
                        {n.unread ? <Sparkles className="w-4 h-4" /> : <Inbox className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className={cn("text-xs font-black", n.unread ? "text-primary" : "text-muted-foreground")}>{n.title}</p>
                        <p className="text-[10px] font-medium text-muted-foreground leading-relaxed mt-1">{n.desc}</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/30 mt-2">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 text-center">
                <button className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline">View All Notifications</button>
              </div>
            </PopoverContent>
          </Popover>

          <Link to="/settings" className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-black/5 transition-all text-muted-foreground/60 hover:text-primary">
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        <div className="w-[1px] h-6 bg-black/5 mx-2" />

        <div className="flex items-center gap-3 bg-white border border-black/5 rounded-2xl p-1.5 pr-4 pl-2 shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-black/5 group-hover:ring-2 ring-primary/10 transition-all">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=000&color=fff`} alt="User" />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-tight">{user.name}</span>
            <span className="text-[8px] font-bold text-muted-foreground uppercase leading-none">{user.major}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
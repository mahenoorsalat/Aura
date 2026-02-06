import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MoveLeft, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Nexus could not resolve path:", location.pathname);
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-12">
        <div className="relative">
          <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border border-black/5 flex items-center justify-center shadow-xl mb-8 mx-auto group">
            <HelpCircle className="w-12 h-12 text-primary group-hover:rotate-12 transition-transform" />
          </div>
          <div className="absolute -top-4 -right-4 bg-amber-400 text-primary text-[10px] font-black px-3 py-1 rounded-full shadow-lg">PATH_ERR</div>
        </div>

        <div className="space-y-4">
          <h1 className="text-8xl font-black tracking-tighter text-primary">404.</h1>
          <p className="text-xl text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
            Nexus was unable to synthesize the requested coordinate: <span className="text-primary font-bold italic underline decoration-amber-400 underline-offset-4">{location.pathname}</span>
          </p>
        </div>

        <Link
          to="/"
          className="bg-primary text-white pl-8 pr-12 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center gap-4 group"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary group-hover:bg-amber-400 transition-colors">
            <MoveLeft className="w-4 h-4" />
          </div>
          Return to Command Center
        </Link>

        <div className="pt-24 opacity-10">
          <p className="text-[10px] font-black uppercase tracking-[1em]">SYSTEM FAILURE</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;

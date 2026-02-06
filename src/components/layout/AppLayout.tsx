import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f9f7f0] flex flex-col">
      {/* Sticky Main Header */}
      <div className="sticky top-0 z-50 w-full glass-blur border-b border-black/[0.02]">
        <Sidebar />
      </div>

      <main className="flex-1 max-w-[1440px] mx-auto w-full p-4 md:p-8 lg:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-black/[0.05] py-12 bg-white/30 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-primary" />
              <span className="font-black text-xs uppercase tracking-widest">Aura OS</span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-loose">
              Unified Resilience System for the <br />Modern Scholastic Environment.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap">Privacy Stack</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap">Neural Documentation</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap">System Status</a>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">© 2026 NEXOS.AI FOUNDATION</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
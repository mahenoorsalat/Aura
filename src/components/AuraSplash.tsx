import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export function AuraSplash({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 800),
            setTimeout(() => setStep(2), 1600),
            setTimeout(() => setStep(3), 2400),
            setTimeout(() => onComplete(), 3200),
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    const steps = [
        "Initializing Nexus Core...",
        "Syncing Neural Vectors...",
        "System Operational."
    ];

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 border border-black/5 rounded-[2.5rem] flex items-center justify-center bg-white shadow-2xl ring-1 ring-black/5 mb-12 overflow-hidden p-4"
            >
                <img src="/logo.svg" alt="Aura Logo" className="w-full h-full object-contain animate-pulse" />
            </motion.div>

            <div className="h-4 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={step}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40"
                    >
                        {steps[step] || "Finalizing..."}
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/30">Aura 5.0 Kernel Active</span>
            </div>
        </motion.div>
    );
}

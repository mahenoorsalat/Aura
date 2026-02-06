 import { motion } from "framer-motion";
 import { Plus, Mic, Camera, Pencil } from "lucide-react";
 
 const actions = [
   { icon: Pencil, label: "Quick Note", color: "scholar" },
   { icon: Mic, label: "Voice Memo", color: "village" },
   { icon: Camera, label: "Scan Doc", color: "nourish" },
   { icon: Plus, label: "New Task", color: "balance" },
 ];
 
 export function QuickActions() {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.7 }}
       className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 md:left-auto md:right-8 md:translate-x-0"
     >
       <div className="glass-card p-2 flex items-center gap-2">
         {actions.map((action, i) => {
           const Icon = action.icon;
           return (
             <motion.button
               key={action.label}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                 action.color === "scholar"
                   ? "bg-scholar-muted hover:bg-scholar/30 text-scholar"
                   : action.color === "village"
                   ? "bg-village-muted hover:bg-village/30 text-village"
                   : action.color === "nourish"
                   ? "bg-nourish-muted hover:bg-nourish/30 text-nourish"
                   : "bg-balance-muted hover:bg-balance/30 text-balance"
               }`}
               title={action.label}
             >
               <Icon className="w-5 h-5" />
             </motion.button>
           );
         })}
       </div>
     </motion.div>
   );
 }
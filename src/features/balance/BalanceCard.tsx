 import { motion } from "framer-motion";
 import { Flower2, Moon, Footprints, Sparkles, Trophy } from "lucide-react";
 import { BentoCard } from "@/components/dashboard/BentoCard";
 
 const tasks = [
   { name: "60-min screen curfew", icon: Moon, completed: true },
   { name: "15-min mindful walk", icon: Footprints, completed: false },
 ];
 
 export function BalanceCard() {
   return (
     <BentoCard variant="balance" delay={0.4}>
       <div className="flex flex-col h-full min-h-[200px]">
         {/* Header */}
         <div className="flex items-center gap-3 mb-4">
           <div className="w-10 h-10 rounded-xl bg-balance-muted flex items-center justify-center">
             <Flower2 className="w-5 h-5 text-balance" />
           </div>
           <div>
             <h3 className="font-display font-semibold text-lg">Balance</h3>
             <p className="text-xs text-muted-foreground">Zen Garden</p>
           </div>
         </div>
 
         {/* Mini Zen Garden visualization */}
         <div className="relative flex-1 rounded-xl overflow-hidden zen-gradient p-4 mb-3">
           <div className="flex items-end justify-center gap-2 h-full">
             {[0.4, 0.7, 0.5, 0.9, 0.6].map((height, i) => (
               <motion.div
                 key={i}
                 initial={{ scaleY: 0 }}
                 animate={{ scaleY: 1 }}
                 transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                 className="w-3 rounded-t-full origin-bottom"
                 style={{
                   height: `${height * 60}px`,
                   background: `linear-gradient(to top, hsl(142 70% ${35 + i * 5}%), hsl(142 70% ${50 + i * 5}%))`,
                 }}
               />
             ))}
             <motion.div
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute top-2 right-2"
             >
               🦋
             </motion.div>
           </div>
           <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-nourish">
             <Trophy className="w-3 h-3" />
             <span>5 day streak!</span>
           </div>
         </div>
 
         {/* Tasks */}
         <div className="space-y-2">
           {tasks.map((task, i) => {
             const Icon = task.icon;
             return (
               <motion.div
                 key={task.name}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.6 + i * 0.1 }}
                 className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
               >
                 <div
                   className={`w-6 h-6 rounded-full flex items-center justify-center ${
                     task.completed
                       ? "bg-nourish text-primary-foreground"
                       : "border-2 border-muted-foreground/30"
                   }`}
                 >
                   {task.completed && <Sparkles className="w-3 h-3" />}
                 </div>
                 <Icon className="w-4 h-4 text-muted-foreground" />
                 <span
                   className={`text-sm ${
                     task.completed
                       ? "line-through text-muted-foreground"
                       : "font-medium"
                   }`}
                 >
                   {task.name}
                 </span>
               </motion.div>
             );
           })}
         </div>
       </div>
     </BentoCard>
   );
 }
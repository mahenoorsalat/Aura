 import { motion } from "framer-motion";
 import { TrendingUp, Clock, Target, Zap } from "lucide-react";
 import { BentoCard } from "./BentoCard";
 
 const stats = [
   {
     label: "Focus Score",
     value: "87%",
     change: "+12%",
     icon: Target,
     color: "primary",
   },
   {
     label: "Study Hours",
     value: "24h",
     change: "+3h",
     icon: Clock,
     color: "scholar",
   },
   {
     label: "Wellness",
     value: "92%",
     change: "+8%",
     icon: Zap,
     color: "nourish",
   },
 ];
 
 export function StatsCard() {
   return (
     <BentoCard colSpan={2} delay={0.5}>
       <div className="flex items-center justify-between mb-4">
         <h3 className="font-display font-semibold text-lg">Weekly Progress</h3>
         <TrendingUp className="w-5 h-5 text-nourish" />
       </div>
 
       <div className="grid grid-cols-3 gap-4">
         {stats.map((stat, i) => {
           const Icon = stat.icon;
           return (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 + i * 0.1 }}
               className="text-center"
             >
               <div
                 className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center ${
                   stat.color === "primary"
                     ? "bg-primary/20"
                     : stat.color === "scholar"
                     ? "bg-scholar-muted"
                     : "bg-nourish-muted"
                 }`}
               >
                 <Icon
                   className={`w-5 h-5 ${
                     stat.color === "primary"
                       ? "text-primary"
                       : stat.color === "scholar"
                       ? "text-scholar"
                       : "text-nourish"
                   }`}
                 />
               </div>
               <p className="font-display text-2xl font-bold">{stat.value}</p>
               <p className="text-xs text-muted-foreground">{stat.label}</p>
               <p className="text-xs text-nourish font-medium">{stat.change}</p>
             </motion.div>
           );
         })}
       </div>
     </BentoCard>
   );
 }
 import { motion } from "framer-motion";
 import { Sun, Moon, Sunrise, Sunset } from "lucide-react";
 
 function getTimeOfDay(): { greeting: string; icon: typeof Sun; period: string } {
   const hour = new Date().getHours();
   
   if (hour >= 5 && hour < 12) {
     return { greeting: "Good morning", icon: Sunrise, period: "morning" };
   } else if (hour >= 12 && hour < 17) {
     return { greeting: "Good afternoon", icon: Sun, period: "afternoon" };
   } else if (hour >= 17 && hour < 21) {
     return { greeting: "Good evening", icon: Sunset, period: "evening" };
   } else {
     return { greeting: "Good night", icon: Moon, period: "night" };
   }
 }
 
 export function TimeGreeting() {
   const { greeting, icon: Icon, period } = getTimeOfDay();
   
   return (
     <motion.div
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}
       className="flex items-center gap-4 mb-8"
     >
       <div className="relative">
         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
           <Icon className="w-6 h-6 text-primary" />
         </div>
         <motion.div
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl -z-10"
         />
       </div>
       <div>
         <h1 className="font-display text-2xl md:text-3xl font-bold">
           {greeting}, <span className="text-gradient-primary">Student</span>
         </h1>
         <p className="text-muted-foreground">
           {period === "morning" && "Ready to conquer your studies?"}
           {period === "afternoon" && "Keep up the momentum!"}
           {period === "evening" && "Time to wind down and reflect."}
           {period === "night" && "Rest well for tomorrow."}
         </p>
       </div>
     </motion.div>
   );
 }
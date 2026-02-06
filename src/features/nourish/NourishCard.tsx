 import { motion } from "framer-motion";
 import { Utensils, DollarSign, Calendar, ChefHat, Sparkles } from "lucide-react";
 import { BentoCard } from "@/components/dashboard/BentoCard";
 
 const mockMeals = [
   { name: "Veggie Stir Fry", cost: "$1.80", emoji: "🥗" },
   { name: "Bean Tacos", cost: "$1.50", emoji: "🌮" },
   { name: "Pasta Primavera", cost: "$2.00", emoji: "🍝" },
 ];
 
 interface NourishCardProps {
   isHighlighted?: boolean;
 }
 
 export function NourishCard({ isHighlighted }: NourishCardProps) {
   return (
     <BentoCard
       variant="nourish"
       delay={0.3}
       className={isHighlighted ? "ring-2 ring-nourish/50" : ""}
     >
       <div className="flex flex-col h-full min-h-[200px]">
         {/* Header */}
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-nourish-muted flex items-center justify-center">
               <Utensils className="w-5 h-5 text-nourish" />
             </div>
             <div>
               <h3 className="font-display font-semibold text-lg">Nourish</h3>
               <p className="text-xs text-muted-foreground">Meal Planner</p>
             </div>
           </div>
           {isHighlighted && (
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="px-2 py-1 rounded-full bg-nourish/20 text-nourish text-xs font-medium flex items-center gap-1"
             >
               <ChefHat className="w-3 h-3" />
               Dinner time
             </motion.div>
           )}
         </div>
 
         {/* Budget indicator */}
         <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-nourish/10">
           <DollarSign className="w-4 h-4 text-nourish" />
           <span className="text-sm font-medium">Weekly Budget: $40</span>
           <span className="text-xs text-nourish ml-auto">$18 left</span>
         </div>
 
         {/* Meal suggestions */}
         <div className="flex-1 space-y-2">
           {mockMeals.map((meal, i) => (
             <motion.div
               key={meal.name}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 + i * 0.1 }}
               className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
             >
               <span className="text-xl">{meal.emoji}</span>
               <span className="flex-1 text-sm font-medium">{meal.name}</span>
               <span className="text-xs text-nourish font-medium">{meal.cost}</span>
             </motion.div>
           ))}
         </div>
 
         {/* Generate button */}
         <motion.button
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className="w-full mt-4 py-2 rounded-xl bg-nourish/20 text-nourish font-medium text-sm flex items-center justify-center gap-2 hover:bg-nourish/30 transition-colors"
         >
           <Sparkles className="w-4 h-4" />
           Generate Week Plan
         </motion.button>
       </div>
     </BentoCard>
   );
 }
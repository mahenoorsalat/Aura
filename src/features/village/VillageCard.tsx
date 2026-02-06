 import { motion } from "framer-motion";
 import { Users, MessageCircle, Heart, Sparkles } from "lucide-react";
 import { BentoCard } from "@/components/dashboard/BentoCard";
 
 const mockMatches = [
   { name: "Alex", tag: "First-gen", avatar: "🎓" },
   { name: "Jordan", tag: "CS Major", avatar: "💻" },
   { name: "Sam", tag: "Study Group", avatar: "📚" },
 ];
 
 export function VillageCard() {
   return (
     <BentoCard variant="village" delay={0.2}>
       <div className="flex flex-col h-full min-h-[200px]">
         {/* Header */}
         <div className="flex items-center gap-3 mb-4">
           <div className="w-10 h-10 rounded-xl bg-village-muted flex items-center justify-center">
             <Users className="w-5 h-5 text-village" />
           </div>
           <div>
             <h3 className="font-display font-semibold text-lg">Village</h3>
             <p className="text-xs text-muted-foreground">Peer Matching</p>
           </div>
         </div>
 
         {/* Matches */}
         <div className="flex-1 space-y-2">
           {mockMatches.map((match, i) => (
             <motion.div
               key={match.name}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 + i * 0.1 }}
               className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
             >
               <div className="w-8 h-8 rounded-full bg-village-muted flex items-center justify-center text-lg">
                 {match.avatar}
               </div>
               <div className="flex-1 min-w-0">
                 <p className="font-medium text-sm truncate">{match.name}</p>
                 <p className="text-xs text-muted-foreground">{match.tag}</p>
               </div>
               <MessageCircle className="w-4 h-4 text-muted-foreground" />
             </motion.div>
           ))}
         </div>
 
         {/* CTA */}
         <motion.button
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className="w-full mt-4 py-2 rounded-xl bg-village/20 text-village font-medium text-sm flex items-center justify-center gap-2 hover:bg-village/30 transition-colors"
         >
           <Heart className="w-4 h-4" />
           Find More Matches
         </motion.button>
       </div>
     </BentoCard>
   );
 }
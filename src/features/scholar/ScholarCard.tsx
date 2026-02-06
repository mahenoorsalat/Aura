 import { motion } from "framer-motion";
 import { BookOpen, FileText, Search, Sparkles } from "lucide-react";
 import { BentoCard } from "@/components/dashboard/BentoCard";
 
 interface ScholarCardProps {
   isHighlighted?: boolean;
 }
 
 export function ScholarCard({ isHighlighted }: ScholarCardProps) {
   return (
     <BentoCard
       variant="scholar"
       colSpan={2}
       delay={0.1}
       className={isHighlighted ? "ring-2 ring-scholar/50" : ""}
     >
       <div className="flex flex-col h-full min-h-[200px]">
         {/* Header */}
         <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-scholar-muted flex items-center justify-center">
               <BookOpen className="w-5 h-5 text-scholar" />
             </div>
             <div>
               <h3 className="font-display font-semibold text-lg">Scholar</h3>
               <p className="text-xs text-muted-foreground">AI-Powered Notes</p>
             </div>
           </div>
           {isHighlighted && (
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="px-2 py-1 rounded-full bg-scholar/20 text-scholar text-xs font-medium flex items-center gap-1"
             >
               <Sparkles className="w-3 h-3" />
               Study time
             </motion.div>
           )}
         </div>
 
         {/* Content */}
         <div className="flex-1 space-y-3">
           {/* Upload area mockup */}
           <div className="border-2 border-dashed border-scholar/30 rounded-xl p-4 text-center hover:border-scholar/50 transition-colors cursor-pointer">
             <FileText className="w-8 h-8 text-scholar/50 mx-auto mb-2" />
             <p className="text-sm text-muted-foreground">Drop PDFs here</p>
           </div>
 
           {/* Search bar mockup */}
           <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-2">
             <Search className="w-4 h-4 text-muted-foreground" />
             <span className="text-sm text-muted-foreground">
               Ask your notes anything...
             </span>
           </div>
         </div>
 
         {/* Stats */}
         <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
           <div>
             <p className="text-2xl font-display font-bold text-scholar">12</p>
             <p className="text-xs text-muted-foreground">Documents</p>
           </div>
           <div>
             <p className="text-2xl font-display font-bold text-scholar">48</p>
             <p className="text-xs text-muted-foreground">Queries</p>
           </div>
         </div>
       </div>
     </BentoCard>
   );
 }
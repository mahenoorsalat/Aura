 import { motion } from "framer-motion";
 import { ReactNode } from "react";
 import { cn } from "@/lib/utils";
 
 interface BentoCardProps {
   children: ReactNode;
   className?: string;
   colSpan?: 1 | 2;
   rowSpan?: 1 | 2;
   variant?: "default" | "scholar" | "village" | "nourish" | "balance";
   delay?: number;
   onClick?: () => void;
 }
 
 const variantStyles = {
   default: "border-border/50",
   scholar: "border-scholar/30 hover:border-scholar/50",
   village: "border-village/30 hover:border-village/50",
   nourish: "border-nourish/30 hover:border-nourish/50",
   balance: "border-balance/30 hover:border-balance/50",
 };
 
 const glowStyles = {
   default: "",
   scholar: "hover:shadow-[0_0_30px_hsl(180_70%_50%/0.15)]",
   village: "hover:shadow-[0_0_30px_hsl(270_50%_60%/0.15)]",
   nourish: "hover:shadow-[0_0_30px_hsl(142_70%_45%/0.15)]",
   balance: "hover:shadow-[0_0_30px_hsl(38_92%_50%/0.15)]",
 };
 
 export function BentoCard({
   children,
   className,
   colSpan = 1,
   rowSpan = 1,
   variant = "default",
   delay = 0,
   onClick,
 }: BentoCardProps) {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay }}
       whileHover={{ scale: 1.02 }}
       whileTap={{ scale: 0.98 }}
       onClick={onClick}
       className={cn(
         "glass-card p-5 relative overflow-hidden transition-all duration-300 cursor-pointer",
         variantStyles[variant],
         glowStyles[variant],
         colSpan === 2 && "md:col-span-2",
         rowSpan === 2 && "md:row-span-2",
         className
       )}
     >
       {children}
     </motion.div>
   );
 }
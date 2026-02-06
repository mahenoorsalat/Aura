import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import ScholarPage from "./pages/ScholarPage";
import VillagePage from "./pages/VillagePage";
import NourishPage from "./pages/NourishPage";
import BalancePage from "./pages/BalancePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { AuraSplash } from "./components/AuraSplash";

const queryClient = new QueryClient();

const App = () => {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {isBooting ? (
            <AuraSplash key="splash" onComplete={() => setIsBooting(false)} />
          ) : (
            <div key="app-content">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/scholar" element={<ScholarPage />} />
                  <Route path="/village" element={<VillagePage />} />
                  <Route path="/nourish" element={<NourishPage />} />
                  <Route path="/balance" element={<BalancePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

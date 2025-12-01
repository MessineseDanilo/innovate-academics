import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CuratedInsights from "./pages/CuratedInsights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { HelmetProvider } from "react-helmet-async";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>  {/* ← Aggiunto questo wrapper */}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/insights" element={<CuratedInsights />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>  {/* ← Chiusura del wrapper */}
  </QueryClientProvider>
);


export default App;

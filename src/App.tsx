import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import GetStarted from "./pages/GetStarted.tsx";
import SettingUp from "./pages/SettingUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import StaffAccess from "./pages/StaffAccess.tsx";
import FacilityLogin from "./pages/FacilityLogin.tsx";
import StaffPortal from "./pages/StaffPortal.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/setting-up" element={<SettingUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff-access" element={<StaffAccess />} />
          <Route path="/facility-login" element={<FacilityLogin />} />
          <Route path="/staff-portal" element={<StaffPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

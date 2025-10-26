import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AssetSearch from "./pages/AssetSearch";
import AssetList from "./pages/AssetList";
import TopAssets from "./pages/TopAssets";
import TokenDetail from "./pages/TokenDetail";
import SubmitToken from "./pages/SubmitToken";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes */}
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <AssetSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assets"
                element={
                  <ProtectedRoute>
                    <AssetList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/top-assets"
                element={
                  <ProtectedRoute>
                    <TopAssets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/token/:id"
                element={
                  <ProtectedRoute>
                    <TokenDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit"
                element={
                  <ProtectedRoute>
                    <SubmitToken />
                  </ProtectedRoute>
                }
              />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

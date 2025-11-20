import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import StaffPortal from "./pages/StaffPortal.jsx";
import CitizenRegister from "./pages/CitizenRegister";
import CitizenLogin from "./pages/CitizenLogin";
import CitizenPanel from "./pages/CitizenPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/citizen/login" element={<CitizenLogin />} />
            <Route
              path="/staff/portal"
              element={
                <ProtectedRoute>
                  <StaffPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/register"
              element={
                <ProtectedRoute>
                  <CitizenRegister />
                </ProtectedRoute>
              }
            />
            <Route
              path="/citizen/panel"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <CitizenPanel />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
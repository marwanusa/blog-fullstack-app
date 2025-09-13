import useAuth from "@/hooks/useAuth";
import type { AuthContextType } from "@/types/AuthContextType";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAuth: boolean;
};


export default function ProtectedRoute({
  children,
  requireAuth,
}: ProtectedRouteProps) {
  const { user, loading }: AuthContextType  = useAuth();

  if (loading) return <p>Loading...</p>;

  if (requireAuth) {
    if (!user) return <Navigate to="/login" />;
  } else {
    if (user) return <Navigate to="/" />;
  }

  return children;
}

import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Enquanto a sessão é verificada, não decide nada
  if (loading) return <p className="aviso">Verificando sessão...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  return (
    <section className="card">
      <h1>Atividade prática — Autenticação</h1>
      <p>React, React Router, Supabase Auth e Context API.</p>
      {user ? (
        <Link to="/dashboard" className="btn">Ir para o dashboard</Link>
      ) : (
        <p>
          <Link to="/login" className="btn">Entrar</Link>{" "}
          <Link to="/registro" className="btn btn-sec">Criar conta</Link>
        </p>
      )}
    </section>
  );
}

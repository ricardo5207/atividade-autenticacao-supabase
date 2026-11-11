import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const nome = user?.user_metadata?.nome ?? user?.email;

  return (
    <section className="card">
      <h1>Olá, {nome}</h1>
      <p>Você está autenticado.</p>
      <p>
        <Link to="/registros" className="btn">Ver registros</Link>{" "}
        <Link to="/perfil" className="btn btn-sec">Meu perfil</Link>
      </p>
    </section>
  );
}

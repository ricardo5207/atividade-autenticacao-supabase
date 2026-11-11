import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Perfil() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <section className="card">
      <h1>Meu Perfil</h1>
      <dl>
        <div><dt>Nome completo</dt><dd>{user.user_metadata?.nome ?? "Não informado"}</dd></div>
        <div><dt>E-mail</dt><dd>{user.email}</dd></div>
        <div><dt>Identificador</dt><dd>{user.id}</dd></div>
      </dl>
      <button className="btn" onClick={handleLogout}>Encerrar sessão</button>
    </section>
  );
}

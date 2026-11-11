import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link to="/" className="marca">Atividade Auth</Link>
      <nav>
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/registros">Registros</NavLink>
            <NavLink to="/perfil">Perfil</NavLink>
            <button onClick={handleLogout} className="btn-link">Sair</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Entrar</NavLink>
            <NavLink to="/registro">Criar conta</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

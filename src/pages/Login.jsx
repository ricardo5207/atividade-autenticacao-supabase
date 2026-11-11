import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (enviando) return; // impede envio repetido
    setErro("");

    if (!email.trim() || !senha) return setErro("Preencha e-mail e senha.");

    setEnviando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setEnviando(false);

    if (error) return setErro("Credenciais inválidas ou e-mail não confirmado.");

    navigate("/dashboard");
  }

  return (
    <section className="card">
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <label>E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        {erro && <p className="erro" role="alert">{erro}</p>}
        <button className="btn" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p>Não tem conta? <Link to="/registro">Criar conta</Link></p>
    </section>
  );
}

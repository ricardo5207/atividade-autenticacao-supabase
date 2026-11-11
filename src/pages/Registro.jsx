import { useState } from "react";
import { Link, Navigate } from "react-router";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../hooks/useAuth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Registro() {
  const { user } = useAuth();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  function validar() {
    if (!nomeCompleto.trim() || !email.trim() || !senha || !confirmacao)
      return "Preencha todos os campos.";
    if (!EMAIL_REGEX.test(email)) return "Informe um e-mail válido.";
    if (senha.length < 8) return "A senha deve ter no mínimo 8 caracteres.";
    if (senha !== confirmacao) return "A confirmação de senha não confere.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (enviando) return;
    setErro("");
    setSucesso("");

    const mensagem = validar();
    if (mensagem) return setErro(mensagem);

    setEnviando(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome: nomeCompleto.trim() } },
    });
    setEnviando(false);

    if (error) return setErro(error.message);

    // Com confirmação de e-mail ativa, não há sessão até o usuário confirmar
    if (!data.session) {
      setSucesso("Cadastro realizado! Confirme seu e-mail antes de fazer login.");
    } else {
      setSucesso("Cadastro realizado com sucesso!");
    }
  }

  return (
    <section className="card">
      <h1>Criar conta</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome completo
          <input value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} />
        </label>
        <label>E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <label>Confirmar senha
          <input type="password" value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} />
        </label>
        {erro && <p className="erro" role="alert">{erro}</p>}
        {sucesso && <p className="ok" role="status">{sucesso}</p>}
        <button className="btn" disabled={enviando}>
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      <p>Já tem conta? <Link to="/login">Entrar</Link></p>
    </section>
  );
}

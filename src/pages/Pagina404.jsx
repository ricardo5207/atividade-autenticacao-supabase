import { Link } from "react-router";

export default function Pagina404() {
  return (
    <section className="card">
      <h1>Página não encontrada</h1>
      <p>A rota que você tentou acessar não existe.</p>
      <Link to="/" className="btn">Voltar para o início</Link>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase, TABELA_REGISTROS } from "../services/supabaseClient";

export function tituloDoRegistro(r) {
  return r.titulo ?? r.nome ?? r.title ?? r.name ?? `Registro ${r.id}`;
}

export default function Registros() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase.from(TABELA_REGISTROS).select("*");
      if (error) setErro("Não foi possível carregar os registros: " + error.message);
      else setRegistros(data);
      setLoading(false);
    }
    carregar();
  }, []);

  if (loading) return <p className="aviso">Carregando registros...</p>;
  if (erro) return <p className="erro" role="alert">{erro}</p>;

  return (
    <section className="card">
      <h1>Registros</h1>
      {registros.length === 0 && <p>Nenhum registro encontrado.</p>}
      <ul className="lista">
        {registros.map((r) => (
          <li key={r.id}>
            <Link to={`/registros/${r.id}`}>{tituloDoRegistro(r)}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

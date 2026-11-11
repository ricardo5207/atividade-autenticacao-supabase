import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabase, TABELA_REGISTROS } from "../services/supabaseClient";
import { tituloDoRegistro } from "./Registros";

export default function Detalhes() {
  const { id } = useParams();
  const [registro, setRegistro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from(TABELA_REGISTROS)
        .select("*")
        .eq("id", id)
        .single();
      if (error) setErro("Não foi possível carregar o registro: " + error.message);
      else setRegistro(data);
      setLoading(false);
    }
    carregar();
  }, [id]);

  if (loading) return <p className="aviso">Carregando registro...</p>;
  if (erro) return <p className="erro" role="alert">{erro}</p>;

  return (
    <section className="card">
      <h1>{tituloDoRegistro(registro)}</h1>
      <dl>
        {Object.entries(registro).map(([chave, valor]) => (
          <div key={chave}>
            <dt>{chave}</dt>
            <dd>{String(valor)}</dd>
          </div>
        ))}
      </dl>
      <Link to="/registros">Voltar para a listagem</Link>
    </section>
  );
}

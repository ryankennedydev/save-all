import React, { useState } from "react";
import { BiArrowBack, BiCalendar, BiTrash } from "react-icons/bi";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import imagempadrao from "../assets/imagempadrao.svg";

/*
  Fonte do corpo: cole no <head> do index.html (a Georgia já vem no sistema)
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
*/
const display = { fontFamily: 'Georgia, "Times New Roman", serif' };
const corpo = {
  fontFamily: '"DM Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};

const COR_PADRAO = "#A78BFA";

export const Card = ({ valueCheck, setValueCheck, darkmode, setDarkmode }) => {
  const dark = darkmode !== false;
  const navigate = useNavigate();

  const [confirmando, setConfirmando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");

  // evita tela branca depois de excluir
  if (!valueCheck) return null;

  const cor = valueCheck.color || COR_PADRAO;
  const fundoTile = dark
    ? `color-mix(in srgb, ${cor} 22%, #1B1818)`
    : `color-mix(in srgb, ${cor} 34%, white)`;
  const tintaCategoria = dark ? cor : `color-mix(in srgb, ${cor} 50%, #000)`;

  const tinta = dark ? "text-stone-100" : "text-[#1F1A2E]";
  const suave = dark ? "text-stone-400" : "text-[#1F1A2E]/65";

  const data = valueCheck.data
    ? new Date(valueCheck.data).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  function voltar() {
    setValueCheck(null);
    navigate("/");
  }

  async function excluirCard(id) {
    setExcluindo(true);
    setErro("");
    try {
      const res = await fetch(`http://localhost:3000/cards/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("falha ao excluir");

      setValueCheck(null);
      navigate("/");
    } catch (error) {
      console.log("erro ao excluir", error);
      setErro("Não foi possível excluir. Tente de novo.");
      setConfirmando(false);
    } finally {
      setExcluindo(false);
    }
  }

  const acao =
    "flex cursor-pointer items-center gap-2 text-sm font-semibold transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <main
      style={corpo}
      className={`min-h-screen w-full transition-colors duration-300 ease-in ${
        dark ? "bg-[#1B1818]" : "bg-[#F6F3EE]"
      }`}
    >
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />

      <section className="mx-auto flex w-full max-w-5xl justify-center p-5 sm:p-10">
        <article
          style={{ backgroundColor: fundoTile }}
          className="flex w-full flex-col gap-8 rounded-[2rem] p-6 sm:p-10"
        >
          {/* barra de ações */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={voltar}
              className={`${acao} ${tinta}`}
            >
              <BiArrowBack size={18} />
              Voltar
            </button>

            {!confirmando && (
              <button
                type="button"
                onClick={() => setConfirmando(true)}
                className={`${acao} ${dark ? "text-red-300" : "text-red-800"}`}
              >
                <BiTrash size={18} />
                Excluir
              </button>
            )}
          </div>

          {/* confirmação inline */}
          {confirmando && (
            <div
              className={`flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between ${
                dark ? "bg-red-400/10" : "bg-white/60"
              }`}
            >
              <p className={`text-sm font-semibold ${dark ? "text-red-200" : "text-red-900"}`}>
                Excluir este item? Não dá pra desfazer.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => excluirCard(valueCheck._id)}
                  disabled={excluindo}
                  className="cursor-pointer rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {excluindo ? "Excluindo..." : "Sim, excluir"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmando(false)}
                  disabled={excluindo}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-opacity duration-200 hover:opacity-80 disabled:opacity-50 ${
                    dark ? "bg-white/10 text-stone-200" : "bg-[#1F1A2E]/10 text-[#1F1A2E]"
                  }`}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {erro && (
            <p role="alert" className={`text-sm font-semibold ${dark ? "text-red-300" : "text-red-800"}`}>
              {erro}
            </p>
          )}

          {/* conteúdo: imagem em arco + texto */}
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
            <img
              className="mx-auto h-72 w-full max-w-xs rounded-t-full object-cover md:h-96"
              src={valueCheck.imagem ? valueCheck.imagem : imagempadrao}
              alt=""
            />

            <div className="flex min-w-0 flex-col gap-5">
              {valueCheck.category && (
                <span
                  className="w-fit rounded-full px-3 py-1 text-sm font-semibold"
                  style={{
                    backgroundColor: dark ? `${cor}33` : "rgba(255,255,255,0.6)",
                    color: tintaCategoria,
                  }}
                >
                  {valueCheck.category}
                </span>
              )}

              <h1
                style={display}
                className={`break-words text-4xl font-bold leading-tight tracking-tight sm:text-5xl ${tinta}`}
              >
                {valueCheck.title}
              </h1>

              <p className={`whitespace-pre-line break-words text-lg leading-relaxed ${suave}`}>
                {valueCheck.description}
              </p>

              {data && (
                <div className={`mt-2 flex items-center gap-2 text-sm ${suave}`}>
                  <BiCalendar />
                  <span>Salvo em {data}</span>
                </div>
              )}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};
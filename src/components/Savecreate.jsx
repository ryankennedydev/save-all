import React, { use, useState } from "react";
import { BiX } from "react-icons/bi";
export const Savecreate = ({ activesave, setActiveSave, onCardCreated }) => {
  const [lenghttitle, setLenghttittle] = useState(0);
  const [lenghtdescription, setLenghtDescription] = useState(0);
  const [lenghtcategory, setLenghtCategory] = useState(0);

  const [tittleValue, setTittleValue] = useState("");
  const [DescriptionValue, SetDescriptionValue] = useState("");
  const [CattegoryValue, SetCategoryValue] = useState("");
  const [ImageValue, setImageValue] = useState("");
  const [colorValue, setColorValue] = useState("");

  const coresPastel = [
    { nome: "Rosa", valor: "#F9C5D1" },
    { nome: "Pêssego", valor: "#FAD7A0" },
    { nome: "Amarelo", valor: "#F9E79F" },
    { nome: "Verde", valor: "#C8E6C9" },
    { nome: "Turquesa", valor: "#B2DFDB" },
    { nome: "Azul", valor: "#B3E5FC" },
    { nome: "Azul Lavanda", valor: "#C5CAE9" },
    { nome: "Lavanda", valor: "#D1C4E9" },
    { nome: "Lilás", valor: "#E1BEE7" },
    { nome: "Rosa Claro", valor: "#F8BBD0" },
    { nome: "Bege", valor: "#D7CCC8" },
    { nome: "Cinza Azulado", valor: "#CFD8DC" },
  ];

  async function CreateCard() {
    if (tittleValue && DescriptionValue && CattegoryValue && colorValue) {
      try {
        const response = await fetch("http://localhost:3000/newcard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: tittleValue,
            description: DescriptionValue,
            category: CattegoryValue,
            imagem: ImageValue,
            color: colorValue,
          }),
        });

        await onCardCreated();
        setActiveSave(true);
      } catch (error) {
        console.log("Card not created:", error);
      }
    }
  }

  return (
    <main
      className={`fixed inset-0  z-60 flex items-center justify-center  bg-black/60 backdrop-blur-sm p-4 ${activesave === false ? "block" : "hidden"}`}
    >
      {" "}
      <form className="p-5 justify-center gap-10 items-center w-[90%]  sm:w-[90%] md:w-[50%]  border-1  bg-stone-800 flex flex-col rounded-2xl">
        <div className="flex w-full items-center justify-between gap-4 text-stone-100 font-bold text-lg sm:text-xl">
          <h1 className="min-w-0 truncate">Criar novo item</h1>

          <button
            type="button"
            onClick={() => setActiveSave(!activesave)}
            aria-label="Fechar"
            className="shrink-0 cursor-pointer rounded-2xl bg-red-500 p-1 transition-all duration-150 ease-in hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <BiX size={25} />
          </button>
        </div>

        <div className="flex flex-col w-full gap-5 text-stone-100">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1>
                Titulo<span className="text-blue-500"> *</span>
              </h1>
              <h1 className="text-stone-400 text-[15px]">{lenghttitle}/20</h1>
            </div>
            <input
              value={tittleValue}
              maxLength={20}
              onChange={(e) => {
                setTittleValue(e.target.value);
                setLenghttittle(e.target.value.length);
              }}
              placeholder="Enter tittle"
              className="border-1 border-stone-950/60 rounded-2xl outline-none w-full p-2 bg-stone-950/30"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1>
                Descrição<span className="text-blue-500"> *</span>
              </h1>
              <h1 className="text-[15px] text-stone-400">
                {lenghtdescription}/500
              </h1>
            </div>
            <textarea
              maxLength={500}
              value={DescriptionValue}
              onChange={(e) => {
                setLenghtDescription(e.target.value.length);
                SetDescriptionValue(e.target.value);
              }}
              placeholder="Descreva com mais detalhes..."
              className="border-1 border-stone-950/60 rounded-2xl pb-20 outline-none w-full p-2 bg-stone-950/30"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between ">
              <h1>
                Categoria<span className="text-blue-500"> *</span>
              </h1>
              <h1 className="text-[15px] text-stone-400">
                {lenghtcategory}/10
              </h1>
            </div>
            <input
              maxLength={10}
              value={CattegoryValue}
              onChange={(e) => {
                SetCategoryValue(e.target.value);
                setLenghtCategory(e.target.value.length);
              }}
              placeholder="Escolha a categoria"
              className="border-1 border-stone-950/60 rounded-2xl outline-none w-full p-2 bg-stone-950/30"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between ">
              <h1>
                Imagem<span className="text-blue-500/80"> (opcional)</span>
              </h1>
            </div>
            <input
              value={ImageValue}
              onChange={(e) => {
                setImageValue(e.target.value);
              }}
              placeholder="Link da sua imagem..."
              className="border-1 border-stone-950/60 rounded-2xl outline-none w-full p-2 bg-stone-950/30"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between ">
              <h1>
                Cor<span className="text-blue-500/80">*</span>
              </h1>
            </div>
            <div>
              <select
                onChange={(e) => setColorValue(e.target.value)}
                className={`bg-stone-700 w-fit  p-5 rounded-2xl`}
                name=""
                id=""
              >
                <option value="">Selecione uma cor</option>
                {coresPastel.map((cor) => (
                  <option key={cor.valor} value={cor.valor}>
                    {cor.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTittleValue("");
                SetDescriptionValue("");
                SetCategoryValue("");
                setImageValue("");
                setLenghtCategory(0);
                setLenghtDescription(0);
                setLenghttittle(0);
              }}
              className="p-5 bg-red-700 w-full rounded-2xl font-bold transition-all duration-150 ease-in hover:opacity-80 cursor-pointer active:scale-95 "
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={CreateCard}
              className={`p-5 bg-blue-500 w-full rounded-2xl font-bold transition-all duration-150 ease-in hover:opacity-80 cursor-pointer active:scale-95 ${!tittleValue || !DescriptionValue || !colorValue || !CattegoryValue ? "bg-stone-950/30 cursor-not-allowed " : ""}`}
              disabled={
                !tittleValue ||
                !DescriptionValue ||
                !CattegoryValue ||
                !colorValue
              }
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

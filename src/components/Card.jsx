import React from "react";
import { BiArrowBack, BiCalendar, BiEdit } from "react-icons/bi";
import { Navbar } from "./Navbar";

export const Card = ({ valueCheck, setValueCheck }) => {
  async function excluirCard(id) {
    try {
      const res = await fetch(`http://localhost:3000/cards/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("falha ao excluir");

      setValueCheck(null);
      navigate("/");
    } catch (error) {
      console.log("erro ao excluir", error);
    }
  }

  function voltar() {
    setValueCheck(null);
  }

  return (
    <section>
      <Navbar />
      <section className="w-full min-h-screen flex justify-center items-center p-5 sm:p-10">
        <main
          key={valueCheck._id}
          className={`sm:p-10 p-5 bg-stone-800 sm:w-[40%] flex flex-col rounded-2xl gap-5 `}
        >
          <div className="flex justify-between items-center">
            <div className="flex text-stone-300 items-center gap-2 cursor-pointer transition-all duration-200 ease-in hover:opacity-50">
              <BiArrowBack />
              <h1>Voltar</h1>
            </div>
            <div
              onClick={() => excluirCard(valueCheck._id)}
              className="flex text-red-300 items-center gap-2 cursor-pointer transition-all duration-200 ease-in hover:opacity-50"
            >
              <BiEdit />
              <h1>Excluir </h1>
            </div>
          </div>

          <div className="flex flex-col gap-2  ">
            <h1
              className={` w-fit rounded-2xl text-[12px] p-2 font-bold text-stone-100 text-stone-950 `}
              style={{ background: valueCheck.color }}
            >
              {valueCheck ? valueCheck.category.toUpperCase() : ""}
            </h1>
            <h1 className="font-bold text-stone-100 text-[30px]">
              {valueCheck.title}
            </h1>
            <h1 className="text-stone-500 text-[20px]">
              {valueCheck.description}
            </h1>
          </div>
          <div className="flex  items-center gap-2 text-stone-600 font-bold">
            <BiCalendar />
            <h1>
              Created: {new Date(valueCheck.data).toLocaleDateString("pt-BR")}
            </h1>
          </div>
        </main>
      </section>
    </section>
  );
};

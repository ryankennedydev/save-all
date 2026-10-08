import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { BiCalendar, BiPlus, BiSearch } from "react-icons/bi";
import { RiGhost2Fill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { CgCalendar } from "react-icons/cg";
import imagempadrao from "../assets/imagempadrao.svg";
import { Savecreate } from "./Savecreate";
import { MdMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Home = ({ darkmode, setDarkmode, valueCheck, setValueCheck }) => {
  const [filtersearch, setFilter] = useState("");
  const [activesave, setActiveSave] = useState(true);

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  async function getCards() {
    try {
      const response = await fetch("http://localhost:3000/findCard");
      const data = await response.json();

      setCards(data);
    } catch (error) {
      {
        console.log("erro", error);
      }
    }
  }
  useEffect(() => {
    getCards();
  }, []);

  return (
    <main
      className={`min-h-screen w-full transition-all duration-300 ease-in ${darkmode === false ? "bg-stone-100" : "bg-[#1B1818]"} `}
    >
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />
      <Savecreate
        activesave={activesave}
        setActiveSave={setActiveSave}
        onCardCreated={getCards}
      />

      <section className="p-10 w-full flex flex-col gap-10  ">
        <div className="flex gap-5 items-center justify-between">
          <div className="relative w-full">
            <BiSearch
              size={22}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none"
            />
            <input
              onChange={(e) => setFilter(e.target.value)}
              type="text"
              className="w-full p-5 pl-12 border border-stone-500/20 bg-stone-600/20 text-stone-100 placeholder:text-stone-500 outline-none rounded-2xl focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          <button
            type="button"
            onClick={() => setActiveSave(!activesave)}
            className="shrink-0 p-5 flex items-center gap-3 rounded-2xl bg-blue-500 text-stone-100 font-bold cursor-pointer hover:bg-blue-600 transition-all duration-200"
          >
            <BiPlus size={25} />
            <h1 className="hidden sm:block">Criar novo Item</h1>
          </button>
        </div>

        {cards.length > 0 ? (
          <main className="grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 grid">
            {cards
              .filter(
                (e) =>
                  e.title.toLowerCase().includes(filtersearch.toLowerCase()) ||
                  e.description
                    .toLowerCase()
                    .includes(filtersearch.toLowerCase()) ||
                  e.category.toLowerCase().includes(filtersearch.toLowerCase()),
              )
              .map((item) => (
                <div
                  key={item._id}
                  className={`h-100 group flex flex-col ${darkmode === false ? "bg-stone-800" : "bg-stone-800"}  gap-5 rounded-2xl transition-all duration-300 ease-in hover:-translate-y-2`}
                >
                  <div className="w-full  overflow-hidden rounded-t-2xl  ">
                    <img
                      className="rounded-t-2xl h-48 w-full object-cover transition-all duration-300 ease-in group-hover:scale-105 "
                      src={`${item.imagem ? item.imagem : imagempadrao}`}
                      alt=""
                    />
                  </div>

                  <main className="flex flex-col gap-2 p-5">
                    <div>
                      <h2
                        className="font-bold text-[13px]"
                        style={{ color: item.color }}
                      >
                        {item.category.toUpperCase()}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-[20px] line-clamp-1 font-serif font-bold text-stone-100">
                        {item.title.toUpperCase()}
                      </h1>
                      <p className="line-clamp-2 text-stone-400">
                        {item.description}
                      </p>
                    </div>

                    <div className="border-t border-stone-600/50 flex justify-between pt-1 items-center">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center font-bold">
                          <BiCalendar className="text-stone-600" />
                          <h1 className="text-stone-600">
                            {new Date(item.data).toLocaleDateString("pt-BR")}
                          </h1>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            setValueCheck(item);
                            navigate("/card");
                          }}
                          className="underline cursor-pointer pt-1"
                        >
                          <BiArrowBack
                            className="p-2 rounded-full rotate-180 text-stone-100 font-bold hover:rotate-160 transition-all duration-200 ease-in"
                            style={{ backgroundColor: item.color }}
                            size={40}
                          />
                        </button>
                      </div>
                    </div>
                  </main>
                </div>
              ))}
          </main>
        ) : (
          <main className="flex justify-center  min-h-[500px] rounded-2xl items-center">
            <div className="items-center flex flex-col gap-5">
              <RiGhost2Fill className="text-stone-600" size={70} />
              <h1 className="font-bold text-stone-600">
                Nenhum item encontrado
              </h1>
            </div>
          </main>
        )}
      </section>
    </main>
  );
};

import React from "react";
import { BiSun, BiMoon, BiBookmark } from "react-icons/bi";

const display = { fontFamily: 'Georgia, "Times New Roman", serif' };

export const Navbar = ({ darkmode, setDarkmode }) => {
  const dark = darkmode !== false;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ease-in ${
        dark ? "border-white/10 bg-[#1B1818]" : "border-[#1F1A2E]/10 bg-[#F6F3EE]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-10">
        {/* logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-300">
            <BiBookmark size={22} className="text-[#1F1A2E]" />
          </div>
          <span
            style={display}
            className={`text-[26px] font-bold leading-none tracking-tight ${
              dark ? "text-stone-100" : "text-[#1F1A2E]"
            }`}
          >
            Save<em className="font-normal italic">all</em>
          </span>
        </div>

        {/* tema */}
        <button
          type="button"
          onClick={() => setDarkmode(!darkmode)}
          aria-label={dark ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
          className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
            dark
              ? "bg-white/10 text-stone-200 hover:bg-white/15"
              : "bg-[#1F1A2E]/10 text-[#1F1A2E] hover:bg-[#1F1A2E]/15"
          }`}
        >
          {dark ? <BiMoon size={22} /> : <BiSun size={22} />}
        </button>
      </div>
    </header>
  );
};
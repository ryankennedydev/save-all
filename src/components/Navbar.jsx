import React from 'react'
import { BiSun, BiMoon,BiBookmark } from 'react-icons/bi'

export const Navbar = ({darkmode, setDarkmode},activesave, setActiveSave) => {
  return (
    <main className={`w-full border-b border-stone-500/30 p-5 justify-between flex items-center top-0  z-100  blur-shadow-2xl ${darkmode === false ? 'bg-stone-100' : 'bg-stone-950/90'} `}>
        <div className='flex gap-2 items-center'>
            <div className='bg-blue-500 p-3 rounded-lg'>
            <BiBookmark size={20} className='text-stone-100'/>

            </div>
            <h1 className='text-stone-400 text-[30px] font-bold '>SAVE<span className='text-blue-600'>ALL</span></h1>
        </div>
        <div>
            <button onClick={() => setDarkmode(!darkmode)}  className={`border-1 rounded-2xl cursor-pointer transition-all duration-150 ease-in hover:opacity-70 ${darkmode === false ? 'border-stone-950 text-blue-400 bg-stone-950' : 'border-stone-100 bg-stone-100 text-blue-600 transition-all duration-300 ease-in'}`}>
                {darkmode === false ? <BiSun size={45} className='p-2'/> : <BiMoon size={45} className='p-2'/>}
            </button>
        </div>
    </main>
)
}

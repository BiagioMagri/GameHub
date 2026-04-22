import { useState } from "react"
import { Link } from "react-router"
import { FaXmark, FaBarsStaggered } from "react-icons/fa6"

export default function Sidebar({ genres }) {
  const [open, setOpen] = useState(false)

  return (
    <>
    
      <button onClick={() => setOpen(!open)} className={`fixed cursor-pointer top-30 z-50 p-3 rounded-r-xl shadow-2xl transition-all duration-500 ease-in-out border border-l-0 border-white/10
          ${open ? "left-64 bg-purple-600 text-white" : "left-0 bg-[#1a1d23] text-purple-400 hover:text-white"}
        `}
      >
        {open ? <FaXmark size={20} /> : <FaBarsStaggered size={20} />}
      </button>

    
       

     
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#0f1115] border-r border-white/10 z-40 transform transition-transform duration-500 ease-out shadow-[10px_0_30px_rgba(0,0,0,0.5)]
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center gap-3 border-b border-white/5">
            <h2 className="font-black text-xl uppercase tracking-tighter text-white">
              Generi
            </h2>
          </div>

        
          <nav className="flex-1 overflow-y-auto custom-scrollbar p-4" data-lenis-prevent>
            <ul className="space-y-2">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <Link 
                    to={`/genre/${genre.slug}`} 
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
                  >
                    <span className="text-gray-400 group-hover:text-white font-medium transition-colors">
                      {genre.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
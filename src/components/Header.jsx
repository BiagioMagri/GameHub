import { GoStarFill } from "react-icons/go";
import { useState } from "react";
export default function Header({ game }) {


    const [visible, setVisible] = useState(false);

    const handleVisible = ()=>{
        setVisible((prev) => !prev);
    }



    return (
        <header className="text-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-purple-500"></div>
                        <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-purple-400">
                            Descrizione
                        </h2>
                    </div>  
                    <p className={`font-inter text-lg leading-relaxed text-gray-300/90 ${visible ? " " : "line-clamp-5"}`}>
                        {game.description_raw}
                    </p>
                        <button onClick={handleVisible} className="cursor-pointer hover:underline ">{visible ? "Mostra meno" : "Mostra di più ↓"}</button>
                </div>
                <div className="space-y-8 bg-white/5 p-6 rounded-2xl border border-white/5 max-h-80 min-h-80">                  
                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Valutazione</p>
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-500/10 p-2 rounded-lg">
                                <GoStarFill className="text-yellow-400 text-xl" />
                            </div>
                            <span className="text-3xl font-black text-white">
                                {game.rating} <span className="text-sm text-gray-500 font-normal">/ 5</span>
                            </span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Generi</p>
                        <div className="flex flex-wrap gap-2">
                            {game.genres.map((genre) => (
                                <span 
                                    key={genre.id}
                                    className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium hover:bg-purple-500/20 hover:border-purple-500/40 transition-all cursor-default"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                        <div className="text-center">
                            <p className="text-[10px] uppercase text-gray-500">Metacritic</p>
                            <p className="text-lg font-bold text-green-400">{game.metacritic || 'N/A'}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] uppercase text-gray-500">Playtime</p>
                            <p className="text-lg font-bold text-blue-400">{game.playtime}h</p>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}
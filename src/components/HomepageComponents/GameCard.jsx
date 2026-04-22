import { Link } from "react-router"

export default function GameCard({game}){

    
    return(
        <>
        <Link to={`/detail/${game.id}`} className="group block my-3">
            <div className="relative h-70 w-full overflow-hidden rounded-3xl bg-[#1a1d23] shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-purple-500/20">
                <div style={{backgroundImage: `url(${game.background_image})`}} className="absolute inset-0 bg-cover bg-center transition-transform duration-700"/>
                    <div className=" bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t from-black/90 via-black/20 to-transparent">
                            <h2 className="font-black text-2xl text-white uppercase tracking-tighter font-title transition-transform duration-500 group-hover:-translate-y-2">
                                {game.name}
                            </h2>
                                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
                                    <div className="flex flex-col gap-2 pt-2 border-t border-white/10 mt-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Rilascio:</span>
                                            <span className="text-xs text-gray-300">{game.released || "TBA"}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {game.parent_platforms?.map(({platform}) => (
                                                <span key={platform.id} className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/10 uppercase font-bold">
                                                    {platform.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                        </div>

            </div>
        </Link>
        </>
    )
    
}   
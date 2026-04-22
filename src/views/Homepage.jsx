import { useLoaderData } from "react-router"
import { useSearchParams } from "react-router"
import GameList from "../components/HomepageComponents/GameList"

export default function Homepage(){

    const data = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get("page") || 1)
    const currentPage = Number(searchParams.get("page")) || 1;

     const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };
    return(
        <>
        <h1 className="text-3xl md:text-7xl sm:text-5xl lg:text-7xl font-black font-title uppercase tracking-tighter leading-none text-center w-full my-5">
                        Tutti i <span className="font-title text-accento">giochi</span>
        </h1>

            <GameList>
                {
                    data.results.map((game)=>{
                        return(
                            <GameList.Card key={game.id} game={game}/>
                        )
                    })
                }
            </GameList>
            
         <div className="flex flex-col items-center justify-center gap-4 mt-12 mb-10 px-4">
                <div className="flex items-center gap-3 sm:gap-6 w-full max-w-md justify-center">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={!data.previous}
                        className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-black uppercase transition-all text-sm sm:text-base
                            ${!data.previous 
                                ? "opacity-20 cursor-not-allowed border border-white/10" 
                                : "bg-white text-black hover:bg-purple-500 hover:text-white cursor-pointer active:scale-95"}`}
                    >
                        <span className="hidden sm:inline">← Precedente</span>
                        <span className="sm:hidden text-xl">←</span>
                    </button>

                  
                    <div className="flex flex-col items-center min-w-15">
                        <span className="text-[10px] font-bold text-purple-500 uppercase tracking-tighter">Pagina</span>
                        <span className="font-mono text-2xl font-black text-white">
                            {currentPage}
                        </span>
                    </div>

                   
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!data.next}
                        className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-xl font-black uppercase transition-all text-sm sm:text-base
                            ${!data.next 
                                ? "opacity-20 cursor-not-allowed border border-white/10" 
                                : "bg-white text-black hover:bg-purple-500 hover:text-white cursor-pointer active:scale-95"}`}
                    >
                        <span className="hidden sm:inline">Successiva →</span>
                        <span className="sm:hidden text-xl">→</span>
                    </button>
                </div>
    
            </div>
            
            

        </>
    )
}
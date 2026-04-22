import { useLoaderData, useParams } from "react-router"
import GameList from "../components/HomepageComponents/GameList"
export default function SearchPage(){
    
    const games = useLoaderData()
    const { slug } = useParams()

    return(
        <>
            <h1 className="text-3xl md:text-7xl sm:text-5xl lg:text-7xl font-black font-title uppercase tracking-tighter leading-none text-center w-full mt-5">RISULTATI PER: <span className="font-title text-accento p-1">{slug}</span> </h1>
            <p className="flex text-sm justify-center font-inter italic uppercase">{games.length} risultati</p>

            <GameList>
                {games.map((game)=>{
                    
                    return (
                        <>
                            <GameList.Card key={game.id} game={game}/>
                        </>
                    )
                })}
            </GameList>
        </>
    )
}
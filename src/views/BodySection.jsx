import { FaRegHeart } from "react-icons/fa"
import { useEffect, useState } from "react";
import {FaHeart} from "react-icons/fa";
import { supabase } from "../database/supabase";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
export default function BodySection({game, profile_id}){

    const [isFavourite, setIsFavourite] = useState(false);
    const [description, setDescription] = useState();
    const [gameReviews, setGameReviews] = useState();
    const [checkReview, setCheckReview] = useState(false);

    
    const handle_description = (e)=>{
        setDescription(e.target.value);
    }

    const get_reviews = async ()=>{
        let { data: reviews, error } = await supabase.from("reviews").select("*, profiles(username)").eq("game_id", game.id);
        setGameReviews(reviews);
    }

    const add_review = async ()=>{
        const { data, error } = await supabase.from("reviews").upsert([{profile_id, game_id: game.id, game_name: game.name, description}]).select();
        setDescription("");
        setCheckReview(!checkReview);
    }

    const get_favourite = async ()=> {
        let { data: favourites, error } = await supabase.from('favourites').select('*').eq("profile_id", profile_id).eq("game_id", game.id);
        if(favourites.length > 0) setIsFavourite(true);
    }

    useEffect(() => {
        get_favourite();
        get_reviews();
    }, [checkReview]);

    const add_game = async ()=>{
        
        const { data, error } = await supabase.from('favourites').insert([{profile_id, game_id: game.id, game_name: game.name}]).select()
        setIsFavourite(true);
          
    }
    const remove_game = async ()=>{
        const { error } = await supabase.from('favourites').delete().eq("profile_id", profile_id).eq("game_id", game.id);
        setIsFavourite(false)
    }


    return(
        <>
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-16 px-4 md:px-0">
    
                <div className="lg:col-span-3 space-y-10">
                    
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h3 className="text-xl font-bold tracking-tight text-white uppercase">
                            Recensioni della Community
                        </h3>
                        <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                            {gameReviews?.length || 0} COMMENTI
                        </span>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-xl">
                        <textarea 
                            placeholder="Cosa ne pensi di questo titolo? La tua opinione conta..." 
                            className="w-full bg-transparent border-none focus:ring-0 text-gray-200 placeholder:text-gray-600 resize-none text-lg min-h-30" 
                            onChange={handle_description} 
                            value={description}
                        />
                        <div className="flex justify-end mt-4">
                            <button 
                                className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 active:scale-95 cursor-pointer" 
                                onClick={add_review}
                            >
                                Pubblica
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6 max-h-150 overflow-y-auto pr-4 custom-scrollbar">
                        {gameReviews && gameReviews.map( (review) => (
                            <div 
                                key={review.id} 
                                className="group bg-white/2 hover:bg-white/5 border border-white/5 p-6 rounded-2xl transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold shadow-lg">
                                            {review.profiles?.username?.substring(0, 1).toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-100 leading-none">
                                                {review.profiles?.username}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-gray-400 leading-relaxed italic pl-1">
                                    "{review.description}"
                                </p>
                            </div>
                        ))}

                        {(!gameReviews || gameReviews.length === 0) && (
                            <p className="text-center text-gray-600 py-10 italic">Nessuna recensione.</p>
                        )}
                    </div>
                </div>

            
                <div className="lg:col-span-1">
                    <div className="sticky top-30 bg-linear-to-b from-white/5 to-transparent p-8 rounded-3xl border border-white/10 text-center">                        
                        <div className="flex flex-col items-center gap-4">
                            <div 
                                onClick={isFavourite ? remove_game : add_game}
                                className={`cursor-pointer p-5 rounded-full transition-all duration-500 ${
                                    isFavourite 
                                    ? "bg-red-500/20]" 
                                    : "bg-white/5 text-gray-400"
                                }`}
                            >
                                {isFavourite ? (
                                    <FaHeart className="text-4xl" />
                                ) : (
                                    <FaRegHeart className="text-4xl" />
                                )}
                            </div>
                            <span className="text-sm font-medium text-gray-300">
                                {isFavourite ? "Salvato nei preferiti" : "Aggiungi ai preferiti"}
                            </span>
                        </div>
                    </div>
                </div>
</div>
        </>
    )
}
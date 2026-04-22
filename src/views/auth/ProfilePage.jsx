import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import defaultImage from '../../assets/defaultImage.png';
import routename from "../../routing/routename";
import { Link } from "react-router";
import { supabase } from "../../database/supabase";
import { FaUserGear, FaHeart, FaGamepad, FaEnvelope } from "react-icons/fa6";

export default function ProfilePage() {
    const { user, profile, avatarUrl } = useContext(UserContext);
    const [userFavourites, setUserFavourites] = useState([]);

    const get_favourites = async () => {
        if (profile) {
            let { data: favourites } = await supabase
                .from('favourites')
                .select('*')
                .eq("profile_id", profile.id);
            setUserFavourites(favourites);
        }
    };

    useEffect(() => {
        get_favourites();
    }, [profile]);

    return (
        <div className="min-h-screen bg-[#0f1115] text-white py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {user && profile && (
                    <>
                        <header className="flex flex-col md:flex-row items-center gap-8 bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-md">
                            <div className="relative group">
                                <img src={avatarUrl ?? defaultImage} alt="Avatar" className="relative w-40 h-40 rounded-full object-cover"/>
                            </div>
                            
                            <div className="text-center md:text-left space-y-2">
                                <h1 className="text-5xl font-black font-title tracking-tighter">
                                    {profile.username}
                                </h1>
                            </div>

                            <div className="md:ml-auto">
                                <Link 
                                    to={routename.profile_settings} 
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95"
                                >
                                    <FaUserGear /> Impostazioni
                                </Link>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-1">
                                <div className="flex items-center gap-2 text-gray-500 mb-2 text-xs uppercase font-bold tracking-widest">
                                    <FaGamepad className="text-purple-500" /> Nome Completo
                                </div>
                                <p className="text-xl font-bold">{profile.first_name} {profile.last_name}</p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-1">
                                <div className="flex items-center gap-2 text-gray-500 mb-2 text-xs uppercase font-bold tracking-widest">
                                    <FaEnvelope className="text-blue-500" /> Email Account
                                </div>
                                <p className="text-xl font-bold truncate">{user.email}</p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-1 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mb-2 text-xs uppercase font-bold tracking-widest">
                                    <FaHeart className="text-red-500" /> Preferiti
                                </div>
                                <p className="text-4xl font-black text-white">{userFavourites.length}</p>
                            </div>
                        </div>
                    </>
                )}

                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-black uppercase tracking-tight">La tua Libreria</h2>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {userFavourites.length > 0 ? (
                            userFavourites.map((game) => (
                                <div 
                                    key={game.id} 
                                    className="group relative bg-[#1a1d23] hover:bg-purple-600 border border-white/5 p-6 rounded-3xl transition-all duration-500 transform hover:-translate-y-2 cursor-default shadow-xl"
                                >
                                    <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/40 transition-colors">
                                        <FaGamepad size={24} />
                                    </div>
                                    <h2 className="text-lg font-bold group-hover:text-white transition-colors mt-8">
                                        {game.game_name}
                                    </h2>
                                    <p className="text-xs text-gray-500 group-hover:text-purple-200 uppercase tracking-widest mt-2 font-bold">
                                        Action / RPG
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white/5 rounded-4xl border border-dashed border-white/10">
                                <p className="text-gray-500 italic">Nessun gioco tra i preferiti.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
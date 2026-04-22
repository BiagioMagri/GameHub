import { useLoaderData, useNavigate } from "react-router"
import { FaCircleArrowLeft } from "react-icons/fa6"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import Header from "../components/Header"
import BodySection from "./BodySection"
import Footer from "../components/Footer"
import { Link } from "react-router"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Scrollbar, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Navbar from "../components/Navbar"

export default function DetailPage() {
    const { game, screenshots } = useLoaderData()
    const navigate = useNavigate()
    const { profile } = useContext(UserContext)
    return (
     <>
        <Navbar />

        <div className="min-h-screen bg-[#0f1115] text-white selection:bg-purple-500/30">
            <div className="relative h-[80vh] w-full overflow-hidden"> 
                <div  className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url(${game.background_image})` }}></div>

                <div className="absolute inset-0 bg-linear-to-t from-[#0f1115] via-[#0f1115]/40 to-transparent" />

               
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start justify-end h-full">
                    <button 
                        onClick={() => navigate(-1)}
                        className="mb-6 flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition-all group"
                    >
                        <FaCircleArrowLeft className="text-2xl group-hover:-translate-x-1 transition-transform" />
                        <span className=" cursor-pointer text-sm uppercase tracking-widest font-medium">Torna indietro</span>
                    </button>
                    
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter max-w-4xl leading-none">
                        {game.name}
                    </h1>
                </div>
            </div>

            
            <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">                    
                    <div className="lg:col-span-8 space-y-12">

                        <section className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
                            <Header game={game} />
                            <div className="mt-8 pt-8 border-t border-white/10">
                                {profile && <BodySection game={game} profile_id={profile.id} />
                                ||
                                    <>
                                        <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black uppercase font-title text-white tracking-tight">
                                                    Vuoi salvare questo gioco?
                                                </h3>
                                                <p className="text-gray-400 text-sm uppercase tracking-widest">
                                                    Effettua l'accesso
                                                </p>
                                            </div>

                                            <Link 
                                                to="/auth/login" 
                                                className="group relative inline-flex items-center justify-center px-8 py-4 font-black uppercase font-title tracking-tighter text-black bg-white rounded-xl transition-all duration-300 hover:bg-purple-600 hover:text-white hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-purple-500/40"
                                            >
                                                Accedi a GameHub
                                            </Link>
                                            
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                                Non hai un account? <Link to="/auth/register" className="text-purple-400 hover:underline">Registrati ora</Link>
                                            </p>
                                        </div>
                                    </>
                                }
                            </div>
                        </section>

                        
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold tracking-tight">Galleria Screenshot</h2>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                grabCursor={true}
                                keyboard={{ enabled: true }}
                                breakpoints={{
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 2.2 },
                                }}
                                pagination={{ clickable: true }}
                                navigation={true}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]}
                                className="rounded-2xl overflow-hidden pb-12 shadow-2xl"
                            >
                                {screenshots.map((screenshot) => (
                                    <SwiperSlide key={screenshot.id}>
                                        <div className="aspect-video overflow-hidden rounded-xl border border-white/5 bg-white/5">
                                            <img src={screenshot.image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                                                alt="Game screenshot" 
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    </div>               
                    <aside className="lg:col-span-4 space-y-8">                      
                        <div className="sticky top-30 bg-linear-to-br from-purple-900/20 to-blue-900/20 border border-white/10 p-6 rounded-3xl">
                            <h3 className="font-bold text-lg mb-4">Informazioni Rapide</h3>
                            <div className="space-y-4 text-sm text-gray-400">
                                <p><span className="text-white font-medium">Uscita:</span> {game.released}</p>
                                <p><span className="text-white font-medium">Genere:</span> {game.genres?.map(g => g.name).join(', ')}</p>
                                <p><span className="text-white font-medium">Piattaforme:</span> {game.platforms?.map(p => p.platform.name).join(', ')}</p>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    </>    
    )
}
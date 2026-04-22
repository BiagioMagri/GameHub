import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useForm } from "react-hook-form"
import routes from "../../routing/routes"
import { useNavigate } from "react-router"
import { supabase } from "../../database/supabase"
import defaultImage from '../../assets/defaultImage.png' 
import { MdCancel } from "react-icons/md";
import { FaUserGear, FaCloudArrowUp, FaPalette, FaAt, FaFloppyDisk } from "react-icons/fa6"

export default function ProfilePageSettings() {
    const [file, setFile] = useState()
    const [preview, setPreview] = useState()
    const { profile, getUser, updateProfile, avatarUrl } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFile(() => e.target.files[0]);
    }

    useEffect(() => {
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreview(() => imageUrl)
        }
    }, [file])

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        const fileExt = file.name.split(".").pop()
        const fileName = `${profile.id}${Math.random()}.${fileExt}`;
        await supabase.storage.from("avatars").upload(fileName, file);
        await supabase.from("profiles").upsert({ id: profile.id, avatar_url: fileName });
        await getUser();
    }

    const onSubmit = async (data) => {
        updateProfile(data)
        navigate(routes.profile)
    }


    return (
        <div className="min-h-screen bg-[#0f1115] text-white py-20 px-6">
            <div className="max-w-6xl mx-auto space-y-16">
                

                <header className="flex items-center gap-6 border-b border-white/10 pb-10">
                    <div className="bg-purple-600/10 p-5 rounded-3xl border border-purple-500/20 shadow-lg shadow-purple-500/10">
                        <FaUserGear className="text-4xl text-purple-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter font-title text-white">
                            Impostazioni Account
                        </h1>
                      
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    

                    <div className="lg:col-span-4 space-y-8 top-20 h-max">
                        <h2 className="text-2xl font-black font-title uppercase tracking-tight flex items-center gap-3">
                            <FaPalette className="text-purple-400" /> Cambia immagine
                        </h2>
                        
                        <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 flex flex-col items-center text-center shadow-2xl ">
                            <div className="relative group mb-8">
                                <div className="absolute -inset-1 bg-linear-to-tr rounded-full blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
                                <img src={preview || avatarUrl || defaultImage}alt="Preview" className="relative w-44 h-44 rounded-full object-cover border-4 border-[#0f1115] shadow-inner" 
                                />
                            </div>
                            
                            <form onSubmit={handleAvatarSubmit} className="w-full space-y-4">
                                <label className="block w-full">
                                    <span className="sr-only">Scegli foto</span>
                                    <input type="file" onChange={handleChange} className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-6
                                            file:rounded-full file:border-0
                                            file:text-xs file:font-black file:uppercase
                                            file:bg-purple-600 file:text-white
                                            hover:file:bg-purple-500 file:cursor-pointer file:transition-all"
                                    />
                                </label>
                                <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3.5 rounded-2xl font-bold text-sm cursor-pointer transition-all active:scale-95 disabled:opacity-20" disabled={!file}>
                                  Aggiorna immagine
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-8">
                        <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                            <FaAt className="text-blue-400" /> Dati Personali
                        </h2>

                        <form 
                            className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-md space-y-10" 
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Nome Completo</label>
                                    <input type="text" placeholder={profile.first_name} className="w-full bg-[#0f1115] border border-white/10 rounded-2xl px-6 py-4.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-700" 
                                        {...register("first_name", { required: "Campo obbligatorio" })} 
                                    />
                                    {errors.first_name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.first_name.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Cognome</label>
                                    <input type="text" placeholder={profile.last_name} className="w-full bg-[#0f1115] border border-white/10 rounded-2xl px-6 py-4.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-700" 
                                        {...register("last_name", { required: "Campo obbligatorio" })} 
                                    />
                                    {errors.last_name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.last_name.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Username Unico della Community</label>
                                <input type="text" placeholder={profile.username} className="w-full bg-[#0f1115] border border-white/10 rounded-2xl px-6 py-4.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-700 font-mono text-purple-400" 
                                    {...register("username", { required: "Campo obbligatorio" })} 
                                    />
                                {errors.username && <p className="text-red-500 text-xs mt-1 ml-1">{errors.username.message}</p>}
                            </div>

                            <div className="pt-6">
                                <button className="sm:w-100 md:w-200 lg:w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 text-white p-5 rounded-3xl font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] cursor-pointer">
                                    <FaFloppyDisk /> Salva Modifiche del Profilo
                                </button>
                            </div>
                        </form>

                        <button className="w-full flex items-center justify-center gap-3 border border-white/10 hover:border-white text-white py-5 rounded-3xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] cursor-pointer" type="button" onClick={ ()=>{ navigate(-1) } }>
                            <MdCancel /> Annulla
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
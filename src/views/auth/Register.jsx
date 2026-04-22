import { useForm } from "react-hook-form"
import { useNavigate } from "react-router";
import {supabase} from "../../database/supabase";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router";
import routename from "../../routing/routename";

export default function Register(){

    const {register, handleSubmit, formState: {errors}} = useForm();

    const { signUp } = useContext(UserContext)

    const navigate = useNavigate();

    const onSubmit = async (user_data) => {

        await signUp({
            email: user_data.email,
            password: user_data.password,
            options: {
                data: {
                    first_name: user_data.first_name,
                    last_name: user_data.last_name,
                    username: user_data.username
                }
            }
        })
     

        navigate('/')

    }

    return(
        <>

           <div className="min-h-screen bg-[#0f1115] flex flex-col justify-center items-center px-6 relative overflow-hidden py-20">
               
                <div className="mb-10 text-center relative z-10">
                    <h1 className="text-5xl font-black uppercase tracking-tighter font-title text-white">
                    Registrati
                    </h1>
                </div>

                
                <div className="w-full max-w-2xl bg-white/2 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] shadow-2xl relative z-10">
                    
                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        
                
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Nome</label>
                                <input type="text" className="w-full bg-black/30 border border-white/5 rounded-2xl px-6 py-4.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                                    placeholder="Mario" 
                                    {...register("first_name", {required: "Questo campo è obbligatorio"})} 
                                />
                                {errors.first_name && <p role="alert" className="text-red-500 text-xs ml-2 italic">{errors.first_name.message}</p>}
                            </div>

                        
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Cognome</label>
                                <input type="text" className="w-full bg-black/30 border border-white/5 rounded-2xl px-6 py-4.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                                    placeholder="Rossi" 
                                    {...register("last_name", {required: "Questo campo è obbligatorio"})}
                                />
                                {errors.last_name && <p role="alert" className="text-red-500 text-xs ml-2 italic">{errors.last_name.message}</p>}
                            </div>
                        </div>

                    
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Username</label>
                            <div className="relative flex items-center">
                                <input type="text" className="w-full bg-black/30 border border-white/5 rounded-2xl pl-5 pr-6 py-4.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700 font-mono text-purple-400"  
                                    {...register("username", {required: "Questo campo è obbligatorio"})} 
                                />
                            </div>
                            {errors.username && <p role="alert" className="text-red-500 text-xs ml-2 italic">{errors.username.message}</p>}
                        </div>

                
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Email</label>
                            <input type="email" placeholder="name@email.it" className="w-full bg-black/30 border border-white/5 rounded-2xl px-6 py-4.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                                {...register("email", {required: "Questo campo è obbligatorio"})}
                            />
                            {errors.email && <p role="alert" className="text-red-500 text-xs ml-2 italic">{errors.email.message}</p>}
                        </div>

                
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Password</label>
                            <input type="password" className="w-full bg-black/30 border border-white/5 rounded-2xl px-6 py-4.5 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                                placeholder="••••••••" 
                                {...register("password", {required: "Questo campo è obbligatorio", minLength: 8})} 
                            />
                            {errors.password && <p role="alert" className="text-red-500 text-xs ml-2 italic">{errors.password.message}</p>}
                        </div>


                        <div className="pt-6">
                            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] active:scale-[0.98] cursor-pointer">
                                Registrati
                            </button>
                        </div>
                    </form>

            
                    <div className="mt-12 text-center border-t border-white/5 pt-8">
                        <p className="text-gray-600 text-xs font-medium">
                            Hai già un account? <br />
                            <Link to={routename.login} className="text-purple-400 hover:text-purple-300 font-bold uppercase tracking-tighter text-sm mt-1 inline-block">Vai al Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
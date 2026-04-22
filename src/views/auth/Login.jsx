import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useForm } from "react-hook-form"
import { data } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import routename from "../../routing/routename";
export default function Login(){

    const {register, handleSubmit, formState: {errors}} = useForm();

    const navigate = useNavigate()

    const { login } = useContext(UserContext)

    const onSubmit = async (user_data)=>{
        await login({
            email: user_data.email,
            password: user_data.password
        });
        navigate('/');
    }
    return(
        <>
            <div className="min-h-screen bg-[#0f1115] flex flex-col justify-center items-center px-6 relative overflow-hidden">
               
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-black font-title uppercase tracking-tighter text-white">
                        Bentornato
                    </h1>
                </div>

              
                <div className="w-full max-w-md bg-white/3 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative z-10">
                    
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Email</label>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    className="w-full bg-black/20 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                                    placeholder="nome@esempio.it" 
                                    {...register("email", {required: "L'email è obbligatoria"})}
                                />
                            </div>
                            {errors.email && <p role="alert" className="text-red-500 text-xs ml-2 italic">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">Chiave d'accesso</label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    className="w-full bg-black/20 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                                    placeholder="••••••••" 
                                    {...register("password", {required: "La password è obbligatoria", minLength: 8})} 
                                />
                            </div>
                            {errors.password && <p role="alert" className="text-red-500 text-xs ml-2 italic">{errors.password.message}</p>}
                        </div>
                       

                        <div className="pt-4">
                            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-[0.98] cursor-pointer">
                                Accedi
                            </button>
                        </div>
                    </form>

                    {/* Footer della Card */}
                    <div className="mt-10 text-center">
                        <p className="text-gray-500 text-xs font-medium">
                            Non hai un account? <br />
                            <Link to={routename.register} className="text-purple-400 hover:text-purple-300 font-bold uppercase tracking-tighter">Registrati ora</Link>
                        </p>
                    </div>
                </div>
            </div>        
        </>
    )
}
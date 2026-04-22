import { useNavigate } from "react-router";
import { IoHomeOutline } from "react-icons/io5";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center min-h-[70vh] text-center p-10">
      <h1 className="text-9xl font-black font-title tracking-tighter text-accento">
        404
      </h1>
      
      <div className="mt-4 space-y-2">
        <h2 className="text-4xl font-black uppercase">
          Pagina non trovata
        </h2>
        <p className="text-gray-500 font-mono tracking-widest text-sm uppercase">
          Che ci fai qui?
        </p>
      </div>

      <button onClick={() => navigate("/")} className=" mt-10 sm:w-100 md:w-1/4 lg:w-1/4 flex items-center justify-center gap-3 bg-purple-600 hover:bg-accento text-white p-5 rounded-3xl font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] cursor-pointer">
        <IoHomeOutline /> Torna alla Homepage
      </button>     
    </div>
  );
}
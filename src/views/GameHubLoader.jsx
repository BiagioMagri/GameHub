import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GameHubLoader({ onFinished }) {
  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartExit(true);
      setTimeout(onFinished, 800); 
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className={`fixed inset-0 z-999 bg-[#050505] flex items-center justify-center transition-opacity duration-700 ${startExit ? "opacity-0" : "opacity-100"}`}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-8xl font-black italic text-transparent bg-clip-text bg-linear-to-br from-purple-500 to-fuchsia-600 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        >
          GH
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white text-2xl font-black tracking-[0.4em] mt-4 uppercase italic">GameHub</motion.h1>

        <div className="w-48 h-px bg-white/10 mx-auto mt-6 overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-full h-full bg-linear-to-r from-transparent via-purple-500 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
import { useLenis } from "lenis/react";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function GoTop(){
    const [isVisible, setIsVisible] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { lerp: 0.1 });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    return(
        <>
        <button onClick={scrollToTop} className={`fixed bottom-8 right-8 z-99 p-3 rounded-2xl bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-white/20 transition-all duration-500 transform hover:scale-110 hover:bg-purple-500 cursor-pointer
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
                aria-label="Torna su"
            >
                <FaArrowUp size={20} />
        </button>
        </>
    )
}
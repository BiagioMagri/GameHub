import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
export default function Footer(){
    return(
        <>
            <footer className="footer sm:footer-horizontal footer-center bg-primario text-base-content p-4 justify-center items-center w-full border-t border-white/20">
                <aside>
                    <p className="">Developed by Biagio Magri - Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                
                <div className="flex justify-center items-center gap-4">
                    <a href="https://github.com/BiagioMagri" target="_blank" className="text-4xl hover:scale-120 transition ease-in-out"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/biagio-magri-fsdev/" target="_blank" className="text-4xl hover:scale-120 transition ease-in-out"><CiLinkedin /></a>
                </div>
                
            </footer>
        </>
    )
}
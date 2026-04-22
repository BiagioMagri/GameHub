import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router";
import routename from "../routing/routename";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { CiUser } from "react-icons/ci";
import defaultImage from '../assets/defaultImage.png'
import logo from '../assets/logo.png'
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";

export default function Navbar(){

    const [slug, setSlug] = useState()
    
    const redirect = useNavigate()


    const {avatarUrl} = useContext(UserContext)

    const handle_change = async (e)=>{
        // setSlug(e.target.value)
        // if(slug) redirect(`/search/${slug}`)
        // if(!slug) redirect(routename.home)
        const value = e.target.value
        setSlug(value)
        if (value) redirect(`/search/${value}`)
        else redirect(routename.home)
    }

    const {user, signOut} = useContext(UserContext)

    const handleLogout = async ()=> {
        await redirect('/');
        signOut();
    }

    return(
        <>
            <div className="navbar shadow-sm bg-primario w-full sticky top-0 z-30 border-b border-white/20">
                <div className="flex-1 navbar-start">
                    <Link className="rounded-full transition ease-in-out transform hover:scale-110" to={routename.home}>
                        <img src={logo}/>
                    </Link>
                </div>
                
                <div className="flex navbar-end gap-2">
                    <input type="text" placeholder="Cerca giochi..." onChange={handle_change} className="bg-surface text-text placeholder-muted px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-accento hover:ring-accento hover:ring-2 transition ease-in-out" />
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar active:bg-accento hover:border-accento hover:border-2">
                            {user && 
                                <>
                                    <div className="w-10 rounded-full">
                                        <img alt="Profilo" src={avatarUrl ?? defaultImage} />
                                    </div>
                                </>
                                ||
                                <>
                                    <CiUser className="text-2xl" />
                                </>

                            }
                        </div>
                        <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-primario rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {!user && 
                            <>
                                <li>
                                    <Link to={routename.register} className="text-lg text-inter"><FiUserPlus />Registrati </Link>
                                </li>
                                <li>
                                    <Link to={routename.login} className="text-lg text-inter ps-1"><CiLogin />Accedi </Link>
                                </li>
                            </>
                            ||
                            <>
                                <li>
                                    <Link to={routename.profile} className="text-lg"><FaUser className="text-sm"/> Profilo </Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <a className="text-lg p-1.5"> <CiLogout className="text-md"/> Logout</a>
                                </li>
                            </>
                            }  
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

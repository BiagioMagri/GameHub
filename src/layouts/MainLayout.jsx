import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import { useLoaderData } from "react-router"
import GoTop from "../components/GoTop"
export default function MainLayout(){

    const genres = useLoaderData();

    return(
        <>
            <Navbar />
            <Sidebar genres={genres} />
            <Outlet />
            <GoTop />
            <Footer />
        </>
    )
}
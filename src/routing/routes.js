import { createBrowserRouter } from "react-router";
import { gameDetail, getGamesHomepage } from "./loaders";
import { searchGames } from "./loaders";
import { allGenres } from "./loaders";
import { searchByGenres } from "./loaders";
import Homepage from "../views/Homepage";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import routename from "./routename";
import SearchPage from "../views/SearchPage";
import SearchByGenre from "../views/SearchByGenre";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import ProfilePage from "../views/auth/ProfilePage";
import ProfilePageSettings from "../views/auth/ProfilePageSettings";
import DetailPage from "../views/DetailPage";
import ErrorPage from "../components/ErrorPage";


const routes = createBrowserRouter([
    {
        path: routename.home,
        Component: MainLayout,
        loader: allGenres,
        children:[
            {
                index: true,
                Component: Homepage,
                loader: getGamesHomepage
            },
            {
                path: routename.search,
                Component: SearchPage,
                loader: searchGames
            },
            {
                path: routename.genre,
                Component: SearchByGenre,
                loader: searchByGenres
            },
            {
                path: "*",
                Component: ErrorPage
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children:[
            {
                path: routename.register,
                Component: Register,
            },
            {
                path: routename.login,
                Component: Login,
            },
            {
                path: routename.profile,
                Component: ProfilePage,
            },
            {
                path: routename.profile_settings,
                Component: ProfilePageSettings,
            },
        ]
    },
    {
        path: routename.detail,
        Component: DetailPage,
        loader: gameDetail
    },
])

export default routes
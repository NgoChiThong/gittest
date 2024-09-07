import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../view/Home";
import Movie from "../view/Movie";
import SignIn from "../view/SignIn";
import About from "../view/About";
import Booking from "../view/Booking";
import MovieDetail from "../view/MovieDetail";
import Contact from "../view/Contact";
import User from "../view/User";


export const webRouter=createBrowserRouter([{
    path:'/',
    element:<App/>,
    children:[{
        path:'/',
        element: <Home/>
    },
        {
            path: '/home',
            element: <Home/>
        },
        {
            path: '/booking',
            element: <Booking/>
        },
        {
            path: '/movies',
            element: <Movie/>
        },
        {
            path: '/signin',
            element: <SignIn/>
        },
        {
            path: '/about',
            element: <About/>
        },
        // {
        //     path: '/booking',
        //     element: <Booking/>
        // },
        {
            path: '/detail',
            element: <MovieDetail/>
        },
        {
            path: '/contact',
            element: <Contact/>
        },
        {
            path: '/user',
            element: <User/>
        },
        {
            path: '/detail/:id',
            element: <MovieDetail/>
        },
        {
            path: '/booking/:id',
            element: <Booking/>
        }

    ]
}]);

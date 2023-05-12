import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import "./App.css"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Navbar from "./components/Navbar/Navbar"
import Landing from "./components/LandingPage/Landing";
import Error from "./pages/Error/Error";


//every page will have the navbar, and then something else will be rendered based on the route
const Layout = () =>{
  return (
    <div className="md:w-8/12 mx-auto">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

//a landing page that gives a description of the app
const LandingPage = () =>{
  return (
    <div>
      <Landing/>
      <Outlet/>
    </div>
  )
}

//these are the different routes that can be displayed
const router = createBrowserRouter([
  //this is the landing page 
  {
    path: "/",
    errorElement: <Error/>,
    element: <LandingPage/>,
    children: [
      {
        path:"/",
      },
    ]
  },
  //these will all have the navbar above them
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/profile/:id",
        element: <Profile/>
      },
      {
        path: "/explore",
        element: <Explore/>
     },    
    ],
  },
  
]);

function App() {
  return (
    <div className="h-screen">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

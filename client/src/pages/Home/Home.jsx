import React from "react"
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar"
import RightSideBar from "../../components/RightSideBar/RightSideBar"
import MainSpeech from "../../components/MainSpeech/MainSpeech"
import { useSelector } from "react-redux"
import { useNavigate, Navigate } from "react-router-dom"

//home page
const Home = () =>{
    //get the current user from login
    const { currentUser } = useSelector((state) => state.user)
    return (
        <>{
            //if there is no user then redirect to landing page
            !currentUser ? ( 
                <Navigate to="/"/>
            ) : (
            //otherwise show the home page
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="px-6">
                    {/* <div className="position fixed"> */}
                        <LeftSideBar/>
                    {/* </div> */}
                    
                </div>
                <div className="col-span-2 border-x-2 border-emerald-100 px-6">
                    <MainSpeech/>
                </div>
                <div className="px-6">
                    <RightSideBar/>  
                </div>
            </div>
       )}</>
    )  
}

export default Home
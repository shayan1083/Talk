import React from "react"
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar"
import RightSideBar from "../../components/RightSideBar/RightSideBar"
import MainSpeech from "../../components/MainSpeech/MainSpeech"

const Home = () =>{
    return (
    <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
            <LeftSideBar/>
        </div>
        <div className="col-span-2 border-x-2 border-emerald-100 px-6">
            <MainSpeech/>
        </div>
        <div className="px-6">
            <RightSideBar/>
        </div>

    </div>
    )  
}

export default Home
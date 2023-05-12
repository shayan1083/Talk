import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar"
import RightSideBar from "../../components/RightSideBar/RightSideBar"


const Explore = () =>{
    return (
        <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="px-6">
                <LeftSideBar/>
            </div>
            <div className="col-span-2 border-x-2 border-emerald-100 px-6">
                Explore
            </div>
            <div className="px-6">
                <RightSideBar/>
            </div>
    
        </div>
        )  
}

export default Explore
import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar"
import RightSideBar from "../../components/RightSideBar/RightSideBar"
import {Link} from "react-router-dom"

const Profile = () =>{
    return (
        <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="px-6">
                <LeftSideBar/>
            </div>
            <div className="col-span-2 border-x-2 border-emerald-100 px-6">      
                <div className="flex justify-between">
                    <div>
                        <p className="font-bold">Username</p>
                        <p className="font-bold">@Username</p>
                    </div>
                    <div>
                        <Link to="/">
                            <button className="bg-red-500 px-4 py-2 text-white rounded-lg">Logout</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="px-6">
                <RightSideBar/>
            </div>
        </div>
    )
}

export default Profile
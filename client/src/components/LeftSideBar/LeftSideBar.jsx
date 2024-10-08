import React from "react";
import {Link} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";

const LeftSideBar = () => {
    const {currentUser} = useSelector((state)=>state.user)
    return (
        <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
            <div className="mt-6 flex flex-col space-y-4">
                <Link to="/talk/home">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-200 hover:bg-emerald-300 rounded-lg cursor-pointer">
                        <HomeIcon fontSize="large"/>
                        <p className="visible lg:visible md:invisible sm:invisible">Home</p>
                    </div>
                </Link>
                <Link to="/talk/explore">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-200 hover:bg-emerald-300 rounded-lg cursor-pointer">
                        <TagIcon fontSize="large"/>
                        <p className="visible lg:visible md:invisible sm:invisible">Explore</p>
                    </div>
                </Link>
                <Link to={`/talk/profile/${currentUser.userData._id}`}>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-200 hover:bg-emerald-300 rounded-lg cursor-pointer">
                        <PersonIcon fontSize="large"/>
                        <p className="visible lg:visible md:invisible sm:invisible">My Profile</p>
                    </div>
                </Link>
                <div className="text-center bg-slate-200 rounded-lg p-2">
                    <p>{currentUser.userData.fname} {currentUser.userData.lname}</p>
                    <p>@{currentUser.userData.username}</p>
                </div>
                
            </div>
        </div>
    )
}

export default LeftSideBar
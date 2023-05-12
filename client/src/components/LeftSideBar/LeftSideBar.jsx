import React from "react";
import {Link} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';


const LeftSideBar = () => {
    return (
        <div className="flex flex-col h-full md:h-[90vh] justify-between mr-6">
            <div className="mt-6 flex flex-col space-y-4">
                <Link to="/home">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-200 hover:bg-emerald-300 rounded-lg cursor-pointer">
                        <HomeIcon fontSize="large"/>
                        <p>Home</p>
                    </div>
                </Link>
                <Link to="/explore">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-200 hover:bg-emerald-300 rounded-lg cursor-pointer">
                        <TagIcon fontSize="large"/>
                        <p>Explore</p>
                    </div>
                </Link>
                <Link to="/profile/id">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-emerald-200 hover:bg-emerald-300 rounded-lg cursor-pointer">
                        <PersonIcon fontSize="large"/>
                        <p>My Profile</p>
                    </div>
                </Link>
            </div>
            
        </div>
    )
}

export default LeftSideBar
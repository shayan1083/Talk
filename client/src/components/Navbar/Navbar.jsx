import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useLocation } from 'react-router-dom';
import UserPlaceholder from '../UserPlaceholder/UserPlaceholder';
const Navbar = () =>{

    const [userData,setUserData]=useState(null)
    const location = useLocation().pathname
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center">
            <div className="visible lg:visible md:visible sm:invisible mx-auto md:mx-0 my-4">
                {/* app logo */}
                <img 
                    src="/talk.png" 
                    alt="Talk Logo" 
                    width={"80px"} 
                    className="ml-8"
                />
            </div>

            <div className="col-span-2 md:border-x-2 md:border-emerald-100 md:px-6 my-6 md:my-0">
                <div className="flex justify-between items-center my-4">        
                    <h2 className="font-bold text-2xl">
                    {location.includes("profile") ? (
                        <UserPlaceholder setUserData={setUserData} userData={userData}/>
                    ): location.includes("home") ? ("Home") : ("Explore")}
                    </h2>
                </div>
            </div>

            <div className="md:px-6 my-4">
                <SearchIcon className="absolute mx-2 my-2"/>
                <input type="text" placeholder="Search" className="bg-emerald-200 rounded-lg py-2 placeholder:px-8 w-fit"></input>
            </div>
        </div>
    )
}
export default Navbar
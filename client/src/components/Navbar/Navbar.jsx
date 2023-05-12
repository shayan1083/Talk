import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const Navbar = () =>{
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center">
            <div className="mx-auto md:mx-0 my-4">
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
                    <h2 className="font-bold text-2xl">Home</h2>
                    <StarBorderIcon/>
                </div>
            </div>

            <div className="px-0 md:px-6 mx0-auto my-4">
                <SearchIcon className="absolute m-2"/>
                <input type="text" placeHolder="Search" className="bg-emerald-200 rounded-lg py-2 px-8"></input>
            </div>
        </div>
    )
}
export default Navbar
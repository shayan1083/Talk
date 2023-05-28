import React, {useState,useEffect}from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar"
import RightSideBar from "../../components/RightSideBar/RightSideBar"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import Speech from "../../components/Speech/Speech";
import EditProfile from "../../components/EditProfile/EditProfile";

//profile page
const Profile = () =>{

    //edit profile modal
    const [open, setOpen] = useState(false)

    //variables for user speeches and their profile
    const [userSpeeches, setUserSpeeches] = useState(null)
    const [userProfile, setUserProfile] = useState(null)

    //the users id from the url
    const {id} = useParams()
    //the current user
    const {currentUser} = useSelector((state) => state.user)

    //logout button function
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

    useEffect(()=>{
        //get the user profile data
        const fetchData = async() =>{
            try{
                //get all the user speeches
                const speeches = await axios.get(`/speeches/${id}`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('key')}`
                    }
                })
                //get the users profile
                const profile = await axios.get(`/users/${id}`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('key')}`
                    }
                })
                setUserSpeeches(speeches.data)
                setUserProfile(profile.data)
            }catch(err){
                console.log("error:", err)
            }
        }
        fetchData()
        //reset if any of these change
    },[currentUser, currentUser.userData._id,id])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4">
                {/* left side bar */}
                <div className="px-6">
                    <LeftSideBar/>
                </div>
                {/* middle part of page, where profile is displayed */}
                <div className="col-span-2 border-x-2 border-emerald-100 px-6">    
                    <div className="flex items-center justify-center grid grid-rows-3 ">
                        {userProfile ? (<p className="flex items-center justify-center text-xl italic font-light">@{userProfile.username}</p>) : (<p>user profile</p>)}
                        {userProfile ? (<p className="font-light">{userProfile.profileDesc}</p>) : (<p>user bio</p>)}
                        {/* if viewing your own profile*/}
                        {currentUser.userData._id == id ? (
                            // <div>
                            // <img src="" alt=""></img>
                            // </div>
                            <div className="space-x-2">
                                <button 
                                    onClick={()=>setOpen(true)}
                                    className="px-4 py-2 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-white">
                                    Edit Profile
                                </button> 
                                <Link to="/">
                                    <button 
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-lg">
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        //viewing another persons profile while follwing them
                        ): currentUser.userData.following.includes(id) ? (
                            <button className="px-4 py-2 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-white">
                                Unfollow
                            </button>
                        ) : (
                        //viewing another persons profile while not following them
                            <button className="px-4 py-2 bg-emerald-300 hover:bg-emerald-400 rounded-lg text-white">
                                Follow
                            </button>
                        )}
                    </div>
                    <div className="mt-6">{userSpeeches && userSpeeches.map((speech) =>{
                        return (
                            <div className="p-2" key={speech._id}>
                                <Speech speech={speech} setData={setUserSpeeches}/>
                            </div>
                        )
                    })}</div>
                    <div className="flex items-center justify-center">
                        {open && <EditProfile setOpen={setOpen}/>}
                    </div>
                    
                </div>
                <div className="px-6">
                    <RightSideBar/>
                </div>
            </div>
            
        </>
    )
}

export default Profile
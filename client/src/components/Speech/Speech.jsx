import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import formatDistance from 'date-fns/formatDistance';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
const Speech = ({speech, setData}) =>{
    const {currentUser} = useSelector((state) => state.user)
    const [userData, setUserData] = useState()

    const dateStr = formatDistance(new Date(speech.createdAt), new Date(), {addSuffix: true})
    const location = useLocation().pathname
    const {id} = useParams()

    
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                //find user who posted the speech
                const findUser = await axios.get(`/users/${speech.userId}`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('key')}`
                    }
                })
                setUserData(findUser.data)
            }catch(err){
                console.log("error ", err)
            }
        }
        fetchData()
    },[speech.userId, speech.likes])

    const handleLike = async(e) =>{
        e.preventDefault()
        try{
            //for some reason patch wont work unless extra brackets are added after url and before headers
            const like = await axios.patch(`/speeches/${speech._id}/like`, {},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('key')}`
                }
            })

            //depending on current location, show different things
            if(location.includes("profile")){
                const newData = await axios.get(`/speeches`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('key')}`
                    }
                })
                console.log("newData: ", newData)
                setData(newData.data)
            } else if(location.includes("explore")) {
                const newData = await axios.get(`/speeches/explore`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('key')}`
                    }
                })
                setData(newData.data)
            } else {
                const newData = await axios.get(`/speeches/feed/${currentUser.userData._id}`, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('key')}`
                    }
                })
                setData(newData.data)
            }

        }catch(err){
            console.log("error: ",err)
        }
    }

    return (
        <div className="bg-emerald-100 rounded-lg px-1">
            {userData && (
                <>
                    <div className="flex space-x-2">
                        {/* profile picture */}
                        {/* <img src="" alt=""></img> */}

                        {/* name is a link to the users profile */}
                        <Link to={`/talk/profile/${userData._id}`}>
                            <p className="underline">{userData.fname} {userData.lname}</p>
                        </Link>

                        {/* show username */}
                        <span className="italic font-light">@{userData.username}</span>

                        {/* get how long ago speech was posted */}
                        <p className="font-light text-sm"> - {dateStr}</p>
                    </div>

                    {/* Show speech content*/}
                    <p className="text-lg">{speech.content}</p>

                    {/* if user liked the tweet, then show filled icon, otherwise show border*/}
                    <button onClick={handleLike}>{speech.likes.includes(currentUser.userData._id) ? (
                        <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
                    ) : (
                        <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
                    )}
                    {speech.likes.length}</button>
                </>
            )}          
        </div>


    )
}

export default Speech
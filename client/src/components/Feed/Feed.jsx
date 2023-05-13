import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Feed = () => {
    const [feed, setFeed] = useState(null)
    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const feedSpeech = await axios.get(`/speeches/feed/${currentUser._id}`)
                setFeed(feed.data)
            }catch (err){
                console.log("error: ",err)
            }
        }

        fetchData()
    }, [currentUser._id])

    console.log("Feed: ", feed)
    return <div></div>
}

export default Feed
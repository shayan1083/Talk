import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Speech from "../Speech/Speech";
const Feed = () => {
    const [feed, setFeed] = useState(null)
    const { currentUser } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const feed = await axios.get(`/speeches/feed/${currentUser.userData._id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('key')}`
                }
                })
                setFeed(feed.data)
            }catch (err){
                console.log("error: ",err)
            }
        }
        fetchData()
    }, [currentUser.userData._id, feed])


    return <div className="mt-6">
        
        {feed != null && feed.map((speech =>{
            return (
                <div key={speech._id} className="p-1">
                    <Speech speech={speech} setData={setFeed}/>
                </div>
            )
        }))}

        {!feed && console.log("no feed: ", feed)}
       
    </div>
}

export default Feed
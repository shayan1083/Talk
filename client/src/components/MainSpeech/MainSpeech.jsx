import React, {useState} from "react";
import Feed from "../Feed/Feed";
import { useSelector } from "react-redux";
import axios from "axios";

const MainSpeech = () =>{
    const {currentUser} = useSelector((state) => state.user)
    const [speechText, setSpeechText] = useState(""
    )

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const post = await axios.post("/speeches/post", {
                content: speechText
            }, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('key')}`
                }
            })
            window.location.reload(false)
        }catch(err){
            console.log("error: ",err)
        }
    }

    return (
        <div>
            <form className="border-b-2 pb-6">
                <textarea 
                    onChange={(e) => setSpeechText(e.target.value)}
                    type="text" 
                    placeholder="Start talking!" 
                    maxLength={280} 
                    className="bg-emerald-200 rounded-lg w-full p-2">
                </textarea>
                <button 
                    onClick={handleSubmit}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded-lg ml-auto">
                    Post
                </button>
            </form>
            <Feed/>
        </div>
    )
}

export default MainSpeech
import React from "react";

const MainSpeech = () =>{
    return (
        <div>
            <p className="font-bold pl-2 my-2">Username</p>
            <form className="border-b-2 pb-6">
                <textarea type="text" placeholder="Start talking!" maxlength={280} className="bg-emerald-200 rounded-lg w-full p-2"></textarea>
                <button className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded-lg ml-auto">Post</button>
            </form>
            MainSpeech
        </div>
    )
}

export default MainSpeech
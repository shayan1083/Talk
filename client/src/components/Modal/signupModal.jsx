import React from "react";
import {Link} from "react-router-dom"

const SignupModal = () =>{
    return <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-6/12 m:w-6/12 mx-auto gap-10">
        <h2 className="text-3xl font-bold text-center">Join the Conversation</h2>
    
        <input 
        type="text" 
        placeholder="First Name" 
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />
        <input 
        type="text" 
        placeholder="Last Name" 
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />
        <input 
        type="text" 
        placeholder="Username" 
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />
        <input 
        type="text" 
        placeholder="Email" 
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />
        <input 
        type="password"
        placeholder="Password"
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />


        <button className="text-xl py-2 rounded-lg px-4 bg-emerald-200 text-black">Create an account</button>

        
    </form>
}

export default SignupModal
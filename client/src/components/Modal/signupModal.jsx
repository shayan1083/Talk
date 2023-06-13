import React, { useState } from "react";
import axios from "axios"
import {useDispatch} from 'react-redux'
import {loginStart,loginSuccess,loginFailed} from '../../redux/userSlice'
import { useNavigate } from "react-router-dom"



const SignupModal = () =>{
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignup = async (e) =>{
        e.preventDefault()
        dispatch(loginStart())
        try{
            const res = await axios.post("/auth/signup", {
                fname: fname,
                lname: lname,
                username: username, 
                email: email,
                password:password
            })
            localStorage.setItem('key', res.data.accessToken)
            dispatch(loginSuccess(res.data));
            navigate("/talk/home")
        } catch(err){
            dispatch(loginFailed())
            console.log(err)
        }

    }

    return <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-6/12 m:w-6/12 mx-auto gap-10">
        <h2 className="text-3xl font-bold text-center">Join the Conversation</h2>
    
        <input 
        onChange={(e) => setFname(e.target.value)}
        type="text" 
        placeholder="First Name" 
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />
        <input 
        onChange={(e) => setLname(e.target.value)}
        type="text" 
        placeholder="Last Name" 
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />
        <input 
        onChange={(e) => setUsername(e.target.value)}
        type="text" 
        placeholder="Username" 
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />
        <input 
        onChange={(e) => setEmail(e.target.value)}
        type="text" 
        placeholder="Email" 
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />
        <input 
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required={true}
        className="text-l py-1 rounded-lg px-4"
        />


        <button 
            onClick={handleSignup} 
            className="text-xl py-2 rounded-lg px-4 bg-emerald-200 text-black">
                Create an account
        </button>

        
    </form>
}

export default SignupModal
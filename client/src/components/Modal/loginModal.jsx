import React, {useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"
import {useDispatch} from 'react-redux'
import {loginStart,loginSuccess,loginFailed} from '../../redux/userSlice'

import { useNavigate } from "react-router-dom"

const LoginModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) =>{
        e.preventDefault()
        dispatch(loginStart())
        try{
            const res = await axios.post("/auth/login", {email: email, password:password})
            dispatch(loginSuccess(res.data));
            navigate("/home")
        } catch(err){
            dispatch(loginFailed())
            console.log(err)
        }

    }
    return( 
        <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg gap-10">
            <h2 className="text-3xl font-bold text-center">Return to the Conversation</h2>
        
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
                onClick={handleLogin} 
                className="text-xl py-2 rounded-lg px-4 bg-emerald-300 text-black">
                    Log In
            </button>
        </form>
)
}

export default LoginModal
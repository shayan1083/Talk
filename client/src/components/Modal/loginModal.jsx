import React, {useState} from "react"
import axios from "axios"
import {useDispatch} from 'react-redux'
import {loginStart,loginSuccess,loginFailed} from '../../redux/userSlice'
import { useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup'

const LoginModal = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [isOpen, setIsOpen] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) =>{
        e.preventDefault()
        dispatch(loginStart())
        try{
            const res = await axios.post("/auth/login", {
                username: username, 
                password:password
            },
            )
            localStorage.setItem('key', res.data.accessToken)
            dispatch(loginSuccess(res.data));
            navigate("/talk/home")
        } catch(err){
            dispatch(loginFailed())
            setErrorMsg(err.response.data.message)
            setIsOpen(true)
            //alert(err.response.data.message)
            
            console.log(err.response.data.message)
        }

    }
    return( 
        <div>
            <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg gap-10">
                <h2 className="text-3xl font-bold text-center">Return to the Conversation</h2>
            
                <input 
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" 
                    placeholder="Username"
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

                {isOpen && (
                    <div className="text-center text-red-600"> 
                            {errorMsg}     
                    </div>
                )}
            </form>
            
        </div>
)
}

export default LoginModal
import React from 'react';
import {useState} from 'react'
import LoginModal from '../Modal/loginModal';
import SignupModal from '../Modal/signupModal';

const Landing = () =>{
    const [loginOpen, setLoginOpen] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)

    return (
        <div >
            <div className="grid grid-cols-3">
                <div className='my-4'>
                    {/* app logo */}
                    <img
                    src="/talk.png" 
                    alt="Talk Logo" 
                    width={"250px"} 
                    className="ml-8"
                    />
                </div>

                <div>
                    <p className='lg:text-9xl md:text-9xl sm:text-6xl font-medium text-center'>Talk!</p>
                    {/* <p className='text-l font-light'>A platform to </p> */}
                </div>
                
            </div>
            <div className="flex flex-col items-center gap-4">

                {/* signup modal */}
                <button
                onClick={() => {
                    setLoginOpen(false)
                    setSignupOpen(true)           
                }} 
                className="text-xl px-4 py-2 rounded-lg bg-emerald-300 hover:bg-emerald-400 text-black"
                >
                    Create an account
                </button>

                {/* login modal */}
                <button 
                onClick={() => {
                    setSignupOpen(false)
                    setLoginOpen(true)
                }}
                className="text-xl px-4 py-2 rounded-lg px-4 bg-emerald-300 hover:bg-emerald-400 text-black"
                >
                    Login
                </button>

                {loginOpen && <LoginModal/>}
                {signupOpen && <SignupModal/>} 
             
            </div>
        </div>
    )
}
export default Landing
import React from "react"
import {Link} from 'react-router-dom'
const Error = () =>{
    return (
        <div className="text-center my-8 space-y-5">
            <h2 className="font-bold text-4xl">Page Not Found</h2>
            <p className="pb-2">
                Go back to login
            </p>
            <Link to="/" className="bg-emeral-500 py-1 px-3 rounded-lg text-blue-500 hover:underline">
            Login
            </Link> 
        </div>
    )
}

export default Error
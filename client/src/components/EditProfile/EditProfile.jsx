import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const EditProfile = ({setOpen}) => {

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEdit = async() =>{
        try{
            const newProfile = await axios.patch('/users', {
                fname: fname,
                lname: lname,
                username: username,
                email: email,
                password:password,
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('key')}`
                }
            }
            )
        }catch(err){
            console.log("err: ", err)
        }
    }

  return (
    <div className='absolute top-10 flex items-center justify-center'>
        <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col relative">
            <button 
                onClick={()=>setOpen(false)} 
                className='absolute top-3 right-3 cursor-pointer'>
                    X
            </button>
            <form className='flex flex-col py-12 px-8 rounded-lg w-6/12 m:w-6/12 mx-auto gap-5'>
                <h2 className='font-bold text-xl'>
                    Edit Profile
                </h2>
                <p>Choose a new picture</p>
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
                    onClick={handleEdit} 
                    className="text-xl py-2 rounded-lg px-4 bg-emerald-200 text-black">
                        Save Changes
                </button>

            </form>
            <button 
                className='bg-red-500 hover:bg-red-600 text-white rounded-lg w-3/12'>
                    Delete Account
            </button>
        </div>
    </div>
  )
}

export default EditProfile
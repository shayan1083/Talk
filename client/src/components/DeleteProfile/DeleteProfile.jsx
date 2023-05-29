import React from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { current } from '@reduxjs/toolkit'
import { logout } from "../../redux/userSlice";

const DeleteProfile = ({setDeleteModal}) => {

    const {currentUser} = useSelector((state)=>state.user)
    const id = currentUser.userData._id

    //logout button function
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }


    //delete user
    const handleDelete = async() =>{
        try{
            
            handleLogout()
            const deleteUser = await axios.delete(`/users/delete/${id}`,     
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('key')}`
                }
            })
        }catch(err){
            console.log("error: ",err)
        }
    }

  return (

    <div className='flex flex-col items-center justify-center gap-4'> 
        <p>Click the X on the top right to exit</p>
        <p>This button will delete your account, PERMANENTLY</p>
        <button 
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-600 text-white rounded-lg w-3/12'>
                Delete Account
        </button>  
    </div>
  )
}

export default DeleteProfile
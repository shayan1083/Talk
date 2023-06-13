import axios from 'axios'
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const UserPlaceholder = ({setUserData, userData}) => {
    const {id} = useParams()
    const location = useLocation().pathname

    useEffect(()=>{
      const fetchData = async() => {
        try{
          const userProfile = await axios.get(`/users/${id}`,{
            headers:{
              Authorization: `Bearer ${localStorage.getItem('key')}`
            }
          })
          setUserData(userProfile.data)
        }catch(err){
          console.log(err)
        }
      }
      fetchData()
    },[id])

  return (
    <div>{userData?.username}</div>
  )
}

export default UserPlaceholder
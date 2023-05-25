import React, {useEffect,useState} from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Speech from "../Speech/Speech"

const ExplorePage = () =>{

    const [explore, setExplore] = useState(null)
    const {currentUser} = useSelector((state) => state.user)

    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const explore = await axios.get('/speeches/explore',{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('key')}`
                    }
                })
                setExplore(explore.data)
            }catch(err){
                console.log("error: ", err)
            }
        }
        fetchData()
    }, [currentUser.userData._id])

    return (
        <div className="mt-6">
        {explore && explore.map((speech)=>{
            return (
                <div key={speech._id} className="p-2">
                    <Speech speech={speech} setData={setExplore}/>
                </div>
            )
        })}
    </div>
    )
}

export default ExplorePage
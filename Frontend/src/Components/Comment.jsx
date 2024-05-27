/* eslint-disable react/prop-types */
import axios from "axios"
// eslint-disable-next-line no-unused-vars
import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { URL } from "../url"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

// eslint-disable-next-line no-unused-vars
// Component for rendering a single comment
// eslint-disable-next-line no-unused-vars
const Comment = ({c,post}) => {

  const {user}=useContext(UserContext) // Access user context

  
  // Function to delete a comment
  const deleteComment=async(id)=>{
    try{
      await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})// Send delete request to delete the comment
      window.location.reload(true)// Reload the page after comment deletion
    }
    catch(err){
      console.log(err)// Log any errors that occur during the deletion process
    }
  }
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
           <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-600">@{c.author}</h3>
            <div className="flex justify-center items-center space-x-4">
            <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
            {user?._id===c?.userId ?
              <div className="flex items-center justify-center space-x-2">
                    <p className="cursor-pointer" onClick={()=>deleteComment(c._id)}><MdDelete/></p>
                </div>:""}
                
            </div>
           </div>
           <p className="px-4 mt-2">{c.comment}</p>

           </div>
  )
}

export default Comment
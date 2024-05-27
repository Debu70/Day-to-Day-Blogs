/* eslint-disable no-undef */
import { useNavigate, useParams } from "react-router-dom"  // Importing useNavigate and useParams hooks from react-router-dom
import Comment from "../Components/Comment"; // Importing Comment component
import Footer from "../Components/Footer"; // Importing Footer component
import Navbar from "../Components/Navbar"; // Importing Navbar component
import {BiEdit} from 'react-icons/bi' // Importing BiEdit icon from react-icons/bi
import {MdDelete} from 'react-icons/md' // Importing MdDelete icon from react-icons/md
import axios from "axios" // Importing axios library
import { URL,IF } from "../url" // Importing URL and IF constants from url file
import { useContext, useEffect, useState } from "react"  // Importing React hooks
import { UserContext } from "../context/UserContext"  
import Loader from "../Components/Loader"  // Importing Loader component



const PostDetails = () => {

  const postId = useParams().id; // Getting postId from URL parameters
  const [post, setPost] = useState({}); // State variable for storing post
  const { user } = useContext(UserContext); // Getting user data from UserContext
  const [comments, setComments] = useState([]); // State variable for storing comments
  const [comment, setComment] = useState(""); // State variable for storing new comment
  const [loader, setLoader] = useState(false); // State variable for indicating loading state
  const navigate = useNavigate(); // Navigate function from react-router-dom

  

  // Function to fetch post details
  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId); // Fetching post details
      setPost(res.data); // Setting fetched post details
    } catch (err) {
      console.log(err); // Logging error, if any
    }
  }

  // Function to delete post
  const handleDeletePost = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.delete(URL + "/api/posts/" + postId, { withCredentials: true }); // Deleting post
      navigate("/"); // Navigating to home page after successful deletion
    } catch (err) {
      console.log(err); // Logging error, if any
    }
  }

// Fetching post details and comments on component mount or when postId changes
useEffect(() => {
  fetchPost();
  fetchPostComments();
}, [postId]);


  // Function to fetch comments for the post
  const fetchPostComments = async () => {
    setLoader(true); // Setting loader to true
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId); // Fetching comments for the post
      setComments(res.data); // Setting fetched comments
      setLoader(false); // Setting loader to false
    } catch (err) {
      setLoader(true); // Setting loader to true
      console.log(err); // Logging error, if any
    }
  }

  // useEffect(()=>{
  //   fetchPostComments()

  // },[postId])

   // Function to post a new comment
   const postComment = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(URL + "/api/comments/create",
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true }); // Posting a new comment
      window.location.reload(true); // Reloading the page after successful comment submission
    } catch (err) {
      console.log(err); // Logging error, if any
    }
  }


    // Rendering JSX
  return (
    <div>
        <Navbar/>
        {loader?<div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>:<div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
         {user?._id===post?.userId && <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)} ><BiEdit/></p>
            <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete/></p>
         </div>}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
        <p>@{post.username}</p>
       <div className="flex space-x-2">
       <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
       </div>
        </div>
        <img src={IF+post.photo} className="w-full  mx-auto mt-8" alt=""/>
         <p className="mx-auto mt-8">{post.desc}</p>
         <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
          {post.categories?.map((c,i)=>(
            <>
            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
            </>
            
          ))}
            
          </div>
         </div>
         <div className="flex flex-col mt-4">
         <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
         {comments?.map((c)=>(
          <Comment key={c._id} c={c} post={post} />
         ))}
           
         </div>
         {/* write a comment */}
         <div className="w-full flex flex-col mt-4 md:flex-row">
          <input onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"/>
          <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
         </div>
        </div>}
        <Footer/>  {/* Rendering Footer component */}

    </div>
  )
}

export default PostDetails // Exporting PostDetails component
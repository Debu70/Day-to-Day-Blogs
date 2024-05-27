import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation hooks from react-router-dom
import Footer from "../Components/Footer"; // Importing Footer component
import Navbar from "../Components/Navbar"; // Importing Navbar component
import { useContext, useEffect, useState } from "react"; // Importing React hooks
import { UserContext } from "../context/UserContext"; // Importing UserContext from UserContext context
import axios from "axios"; // Importing axios library
import { URL } from "../url"; // Importing URL constant from url file
import HomePosts from "../Components/HomePost"; // Importing HomePosts component
import Loader from "../Components/Loader"; // Importing Loader component

const MyBlogs = () => {
    const {search}=useLocation(); // Getting search query parameter from URL
  // console.log(search)
  const [posts,setPosts]=useState([]); // State variable for storing posts
  const [noResults,setNoResults]=useState(false); // State variable for indicating if no results found
  const [loader,setLoader]=useState(false); // State variable for indicating loading state
  const {user}=useContext(UserContext); // Getting user data from UserContext
  // console.log(user)

  // Function to fetch posts
  const fetchPosts=async()=>{
    setLoader(true); // Setting loader to true
    try{
      const res=await axios.get(URL+"/api/posts/user/"+user._id); // Fetching posts for the logged-in user
      // console.log(res.data)
      setPosts(res.data); // Setting fetched posts
      if(res.data.length===0){
        setNoResults(true); // Setting noResults to true if no posts found
      }
      else{
        setNoResults(false); // Setting noResults to false if posts found
      }
      setLoader(false); // Setting loader to false
    }
    catch(err){
      console.log(err); // Logging error, if any
      setLoader(true); // Setting loader to true
    }
  }

  useEffect(()=>{
    fetchPosts(); // Fetching posts on component mount or when search query parameter changes

  },[search])

  // JSX rendering
  return (
    <div>
        <Navbar/> {/* Rendering Navbar component */}
        <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}> {/* Conditional link based on user login status */}
          <HomePosts key={post._id} post={post}/> {/* Rendering HomePosts component for each post */}
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>} {/* No posts available message */}
        </div>
        <Footer/> {/* Rendering Footer component */}
    </div>
  )
}

export default MyBlogs; // Exporting MyBlogs component

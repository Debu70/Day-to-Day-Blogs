import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate hooks from react-router-dom
import Footer from "../Components/Footer"; // Importing Footer component
import { useContext, useState } from "react"; // Importing React hooks
import axios from "axios"; // Importing axios library
import { URL } from "../url"; // Importing URL constant from url file
import { UserContext } from "../context/UserContext"; // Importing UserContext from UserContext context

const Login = () => {
  const [email,setEmail]=useState(""); // State variable for email input
  const [password,setPassword]=useState(""); // State variable for password input
  const [error,setError]=useState(false); // State variable for indicating login error
  const {setUser}=useContext(UserContext); // Getting setUser function from UserContext
  const navigate=useNavigate(); // Getting navigate function from react-router-dom

  // Function to handle login
  const handleLogin=async()=>{
    try{
      const res=await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true}); // Sending login request to server
      setUser(res.data); // Setting user data in context
      navigate("/"); // Navigating to home page after successful login
    }
    catch(err){
      setError(true); // Setting error to true if login fails
      console.log(err); // Logging error, if any
    }
  }
  
  // JSX rendering
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
    <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Day-to-Day Blogs</Link></h1> {/* Link to home page */}
    <h3><Link to="/register">Register</Link></h3> {/* Link to register page */}
    </div>
<div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left">Log in to your account</h1>
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" /> {/* Email input */}
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" /> {/* Password input */}
         <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button> {/* Login button */}
         {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>} {/* Error message */}
         <div className="flex justify-center items-center space-x-3">
          <p>New here?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p> {/* Link to register page */}
         </div>
       </div>
    </div>
    <Footer/> {/* Rendering Footer component */}
    </>
  )
}

export default Login; // Exporting Login component

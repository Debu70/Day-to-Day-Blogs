import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from react-router-dom
import Footer from "../Components/Footer"; // Importing Footer component
import { useState } from "react"; // Importing useState hook from React
import axios from 'axios'; // Importing axios library
import { URL } from '../url'; // Importing URL constant from url file

const Register = () => {
  const [username, setUsername] = useState(""); // State variable for username
  const [email, setEmail] = useState(""); // State variable for email
  const [password, setPassword] = useState(""); // State variable for password
  const [error, setError] = useState(false); // State variable for error status
  const navigate = useNavigate(); // Navigate function from react-router-dom

  // Function to handle registration
  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password }); // Sending registration request
      setUsername(res.data.username); // Setting username
      setEmail(res.data.email); // Setting email
      setPassword(res.data.password); // Setting password
      setError(false); // Resetting error state
      navigate("/login"); // Navigating to login page
    } catch (err) {
      setError(true); // Setting error state
      console.log(err); // Logging error, if any
    }
  }

  // JSX rendering
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Day-to-Day Blogs</Link></h1> {/* Link to home page */}
        <h3><Link to="/login">Login</Link></h3> {/* Link to login page */}
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1> {/* Title for registration */}
          <input onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" /> {/* Input field for username */}
          <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" /> {/* Input field for email */}
          <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" /> {/* Input field for password */}
          <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Register</button> {/* Button to register */}
          {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>} {/* Error message */}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p> {/* Text for existing account */}
            <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p> {/* Link to login page */}
          </div>
        </div>
      </div>
      <Footer/> {/* Rendering Footer component */}
    </>
  )
}

export default Register; // Exporting Register component

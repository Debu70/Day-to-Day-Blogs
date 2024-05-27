import { useContext, useEffect, useState } from "react"; // Importing React hooks
import Footer from "../Components/Footer"; // Importing Footer component
import Navbar from "../Components/Navbar"; // Importing Navbar component
import ProfilePosts from "../Components/ProfilePosts"; // Importing ProfilePosts component
import axios from "axios"; // Importing axios library
// eslint-disable-next-line no-unused-vars
import { IF, URL } from "../url"; // Importing URL and IF constants from url file
import { UserContext } from "../context/UserContext"; // Importing UserContext
import { useNavigate, useParams } from "react-router-dom"; // Importing useNavigate and useParams hooks from react-router-dom

const Profile = () => {
  const param = useParams().id; // Getting id parameter from URL
  const [username, setUsername] = useState(""); // State variable for username
  const [email, setEmail] = useState(""); // State variable for email
  const [password, setPassword] = useState(""); // State variable for password
  const { user, setUser } = useContext(UserContext); // Getting user data from UserContext
  const navigate = useNavigate(); // Navigate function from react-router-dom
  const [posts, setPosts] = useState([]); // State variable for user posts
  const [updated, setUpdated] = useState(false); // State variable for tracking if user is updated

  // Function to fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id); // Fetching user profile
      setUsername(res.data.username); // Setting username
      setEmail(res.data.email); // Setting email
      setPassword(res.data.password); // Setting password
    } catch (err) {
      console.log(err); // Logging error, if any
    }
  }

  // Function to handle user update
  const handleUserUpdate = async () => {
    setUpdated(false); // Resetting updated state
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.put(URL + "/api/users/" + user._id, { username, email, password }, { withCredentials: true }); // Updating user
      setUpdated(true); // Setting updated state
    } catch (err) {
      console.log(err); // Logging error, if any
      setUpdated(false); // Setting updated state
    }
  }

  // Function to handle user deletion
  const handleUserDelete = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true }); // Deleting user
      setUser(null); // Resetting user context
      navigate("/"); // Navigating to home page
    } catch (err) {
      console.log(err); // Logging error, if any
    }
  }

  // Function to fetch user posts
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id); // Fetching user posts
      setPosts(res.data); // Setting user posts
    } catch (err) {
      console.log(err); // Logging error, if any
    }
  }

  // Fetching user profile and posts on component mount or when param changes
  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [param]);

  // JSX rendering
  return (
    <div>
      <Navbar/> {/* Rendering Navbar component */}
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1> {/* Title for user posts */}
          {posts?.map((p) => ( // Mapping through user posts
            <ProfilePosts key={p._id} p={p} /> // Rendering ProfilePosts component for each post
          ))}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1> {/* Title for user profile */}
            <input onChange={(e) => setUsername(e.target.value)} value={username} className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" type="text"/> {/* Input field for username */}
            <input onChange={(e) => setEmail(e.target.value)} value={email} className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" type="email"/> {/* Input field for email */}
            {/* <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/> */}
            <div className="flex items-center space-x-4 mt-8">
              <button onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button> {/* Button to update user */}
              <button onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button> {/* Button to delete user */}
            </div>
            {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>} {/* Success message */}
          </div>
        </div>
      </div>
      <Footer/> {/* Rendering Footer component */}
    </div>
  )
}

export default Profile; // Exporting Profile component

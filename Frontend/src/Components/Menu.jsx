import { useContext } from "react"; // Importing useContext hook from React
import { UserContext } from "../context/UserContext"; // Importing UserContext from UserContext file
import axios from "axios"; // Importing axios library for making HTTP requests
import { URL } from "../url"; // Importing URL constant from url file
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from react-router-dom library


const Menu = () => {
  // Accessing user state and setUser function from UserContext
  const {user} = useContext(UserContext); // Using useContext hook to access user state
  const {setUser} = useContext(UserContext); // Using useContext hook to access setUser function
  const navigate = useNavigate(); // Using useNavigate hook for programmatic navigation

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Sending logout request to server
      // eslint-disable-next-line no-unused-vars
      const res = await axios.get(URL+"/api/auth/logout", {withCredentials:true}); // Making GET request to logout endpoint
      //console.log(res)
      setUser(null); // Setting user state to null upon successful logout
      navigate("/login"); // Redirecting to login page after logout
    } catch (err) {
      console.log(err); // Logging any errors that occur during the logout process
    }
  };

  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3>} {/* Render login link if user is not logged in */}
      {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>} {/* Render register link if user is not logged in */}
      {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user._id}>Profile</Link></h3>} {/* Render profile link if user is logged in */}
      {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>} {/* Render write link if user is logged in */}
      {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/"+user._id}>My blogs</Link></h3>} {/* Render myblogs link if user is logged in */}
      {user && <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>} {/* Render logout button if user is logged in */}
    </div>
  );
};

export default Menu;

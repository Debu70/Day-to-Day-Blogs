import { Link, useLocation, useNavigate } from "react-router-dom"; // Importing Link, useLocation, and useNavigate hooks from react-router-dom library
import { BsSearch } from "react-icons/bs"; // Importing BsSearch icon from react-icons/bs
import { FaBars } from "react-icons/fa"; // Importing FaBars icon from react-icons/fa
import { useContext, useState } from "react"; // Importing useContext and useState hooks from React
import Menu from "./Menu"; // Importing Menu component
import { UserContext } from "../context/UserContext"; // Importing UserContext from UserContext file

const Navbar = () => {
  const [prompt, setPrompt] = useState(""); // State variable to store search prompt
  const [menu, setMenu] = useState(false); // State variable to toggle menu visibility
  const navigate = useNavigate(); // Getting navigation function from useNavigate hook
  const path = useLocation().pathname; // Getting current pathname from useLocation hook

  const showMenu = () => {
    setMenu(!menu); // Toggling menu visibility
  };

  const { user } = useContext(UserContext); // Getting user state from UserContext

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Day-to-Day Blogs</Link> {/* Home link */}
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/")) // Handling search functionality
            }
            className="cursor-pointer"
          >
            <BsSearch /> {/* Search icon */}
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)} // Handling input change for search prompt
            className="outline-none px-3 "
            placeholder="Search a post" // Placeholder text for search input
            type="text"
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? ( // Conditional rendering based on user authentication
          <h3>
            <Link to="/write">Write</Link> {/* Write link */}
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link> {/* Login link */}
          </h3>
        )}
        {user ? ( // Conditional rendering based on user authentication
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars /> {/* Menu icon */}
            </p>
            {menu && <Menu />} {/* Render menu component if menu is visible */}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link> {/* Register link */}
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars /> {/* Menu icon for mobile view */}
        </p>
        {menu && <Menu />} {/* Render menu component if menu is visible in mobile view */}
      </div>
    </div>
  );
};

export default Navbar;

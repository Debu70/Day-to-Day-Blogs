import axios from "axios"; // Importing axios library
import Footer from "../Components/Footer"; // Importing Footer component
import HomePosts from "../Components/HomePost"; // Importing HomePosts component
import Navbar from "../Components/Navbar"; // Importing Navbar component
// eslint-disable-next-line no-unused-vars
import { IF, URL } from "../url"; // Importing IF and URL constants from url file
import { useContext, useEffect, useState } from "react"; // Importing React hooks
import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation hooks from react-router-dom
import Loader from "../Components/Loader"; // Importing Loader component
import { UserContext } from "../context/UserContext"; // Importing UserContext from UserContext context

const Home = () => {
  const { search } = useLocation(); // Extracting search query from URL
  // console.log(search)
  const [posts, setPosts] = useState([]); // State variable for storing posts
  const [noResults, setNoResults] = useState(false); // State variable for indicating no search results
  const [loader, setLoader] = useState(false); // State variable for indicating loading state
  const { user } = useContext(UserContext); // Getting user data from UserContext
  // console.log(user)

  // Function to fetch posts based on search query
  const fetchPosts = async () => {
    setLoader(true); // Setting loader to true to indicate loading state
    try {
      const res = await axios.get(URL + "/api/posts/" + search); // Fetching posts from API
      // console.log(res.data)
      setPosts(res.data); // Setting fetched posts
      if (res.data.length === 0) {
        setNoResults(true); // Setting noResults to true if no posts are found
      } else {
        setNoResults(false); // Setting noResults to false if posts are found
      }
      setLoader(false); // Setting loader to false to indicate end of loading state
    } catch (err) {
      console.log(err); // Logging errors, if any
      setLoader(true); // Setting loader to true to indicate loading state
    }
  };

  // Fetch posts on component mount and when search query changes
  useEffect(() => {
    fetchPosts();
  }, [search]); //search in dependies

  // JSX rendering
  return (
    <>
      <Navbar /> {/* Rendering Navbar component */}
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? ( // Conditionally rendering loader component
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? ( // Conditionally rendering posts or no results message
          posts.map((post) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No Posts available</h3>
        )}
      </div>
      <Footer /> {/* Rendering Footer component */}
    </>
  );
};

export default Home; // Exporting Home component

/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"; // Importing React hooks
import Footer from "../Components/Footer"; // Importing Footer component
import Navbar from "../Components/Navbar"; // Importing Navbar component
import { ImCross } from 'react-icons/im'; // Importing ImCross icon from react-icons library
import axios from "axios"; // Importing axios library
import { URL } from "../url"; // Importing URL constant from url file
import { useNavigate, useParams } from "react-router-dom"; // Importing react-router-dom hooks
import { UserContext } from "../context/UserContext"; // Importing UserContext from UserContext context

const EditPost = () => {
    const postId = useParams().id; // Getting postId from URL params
    const { user } = useContext(UserContext); // Getting user data from UserContext
    const navigate = useNavigate(); // Hook for navigation
    const [title, setTitle] = useState(""); // State variable for post title
    const [desc, setDesc] = useState(""); // State variable for post description
    const [file, setFile] = useState(null); // State variable for post image
    const [cat, setCat] = useState(""); // State variable for post category input
    const [cats, setCats] = useState([]); // State variable for post categories

    // Function to fetch post data
    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + "/api/posts/" + postId); // Fetching post data from API
        setTitle(res.data.title); // Setting post title
        setDesc(res.data.desc); // Setting post description
        setFile(res.data.photo); // Setting post image
        setCats(res.data.categories); // Setting post categories
      } catch (err) {
        console.log(err); // Logging errors, if any
      }
    };

    // Function to handle post update
    const handleUpdate = async (e) => {
      e.preventDefault(); // Preventing default form submission behavior
      const post = {
        title,
        desc,
        username: user.username,
        userId: user._id,
        categories: cats
      };

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("img", filename);
        data.append("file", file);
        post.photo = filename;
        try {
          const imgUpload = await axios.post(URL + "/api/upload", data); // Uploading image
        } catch (err) {
          console.log(err); // Logging errors, if any
        }
      }

      try {
        const res = await axios.put(URL + "/api/posts/" + postId, post, { withCredentials: true }); // Updating post
        navigate("/posts/post/" + res.data._id); // Navigating to the updated post
      } catch (err) {
        console.log(err); // Logging errors, if any
      }
    };

    // Function to delete a category from the post
    const deleteCategory = (i) => {
      let updatedCats = [...cats];
      updatedCats.splice(i);
      setCats(updatedCats);
    };

    // Function to add a category to the post
    const addCategory = () => {
      let updatedCats = [...cats];
      updatedCats.push(cat);
      setCat("");
      setCats(updatedCats);
    };

    // Fetch post data on component mount
    useEffect(() => {
      fetchPost();
    }, [postId]);

    // JSX rendering
    return (
      <div>
          <Navbar /> {/* Rendering Navbar component */}
          <div className='px-6 md:px-[200px] mt-8'>
            <h1 className='font-bold md:text-2xl text-xl '>Update a post</h1>
            <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none' />
              <input onChange={(e) => setFile(e.target.files[0])} type="file"  className='px-4' />
              <div className='flex flex-col'>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <input value={cat} onChange={(e) => setCat(e.target.value)} className='px-4 py-2 outline-none' placeholder='Enter post category' type="text" />
                    <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                </div>

                {/* Categories */}
                <div className='flex px-4 mt-3'>
                  {cats?.map((c, i) => (
                      <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                      <p>{c}</p>
                      <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
                  </div>
                  ))}
                </div>
              </div>
              <textarea onChange={(e) => setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description' />
              <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
            </form>
          </div>
          <Footer /> {/* Rendering Footer component */}
      </div>
    );
  };
  
  export default EditPost; // Exporting EditPost component

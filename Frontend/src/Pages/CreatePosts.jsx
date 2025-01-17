import Navbar from "../Components/Navbar"; // Importing Navbar component
import Footer from "../Components/Footer"; // Importing Footer component
import { ImCross } from "react-icons/im"; // Importing ImCross icon from react-icons library
import { useContext, useState } from "react"; // Importing useContext and useState hooks from React
import { UserContext } from "../context/UserContext"; // Importing UserContext from UserContext context
import { URL } from "../url"; // Importing URL constant from url file
import axios from "axios"; // Importing axios library
// eslint-disable-next-line no-unused-vars
import { Navigate, useNavigate } from "react-router-dom"; // Importing Navigate and useNavigate from react-router-dom library

const CreatePost = () => {
  const [title, setTitle] = useState(""); // State variable for post title
  const [desc, setDesc] = useState(""); // State variable for post description
  const [file, setFile] = useState(null); // State variable for post image
  const { user } = useContext(UserContext); // Getting user data from UserContext
  const [cat, setCat] = useState(""); // State variable for post category input
  const [cats, setCats] = useState([]); // State variable for post categories

  const navigate = useNavigate(); // Hook for navigation

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

  // Function to handle post creation
  const handleCreate = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        // eslint-disable-next-line no-unused-vars
        const imgUpload = await axios.post(URL + "/api/upload", data); // Uploading image
      } catch (err) {
        console.log(err); // Logging errors, if any
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      }); // Creating post
      navigate("/posts/post/" + res.data._id); // Navigating to the created post
    } catch (err) {
      console.log(err); // Logging errors, if any
    }
  };

  // JSX rendering
  return (
    <div>
      <Navbar /> {/* Rendering Navbar component */}
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl ">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* Categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
          />
          <button
            onClick={handleCreate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Create
          </button>
        </form>
      </div>
      <Footer /> {/* Rendering Footer component */}
    </div>
  );
};

export default CreatePost; // Exporting CreatePost component

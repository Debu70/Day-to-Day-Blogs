import {Route, Routes} from 'react-router-dom'; // Importing Route and Routes from react-router-dom
import Home from "./Pages/Home"; // Importing Home component
import Login from "./Pages/login"; // Importing Login component
import Register from "./Pages/Register"; // Importing Register component
import PostDetails from './Pages/PostDetails'; // Importing PostDetails component
import CreatePost from './Pages/CreatePosts'; // Importing CreatePost component
import EditPost from './Pages/EditPost'; // Importing EditPost component
import Profile from './Pages/Profile'; // Importing Profile component
import {  UserContextProvider } from './context/UserContext'; // Importing UserContextProvider from UserContext context
import MyBlogs from './Pages/MyBlogs'; // Importing MyBlogs component

const App = () => {
  
  return (
    <UserContextProvider> {/* Wrapping the Routes in UserContextProvider */}
      <Routes> {/* Defining routes */}
        <Route exact path="/" element={<Home/>}/> {/* Route for Home page */}
        <Route exact path="/login" element={<Login/>}/> {/* Route for Login page */}
        <Route exact path="/register" element={<Register/>}/> {/* Route for Register page */}
        <Route exact path="/write" element={<CreatePost/>}/> {/* Route for CreatePost page */}
        <Route exact path="/posts/post/:id" element={<PostDetails/>}/> {/* Route for PostDetails page */}
        <Route exact path="/edit/:id" element={<EditPost/>}/> {/* Route for EditPost page */}
        <Route exact path="/myblogs/:id" element={<MyBlogs/>}/> {/* Route for MyBlogs page */}
        <Route exact path="/profile/:id" element={<Profile/>}/> {/* Route for Profile page */}
      </Routes>
    </UserContextProvider>
  )
}

export default App; // Exporting App component

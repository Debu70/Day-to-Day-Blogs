/* eslint-disable react/prop-types */ // Disabling prop-types linting rule

import axios from "axios"; // Importing axios library
import { createContext, useEffect, useState } from "react"; // Importing createContext, useEffect, and useState hooks from React
import { URL } from "../url"; // Importing URL constant from url file

// Creating UserContext using createContext
export const UserContext = createContext({});

// Functional component to provide UserContext
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // State variable to store user data

  // useEffect hook to fetch user data when component mounts
  useEffect(() => {
    getUser();
  }, []);

  // Function to fetch user data from the server
  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", { withCredentials: true }); // Fetching user data
      setUser(res.data); // Updating user state with fetched data
    } catch (err) {
      console.log(err); // Logging errors, if any
    }
  };

  // Returning UserContextProvider component with UserContext.Provider
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Rendering children components */}
    </UserContext.Provider>
  );
}

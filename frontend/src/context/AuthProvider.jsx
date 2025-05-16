import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [blogs, setBlogs] = useState();  //blogs is a variable and setBlogs is a function and useState is a hook.
    const [profile, setProfile] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {//useEffect is a hook.
        const fetchProfile = async () => {
            try {
                // const token = Cookies.get("token");
                let token = localStorage.getItem("jwt");
                console.log("direct+token:", token);

                if (token) {
                    const { data } = await axios.get("http://localhost:4001/api/users/my-profile", {
                        withCredentials: true,
                        headers: { 'Content-Type': 'application/json' },
                    }
                    );
                    console.log("Auth_Profile:", data);
                    // console.log("Auth_Profile:", data.user?.photo.url);
                    setProfile(data);
                    setIsAuthenticated(true);
                } else {
                    console.log("No token found. User is not authenticated.");
                }
                console.log("Auth_Profile:", data);

            } catch (error) {
                console.log("fetchProfile:", error);
            }
        };
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get("http://localhost:4001/api/blogs/all-blogs", { withCredentials: true }
                );
                console.log("Blogs_data:", data);
                setBlogs(data);
            } catch (error) {
                console.log("fetch_blog:",error);
            }
        };
        fetchBlogs();
        fetchProfile();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                blogs,
                profile,
                setProfile,
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
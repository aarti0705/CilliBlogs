import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


function Login() {
  const {isAuthenticated, setIsAuthenticated, setProfile} = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:4001/api/users/login', { email, password, role }, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("login:", data);
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User Logined successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Please fill required fill", {
        duration: 300,
      });
    }
  };
  return (
    <div >
      <div className="min-h-screen flex items-center justify-center bg-blue-300 ">
        <div className="w-full max-w-md bg-blue-200 shadow-md rounded-lg p-8 mt-2">
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl items-center text-center">
              Cilli<span className="text-blue-500">Blog</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Login</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded-r-md bg-blue-100">
              <option>Select Role</option>
              <option value="user" >User</option>
              <option value="admin">Admin</option>
            </select>
            <div className='mb-4 '>
              <input type="email" placeholder="Your Email " value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 border rounded-md bg-blue-100" />
              <input type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded-md bg-blue-100" />
              <p className="text-center mb-4">New User <Link to={"/register"} className="text-blue-600"> &nbsp; Register Now</Link></p>
              <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
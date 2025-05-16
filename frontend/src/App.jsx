import React from 'react';
import Navbar from './comonents/Navbar';
import Home from "./comonents/Home";
import Footer from "./comonents/Footer";
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Contact from "../src/pages/Contact";
import Creators from "../src/pages/Creators";
import { useAuth } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import UpdateBlog from './dashboard/UpdateBlog';
import Detail from './pages/Detail';
import NotFound from './pages/Notfound';

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/Dashboard", "/login", "/register"].includes(location.pathname);
  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt");
  console.log("App_blogs",blogs);
  console.log("App_isAuthenticated",isAuthenticated);
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={isAuthenticated ===true?<Home/>:<Navigate to={"/login"}/>} />
        
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/blog/:id" element={<Detail />} />
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
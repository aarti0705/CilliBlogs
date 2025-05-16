import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4001/api/blogs/single-blog/${id}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImage(data?.blogImage?.url);
      } catch (error) {
        console.log("Update_blog:", error);
        toast.error("Please fill required fill");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (title) formData.append('title', title);
    if (category) formData.append('category', category);
    if (about) formData.append('about', about);
    if (blogImage) formData.append('blogImage', blogImage);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const { data } = await axios.put(`http://localhost:4001/api/blogs/update/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("updated_data:", data);
      toast.success(data.message || "Blog Updated Successfully");
      navigateTo('/');
    } catch (error) {
      console.log("update_handler:", error);
      toast.error(error.response.data.message || "Please fill required fill");
    }
  };
  return (
    <div>
      <div className='container mx-auto my-12 p-4'>
        <section className='max-w-2xl mx-auto'>
          <h3 className='text-2xl font-bold mb-6'>UPDATE BLOG</h3>
          <form>
            <div className='mb-4'>
              <label className='block mb-2 font-semibold'>Category</label>
              <select
                className='w-full p-2 border rounded-md'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Blog Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
                <option value="IOT">IOT</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="University">University</option>
                <option value="Farmer">Farmer</option>
                <option value="State">State</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Finance">Finance</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
            </div>
            <input
              type='text'
              placeholder='BLOG MAIN TITLE'
              className='w-full p-2 mb-4 border rounded-md'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className='mb-4'>
              <label className='block mb-2 font-semibold'>BLOG IMAGE</label>
              <img
                src={
                  blogImagePreview
                    ? blogImagePreview
                    : blogImage
                    ? blogImage
                    : "/imgPL.webp"
                }
                alt='Blog Main' className='w-full h-48 object-cover mb-4 rounded-md' />
              <input
                type='file'
                className='w-full p-2 border rounded-md'
                onChange={changePhotoHandler}
              />
            </div>
            <textarea
              rows="6"
              className='w-full p-2 mb-4 border rounded-md'
              placeholder='BLOG INTRO... (Must contain at least 250 characters!)'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <button
              className='w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default UpdateBlog;
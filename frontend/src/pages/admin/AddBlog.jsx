import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import {parse} from "marked";

const AddBlog = () => {
  const {axios} = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async (e) => {
    if(!title) return toast.error("Title is required")

    try {
      setLoading(true)
      
      const token = localStorage.getItem("token");
      const {data} = await axios.post("/api/blog/generate", {prompt: title}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if(data.success){
        let htmlContent = data.content;
        
        if (htmlContent.includes('<!DOCTYPE html>') || htmlContent.includes('<html>')) {
          const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
          if (bodyMatch) {
            htmlContent = bodyMatch[1];
          }
        }
        
        if (quillRef.current && quillRef.current.root) {
          quillRef.current.setText('');
          quillRef.current.clipboard.dangerouslyPasteHTML(htmlContent);
          toast.success("Content generated successfully!")
        } else {
          toast.error("Editor not ready, please try again")
        }
      }else{
        toast.error(data.message || "Failed to generate content")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to generate content")
    }finally{
      setLoading(false)
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const blog = {
        title, subTitle, author,
        description: quillRef.current?.root?.innerHTML || "",
        category, isPublished 
      }

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog))
      formData.append("image", image)

      // const {data} = await axios.post("/api/blog/add", formData);

      const token = localStorage.getItem("token"); // ✅ send token
      const { data } = await axios.post("/api/blog/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(data.success){
        toast.success(data.message);
        setImage(false)
        setTitle("")
        setSubTitle("")
        setAuthor("Admin")
        quillRef.current.root.innerHTML = ""
        setCategory("Startup")
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsAdding(false)
    }
  };

  useEffect(() => {
    //Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p className="mt-4">Sub title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />
        <p className="mt-4">Author</p>
        <input
          type="text"
          placeholder="Author name"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button disabled={isAdding} type="submit" className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm">
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;

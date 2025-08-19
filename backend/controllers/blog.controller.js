import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.model.js";
import Comment from "../models/Comment.model.js";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished, author } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    console.log("Received blog data:", req.body.blog);
    console.log("Received file:", req.file);


    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    //upload a image
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
        { width: "1280" }, // Width resizing
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
      author: author || "Admin",
    });
    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    
    // Ensure blog has an author field
    if (!blog.author) {
      blog.author = "Admin";
      await blog.save();
    }
    
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    //Delete all comments associated with the blog
    await Comment.deleteMany({blog: id});

    res.json({ success: true, message: "Blog delete successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content, isApproved: true });
    res.json({ success: true, message: "Comment added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({success: true, comments})
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const generateContent = async (req, res) => {
  try {
    console.log("Generate content called with body:", req.body); // Debug log
    const { prompt } = req.body;
    if (!prompt) {
      console.log("No prompt provided"); // Debug log
      return res.json({ success: false, message: "Prompt is required" });
    }

    console.log("Generating content for prompt:", prompt); // Debug log

    const enhancedPrompt = `Write a comprehensive blog post about "${prompt}". 
    
    Requirements:
    - Write at least 500-800 words
    - Include an engaging introduction
    - Add 3-4 main sections with subheadings
    - Use bullet points and lists where appropriate
    - Include practical examples or tips
    - End with a conclusion
    - Write in a conversational, engaging tone
    - Format with proper HTML tags like <h2>, <h3>, <p>, <ul>, <li>
    
    Make it informative, well-structured, and valuable for readers.`;
    
    console.log("Enhanced prompt:", enhancedPrompt); // Debug log
    
    const content = await main(enhancedPrompt);
    console.log("Content generated successfully, length:", content?.length); // Debug log
    
    res.json({ success: true, content: content });
  } catch (error) {
    console.error("Error in generateContent:", error); // Debug log
    res.json({ success: false, message: error.message });
  }
}
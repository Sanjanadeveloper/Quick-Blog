import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/Blog.model.js";

dotenv.config();

const updateExistingBlogs = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/blonja`);
    console.log("Connected to database");

    // Update all existing blogs to have an author field
    const result = await Blog.updateMany(
      { author: { $exists: false } },
      { $set: { author: "Admin" } }
    );

    console.log(`Updated ${result.modifiedCount} blogs with author field`);
    
    // Verify the update
    const blogs = await Blog.find({});
    console.log("All blogs now have author field:", blogs.map(blog => ({ title: blog.title, author: blog.author })));

  } catch (error) {
    console.error("Error updating blogs:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
};

updateExistingBlogs(); 
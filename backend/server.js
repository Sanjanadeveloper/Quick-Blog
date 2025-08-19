import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/admin.route.js";
import blogRouter from "./routes/blog.route.js";

const app = express()
//Middlewares
// Security middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

connectDB()

//Routes
app.get('/', (req, res) => res.send("API is working"))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})

export default app;
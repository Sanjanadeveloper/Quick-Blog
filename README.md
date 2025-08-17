# Quick Blogs - AI-Powered Blogging Platform

A modern, full-stack blogging platform built with React, Node.js, and MongoDB, featuring AI-powered content generation using Google Gemini AI.

![Quick Blogs](https://img.shields.io/badge/Quick%20Blogs-AI%20Powered%20Blogging-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248)

## 🚀 Features

### ✨ For Readers
- **Modern Blog Interface**: Clean, responsive design with beautiful typography
- **Rich Content Display**: Full blog posts with formatted text, images, and styling
- **Comment System**: Interactive commenting system for reader engagement
- **Category Filtering**: Browse blogs by different categories
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🛠️ For Administrators
- **AI-Powered Content Generation**: Generate blog content using Google Gemini AI
- **Rich Text Editor**: Quill.js editor with advanced formatting options
- **Image Management**: Upload and optimize images with ImageKit integration
- **Blog Management**: Create, edit, publish, and delete blogs
- **Comment Management**: Moderate and manage user comments
- **Dashboard Analytics**: View blog statistics and recent activity
- **Draft System**: Save blogs as drafts before publishing

### 🤖 AI Features
- **Smart Content Generation**: Generate complete blog posts from titles
- **HTML Formatting**: AI generates properly formatted HTML content
- **SEO-Friendly Content**: Structured content with headings and paragraphs
- **Multiple Categories**: Support for various blog categories

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Quill.js** - Rich text editor
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client
- **Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Google Gemini AI** - AI content generation
- **ImageKit** - Image optimization and CDN

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Google Gemini AI API key
- ImageKit account

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Quick-Blogs/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### Admin Panel Access
- Navigate to `/admin` to access the admin panel
- Login with your credentials
- Access dashboard, blog management, and comment moderation

### Creating Blogs with AI
1. Go to "Add Blog" in the admin panel
2. Enter a blog title
3. Click "Generate with AI" to create content
4. Edit the generated content as needed
5. Upload a thumbnail image
6. Select category and publish status
7. Submit the blog

### Managing Blogs
- **Dashboard**: View blog statistics and recent posts
- **List Blogs**: See all blogs with publish/unpublish controls
- **Comments**: Moderate user comments
- **Edit/Delete**: Manage existing blog posts

## 📁 Project Structure

```
Quick Blogs/
├── backend/
│   ├── configs/
│   │   ├── db.js          # MongoDB connection
│   │   ├── gemini.js      # Google Gemini AI setup
│   │   └── imageKit.js    # ImageKit configuration
│   ├── controllers/
│   │   ├── admin.controllers.js  # Admin operations
│   │   └── blog.controller.js    # Blog operations
│   ├── middleware/
│   │   ├── auth.js        # JWT authentication
│   │   └── multer.js      # File upload handling
│   ├── models/
│   │   ├── Blog.model.js  # Blog schema
│   │   └── Comment.model.js # Comment schema
│   ├── routes/
│   │   ├── admin.route.js # Admin routes
│   │   └── blog.route.js  # Blog routes
│   └── server.js          # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/     # Admin components
│   │   │   ├── BlogCard.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── admin/     # Admin pages
│   │   │   ├── Home.jsx
│   │   │   └── Blog.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   └── assets/        # Images and assets
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Blog Routes
- `POST /api/blog/add` - Create new blog
- `GET /api/blog/all` - Get all published blogs
- `GET /api/blog/:id` - Get specific blog
- `POST /api/blog/delete` - Delete blog
- `POST /api/blog/toggle-publish` - Toggle publish status
- `POST /api/blog/generate` - Generate AI content
- `POST /api/blog/comment` - Add comment
- `GET /api/blog/comments/:id` - Get blog comments

### Admin Routes
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/blogs` - Get all blogs (admin)
- `GET /api/admin/comments` - Get all comments
- `POST /api/admin/delete-comment` - Delete comment

## 🎨 Features in Detail

### AI Content Generation
- Uses Google Gemini AI to generate blog content
- Automatically formats content with proper HTML structure
- Supports various writing styles and topics
- Generates SEO-friendly content with headings and paragraphs

### Image Management
- ImageKit integration for optimized image delivery
- Automatic image compression and format conversion
- CDN delivery for fast loading
- Responsive image sizing

### Rich Text Editor
- Quill.js integration for advanced text editing
- Support for formatting, lists, and styling
- Real-time preview
- HTML content handling

### Authentication & Security
- JWT-based authentication
- Protected admin routes
- Secure file uploads
- Input validation and sanitization

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Vercel, or DigitalOcean
3. Configure MongoDB connection
4. Set up ImageKit and Gemini AI credentials

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like Netlify, Vercel, or GitHub Pages
3. Configure API endpoint URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for content generation
- ImageKit for image optimization
- Quill.js for rich text editing
- Tailwind CSS for styling
- React community for excellent documentation

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Quick Blogs** - Empowering content creators with AI-driven blogging solutions.
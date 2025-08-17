import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const {axios, setToken} = useAppContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/admin/login', {email, password})

      if(data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-md rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light text-gray-600">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full text-gray-700">
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="your email id"
                required
                className="w-full border-b-2 border-gray-300 p-2 outline-none focus:border-primary"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="your password"
                required
                className="w-full border-b-2 border-gray-300 p-2 outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

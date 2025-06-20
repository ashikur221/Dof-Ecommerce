// ✅ Combined Login & Register Pages with Tailwind CSS (Modern Design)

import { useState } from 'react';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const axiosPublic = useAxiosPublic();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading('Loading....');
    e.preventDefault();

    const url = isLogin ? '/login' : '/register';

    try {
      const res = await axiosPublic.post(`${url}`, formData);

      if (isLogin) {
        const token = res.data.token;
        localStorage.setItem('token', token);

        // ✅ Fetch user info securely
        const userRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = userRes.data;
        localStorage.setItem('role', user.role); // Store role for PrivateRoute

        toast.success('Login successful', { id: toastId });
        navigate('/');
      } else {
        toast.success('Registration successful. You can now log in.', { id: toastId });
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong', { id: toastId });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e8f0ff] to-[#eafdfc] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium text-sm text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-sm text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 text-sm"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>


          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-sm transition-all"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleMode}
            className="text-blue-500 hover:underline font-medium"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { useState } from 'react';

const Register = () => {
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiBase}/users/register`, {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (response.data.success) {
        alert("Registration Successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#d3f3fd] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]
"
    >
      <div className="w-95 bg-white/80 border border-white rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl text-[#2B3A55] font-extrabold text-center mb-10">
          Register
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="relative my-7">
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="peer block w-full py-2 px-0 text-sm text-[#2B3A55] bg-transparent border-0 border-b-2 border-[#FF9ECF]/70 appearance-none focus:outline-none focus:border-[#FF7FBF] transition-all"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-[#2B3A55]/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-6
              peer-focus:text-[#FF7FBF]"
            >
              Your Email
            </label>
            <BiUser className="absolute top-3 right-2 text-[#6EDCFF] peer-focus:text-[#FF7FBF] transition" />
          </div>

          <div className="relative my-7">
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="peer block w-full py-2 px-0 text-sm text-[#2B3A55] bg-transparent border-0 border-b-2 border-[#FFE97A]/70 appearance-none focus:outline-none focus:border-[#FFD84D] transition-all"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-[#2B3A55]/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-6
              peer-focus:text-[#FFD84D]"
            >
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-3 right-2 text-[#FF9ECF] peer-focus:text-[#FFD84D] transition" />
          </div>

          <div className="relative my-8">
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="peer block w-full py-2 px-0 text-sm text-[#2B3A55] bg-transparent border-0 border-b-2 border-[#FFE97A]/70 appearance-none focus:outline-none focus:border-[#FFD84D] transition-all"
              placeholder=""
            />
            <label
              htmlFor=""
              className="absolute text-sm text-[#2B3A55]/70 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-6
              peer-focus:text-[#FFD84D]"
            >
              Confirm Password
            </label>
            <AiOutlineUnlock className="absolute top-3 right-2 text-[#FF9ECF] peer-focus:text-[#FFD84D] transition" />
          </div>

          {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF9ECF] text-pink-700 font-semibold py-2.5 rounded-full mb-6
            shadow-md hover:shadow-lg hover:bg-[#FF7FBF] active:scale-[0.98] transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-center text-sm text-[#2B3A55]">
            Have an Account?{" "}
            <Link
              to="/login"
              className="text-[#6EDCFF] font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
  }

export default Register;

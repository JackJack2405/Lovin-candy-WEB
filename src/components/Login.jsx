import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import axios from "axios";

const Login = () => {
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${apiBase}/users/login`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login Successful!");
        navigate("/");
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email or Password incorrect");
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
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="relative my-7">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
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
              peer-focus:text-[#000000]"
            >
              Your Email
            </label>
            <BiUser className="absolute top-3 right-2 text-[#6EDCFF] peer-focus:text-[#FF7FBF] transition" />
          </div>

          <div className="relative my-8">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              peer-focus:text-[#000000]"
            >
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-3 right-2 text-[#FF9ECF] peer-focus:text-[#FFD84D] transition" />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center mb-4">{error}</p>
          )}

          <div className="flex justify-between items-center text-sm text-[#2B3A55] mb-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#FF9ECF]" />
              <span>Remember Me</span>
            </div>
            <Link to="" className="text-[#6EDCFF] font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF9ECF] text-pink-700
            font-semibold py-2.5 rounded-full mb-6
            shadow-md hover:shadow-lg hover:bg-[#FF7FBF] active:scale-[0.98] transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm text-[#2B3A55]">
            New Here?{" "}
            <Link
              to="/register"
              className="text-[#6EDCFF] font-medium hover:underline"
            >
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const api = "https://backend.magnateshop.uz/api/auth/login";

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.warning("Please fill out all fields");
      return;
    }

    setLoading(true);

    const loginINFO = {
      login: username,
      password: password,
    };

    axios
      .post(api, loginINFO)
      .then((res) => {
        const response = res.data;
        const accessToken = response.data.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);

          const message = response.message;
          toast.success(message);

          setTimeout(() => {
            navigate("/dashboard");
          }, 800);
        }
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0F172A] mb-4">
            <span className="text-white text-xl font-bold">M</span>
          </div>

          <h1 className="text-2xl font-bold text-[#0F172A]">Welcome back</h1>

          <p className="text-sm text-gray-500 mt-2">
            Sign in to your admin panel
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-[0_8px_30px_rgb(15,23,42,0.06)]">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsername}
                className="w-full h-12 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl outline-none text-[#0F172A] placeholder:text-gray-400 focus:border-[#0F172A] focus:bg-white transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePassword}
                className="w-full h-12 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl outline-none text-[#0F172A] placeholder:text-gray-400 focus:border-[#0F172A] focus:bg-white transition duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-medium transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Admin Dashboard
        </p>
      </div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Login;

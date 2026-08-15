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
          localStorage.setItem("token", accessToken);

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
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center px-5 text-zinc-100 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400 font-mono font-black text-xl mb-4 shadow-lg shadow-cyan-500/10">
            M
          </div>

          <h1 className="text-2xl font-black text-white uppercase tracking-wider">
            Welcome back
          </h1>

          <p className="text-xs text-zinc-500 mt-2">
            Sign in to your admin panel
          </p>
        </div>

        <div className="bg-[#111827]/80 border border-zinc-800 rounded-xl p-7 shadow-2xl backdrop-blur-md">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsername}
                className="w-full h-11 px-4 bg-[#0B0F17] border border-zinc-800 rounded-lg outline-none text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-cyan-500 transition duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePassword}
                className="w-full h-11 px-4 bg-[#0B0F17] border border-zinc-800 rounded-lg outline-none text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-cyan-500 transition duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-1 shadow-lg shadow-cyan-500/20"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs font-mono text-zinc-600 mt-6">
          Admin Dashboard
        </p>
      </div>

      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default Login;

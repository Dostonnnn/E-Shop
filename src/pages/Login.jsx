import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setRole }) => {
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
      toast.warning("Please fill out");
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
        const { accessToken } = response.data;
        console.log(accessToken);
        const role = response.data.admin.fullName;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          setRole(role);
          toast.success(res.data.message);
          navigate("/dashboard");
        }
      })
      .catch(() => {
        toast.error("Error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5">
      <div className="w-full max-w-sm bg-[#0F172A] p-6 rounded-lg border border-slate-200">
        <h1 className="text-2xl text-center font-bold text-[#F8FAFC] mb-5">
          Admin Panel
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
            className="w-full h-11 px-3 border border-slate-300 rounded-lg outline-none text-slate-900"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            className="w-full h-11 px-3 border border-slate-300 rounded-lg outline-none text-slate-900"
          />

          <button
            type="submit"
            className="w-full h-11 bg-[#10B981] hover:bg-[#10B981] text-white rounded-lg transition duration-300 cursor-pointer"
          >
            {loading ? "Loading" : "Enter"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;

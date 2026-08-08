import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useState } from "react";

export default function App() {
  const [role, setRole] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/dashboard" element={<Dashboard role={role} />} />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

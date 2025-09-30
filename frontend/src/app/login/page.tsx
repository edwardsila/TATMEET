"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = [];
    if (!email.trim()) newErrors.push("Email is required.");
    else if (!validateEmail(email)) newErrors.push("Email is invalid.");
    if (!password) newErrors.push("Password is required.");
    setErrors(newErrors);
    setSuccess("");
    if (newErrors.length === 0) {
      try {
        const res = await axios.post("/api/login", { email, password });
        localStorage.setItem("tatm33t_token", res.data.token);
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } catch (err: any) {
        setErrors([err?.response?.data?.message || "Login failed"]);
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-950 rounded-xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-2 text-red-500 tracking-widest">TATM33T</h2>
        <h3 className="text-lg font-semibold mb-6 text-gray-200">Sign in to your account</h3>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-lg transition">Login</button>
        </form>
        {/* Toast notifications for errors and success */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
          {errors.map((err, idx) => (
            <div
              key={idx}
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in"
              style={{ animation: 'fade-in 0.5s' }}
            >
              {err}
            </div>
          ))}
          {success && (
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in" style={{ animation: 'fade-in 0.5s' }}>{success}</div>
          )}
        </div>
        <div className="mt-6 text-gray-400 text-sm">
          Don't have an account? <a href="/register" className="text-red-400 hover:underline">Register</a>
        </div>
      </div>
    </main>
  );
}
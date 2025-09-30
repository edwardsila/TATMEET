"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = [];
  if (!name.trim()) newErrors.push("Name is required.");
  if (!email.trim()) newErrors.push("Email is required.");
  else if (!validateEmail(email)) newErrors.push("Email is invalid.");
  if (!password) newErrors.push("Password is required.");
  if (!confirmPassword) newErrors.push("Confirm password is required.");
  if (password && confirmPassword && password !== confirmPassword) newErrors.push("Passwords do not match.");
  if (!role) newErrors.push("Please select your role.");
    setErrors(newErrors);
    setSuccess("");
    if (newErrors.length === 0) {
      try {
        await axios.post("/api/users/register", { name, email, password, role });
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } catch (err: any) {
        setErrors([err?.response?.data?.message || "Registration failed"]);
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-950 rounded-xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-2 text-red-500 tracking-widest">TATM33T</h2>
        <h3 className="text-lg font-semibold mb-6 text-gray-200">Create your account</h3>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <select
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="client">Client</option>
            <option value="artist">Tattoo Artist</option>
          </select>
          <button type="submit" className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-lg transition">Register</button>
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
          Already have an account? <a href="/login" className="text-red-400 hover:underline">Login</a>
        </div>
      </div>
    </main>
  );
}
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientHome() {
  const [search, setSearch] = useState("");
  const [loading] = useState(false);
  const [portfolios] = useState([
    {
      imageUrl: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
      user: { name: "Alex Inkster" },
      title: "Neo Traditional Sleeve"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      user: { name: "Maya Stencil" },
      title: "Blackwork Mandala"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      user: { name: "Chris Shade" },
      title: "Realism Portrait"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      user: { name: "Luna Dot" },
      title: "Dotwork Geometry"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      user: { name: "Sam Rose" },
      title: "Watercolor Flower"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      user: { name: "Jade Script" },
      title: "Script Quote"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
      user: { name: "Rico Geometric" },
      title: "Geometric Pattern"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
      user: { name: "Nina Minimal" },
      title: "Minimalist Line"
    }
  ]);
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-0">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center bg-gradient-to-r from-red-900 via-gray-900 to-black overflow-hidden mb-8">
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1f2937" fillOpacity="0.7" d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,117.3C840,128,960,192,1080,218.7C1200,245,1320,235,1380,229.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-red-500 drop-shadow-lg tracking-widest animate-fade-in">Welcome to TATM33T</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 drop-shadow-lg animate-fade-in">Find your perfect tattoo artist</h3>
        </div>
      </section>
      {/* Search bar */}
      <div className="w-full flex justify-center mb-8 px-8">
        <input
          type="text"
          placeholder="Search artists, portfolio titles..."
          className="w-full max-w-xl px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Booking and notifications shortcuts */}
      <div className="w-full flex justify-center gap-8 mt-4 mb-12">
        <button className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-lg transition">Book an Artist</button>
        <button className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg transition">View Notifications</button>
      </div>
      {/* Artist gallery placeholder */}
      <div className="w-full">
        <h3 className="text-2xl font-bold mb-6 text-red-400 text-center">Featured Tattoos & Stencils</h3>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {
              portfolios.filter(item => {
                const artist = item.user?.name?.toLowerCase() || "";
                const title = item.title?.toLowerCase() || "";
                const query = search.toLowerCase();
                return artist.includes(query) || title.includes(query);
              }).length === 0 ? (
                <div className="text-center text-gray-400 col-span-4">No portfolios to display yet.</div>
              ) : (
                portfolios.filter(item => {
                  const artist = item.user?.name?.toLowerCase() || "";
                  const title = item.title?.toLowerCase() || "";
                  const query = search.toLowerCase();
                  return artist.includes(query) || title.includes(query);
                }).map((item, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl shadow-xl bg-gray-900 border border-gray-800 cursor-pointer w-full max-w-xs">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"}
                      alt={item.title + " by " + (item.user?.name || "Unknown Artist")}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex flex-col items-center justify-center transition duration-300">
                      <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 mb-2">{item.user?.name || "Unknown Artist"}</span>
                      <span className="text-red-300 text-sm opacity-0 group-hover:opacity-100">{item.title || "Tattoo"}</span>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        )}
      </div>
    </main>
  );
}

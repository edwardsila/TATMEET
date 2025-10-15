"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ArtistHome() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/portfolios")
      .then(res => {
        // Filter portfolios to only those belonging to the logged-in artist
        // Replace 'artistId' with the actual logged-in artist's id if available
        const artistId = localStorage.getItem("tatm33t_user_id");
        const filtered = artistId
          ? res.data.filter((item: any) => item.user?.id === artistId)
          : res.data;
        setPortfolio(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-red-500 drop-shadow-lg tracking-widest animate-fade-in">Welcome, Artist!</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-200 drop-shadow-lg animate-fade-in">Showcase your work & manage bookings</h3>
        </div>
      </section>
      {/* Booking and notifications shortcuts */}
      <div className="w-full flex justify-center gap-8 mt-4 mb-12">
        <button
          className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-lg transition"
          onClick={() => router.push("/dashboard/artist")}
        >
          View Bookings
        </button>
        <button
          className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg transition"
          onClick={() => router.push("/notifications")}
        >
          Notifications
        </button>
        <button
          className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-lg transition"
          onClick={() => setShowModal(true)}
        >
          Add Portfolio Item
        </button>
      </div>
      {/* Add Portfolio Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-950 rounded-xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-red-400">Add Portfolio Item</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
            />
            <div className="flex gap-4 mt-4">
              <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold" onClick={() => setShowModal(false)}>Save</button>
              <button className="px-4 py-2 rounded-lg bg-gray-700 text-white font-bold" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Portfolio Gallery */}
      <div className="w-full">
        <h3 className="text-2xl font-bold mb-6 text-red-400 text-center">Your Portfolio</h3>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {portfolio.length === 0 ? (
              <div className="text-center text-gray-400 col-span-4">No portfolio items yet.</div>
            ) : (
              portfolio.map((item, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl shadow-xl bg-gray-900 border border-gray-800 cursor-pointer w-full max-w-xs">
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"}
                    alt={item.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex flex-col items-center justify-center transition duration-300">
                    <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 mb-2">{item.title}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}

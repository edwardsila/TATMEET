"use client";
import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Alex M.",
    text: "TATM33T helped me find the perfect artist for my first tattoo. The booking process was seamless!",
    avatar: "/vercel.svg",
  },
  {
    name: "TattooQueen",
    text: "I’ve connected with so many new clients and showcased my work easily. Love the platform!",
    avatar: "/next.svg",
  },
  {
    name: "Sam K.",
    text: "The portfolios are inspiring and the community is super friendly. Highly recommended!",
    avatar: "/window.svg",
  },
];

const faqs = [
  {
    q: "How do I book a tattoo session?",
    a: "Browse artists, view their portfolios, and use the booking feature to schedule your session.",
  },
  {
    q: "Can I message artists directly?",
    a: "Yes! You can chat with artists to discuss your ideas and availability.",
  },
  {
    q: "Is TATM33T free to use?",
    a: "Absolutely! Browsing, booking, and joining the community are all free.",
  },
];

export default function Home() {
  // Animated counters
  const [artistCount, setArtistCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  useEffect(() => {
    let ac = 0, bc = 0, cc = 0;
    const interval = setInterval(() => {
      if (ac < 120) ac += 4;
      if (bc < 350) bc += 10;
      if (cc < 500) cc += 15;
      setArtistCount(ac);
      setBookingCount(bc);
      setClientCount(cc);
      if (ac >= 120 && bc >= 350 && cc >= 500) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Testimonials carousel
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx(idx => (idx + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans flex flex-col items-center">
      {/* Hero Section with Parallax */}
      <section className="w-full max-w-5xl text-center py-24 px-4 flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-96 h-96 bg-red-500/20 rounded-full blur-3xl absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="w-72 h-72 bg-blue-500/20 rounded-full blur-3xl absolute bottom-0 right-1/3 translate-x-1/2 translate-y-1/2 animate-pulse" />
        </div>
        <h1 className="text-6xl sm:text-7xl font-black mb-8 tracking-tight drop-shadow-xl z-10">
          <span className="text-white">Unleash Your </span>
          <span className="text-red-500">Inkspiration</span>
        </h1>
        <p className="text-2xl sm:text-3xl mb-10 text-gray-200 z-10 max-w-2xl mx-auto">
          TATM33T connects you to the world’s best tattoo artists. Discover, book, and share your story through art.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 z-10">
          <a href="/artist" className="px-10 py-4 bg-red-500 hover:bg-red-600 rounded-full font-bold shadow-xl text-xl transition transform hover:scale-110 hover:-translate-y-1 animate-bounce-slow">Browse Artists</a>
          <a href="/booking" className="px-10 py-4 bg-gray-800 hover:bg-gray-700 rounded-full font-bold shadow-xl text-xl transition transform hover:scale-110 hover:-translate-y-1 animate-bounce-slow">Book a Session</a>
        </div>
        <div className="flex justify-center gap-8 mt-8 z-10">
          <img src="/file.svg" alt="Tattoo Icon" className="w-16 h-16 opacity-90" />
          <img src="/globe.svg" alt="Globe Icon" className="w-16 h-16 opacity-90" />
          <img src="/window.svg" alt="Window Icon" className="w-16 h-16 opacity-90" />
        </div>
      </section>

      {/* Animated Counters */}
      <section className="w-full max-w-4xl py-8 px-4 flex justify-center gap-12">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-extrabold text-red-400">{artistCount}+</span>
          <span className="text-lg text-gray-300 mt-2">Artists</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-extrabold text-blue-400">{bookingCount}+</span>
          <span className="text-lg text-gray-300 mt-2">Bookings</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-extrabold text-green-400">{clientCount}+</span>
          <span className="text-lg text-gray-300 mt-2">Happy Clients</span>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="w-full max-w-2xl py-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-red-400 text-center">What People Say</h2>
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center transition-all duration-500">
          <img src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} className="w-16 h-16 mb-4 rounded-full border-4 border-red-500 shadow-lg" />
          <p className="text-xl text-gray-200 mb-2 italic">"{testimonials[testimonialIdx].text}"</p>
          <span className="text-lg font-bold text-red-400">{testimonials[testimonialIdx].name}</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-4xl py-12 px-4">
        <h2 className="text-4xl font-extrabold mb-8 text-red-400 text-center">Why TATM33T?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-red-500/30 to-gray-800 rounded-xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-5xl mb-4">🎨</span>
            <h3 className="text-xl font-bold mb-2">Top Artists</h3>
            <p className="text-gray-300">Connect with the best tattoo artists and studios worldwide.</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/30 to-gray-800 rounded-xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-5xl mb-4">🖼️</span>
            <h3 className="text-xl font-bold mb-2">Diverse Portfolios</h3>
            <p className="text-gray-300">Explore unique styles and find your perfect match.</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/30 to-gray-800 rounded-xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition">
            <span className="text-5xl mb-4">📅</span>
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-gray-300">Book appointments seamlessly and manage your sessions.</p>
          </div>
        </div>
      </section>

      {/* Featured Portfolios Section with Hover Effects */}
      <section className="w-full max-w-5xl py-12 px-4">
        <h2 className="text-4xl font-extrabold mb-8 text-red-400 text-center">Featured Portfolios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Example artist cards, replace with dynamic data later */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center transition-all duration-300 border-2 border-red-500/30 group hover:scale-105 hover:bg-gray-800 hover:border-red-500">
            <img src="/vercel.svg" alt="Artist" className="w-24 h-24 mb-4 rounded-full border-4 border-red-500 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">InkMaster</h3>
            <p className="text-gray-400 mb-2">Specializes in realism and blackwork.</p>
            <a href="/artist/1" className="text-red-400 hover:underline font-semibold">View Portfolio</a>
            <div className="opacity-0 group-hover:opacity-100 mt-4 transition-opacity duration-300 text-sm text-gray-300">10+ years experience</div>
          </div>
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center transition-all duration-300 border-2 border-red-500/30 group hover:scale-105 hover:bg-gray-800 hover:border-red-500">
            <img src="/next.svg" alt="Artist" className="w-24 h-24 mb-4 rounded-full border-4 border-red-500 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">TattooQueen</h3>
            <p className="text-gray-400 mb-2">Colorful neo-traditional designs.</p>
            <a href="/artist/2" className="text-red-400 hover:underline font-semibold">View Portfolio</a>
            <div className="opacity-0 group-hover:opacity-100 mt-4 transition-opacity duration-300 text-sm text-gray-300">Award-winning artist</div>
          </div>
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center transition-all duration-300 border-2 border-red-500/30 group hover:scale-105 hover:bg-gray-800 hover:border-red-500">
            <img src="/window.svg" alt="Artist" className="w-24 h-24 mb-4 rounded-full border-4 border-red-500 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">ShadowLine</h3>
            <p className="text-gray-400 mb-2">Expert in fine line and minimalism.</p>
            <a href="/artist/3" className="text-red-400 hover:underline font-semibold">View Portfolio</a>
            <div className="opacity-0 group-hover:opacity-100 mt-4 transition-opacity duration-300 text-sm text-gray-300">Minimalist specialist</div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="w-full max-w-2xl py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-red-400 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-gray-900 rounded-xl shadow-lg p-6">
              <button
                className="w-full text-left text-lg font-semibold text-red-400 focus:outline-none flex justify-between items-center"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                {faq.q}
                <span className={`ml-2 transition-transform duration-300 ${openFaq === idx ? 'rotate-90' : ''}`}>▶</span>
              </button>
              {openFaq === idx && (
                <div className="mt-4 text-gray-300 text-base animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s;
        }
      `}</style>
    </main>
  );
}

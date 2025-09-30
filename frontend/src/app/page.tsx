
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      <section className="w-full max-w-3xl text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
          Welcome to <span className="text-red-500">TATM33T</span>
        </h1>
        <p className="text-xl mb-8 text-gray-200">
          Discover stunning tattoo art, connect with talented artists, and book your next session. Your journey to self-expression starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a href="/artist" className="px-8 py-3 bg-red-500 hover:bg-red-600 rounded-full font-bold shadow-lg transition">Browse Artists</a>
          <a href="/booking" className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-full font-bold shadow-lg transition">Book a Session</a>
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <img src="/file.svg" alt="Tattoo Icon" className="w-12 h-12 opacity-80" />
          <img src="/globe.svg" alt="Globe Icon" className="w-12 h-12 opacity-80" />
          <img src="/window.svg" alt="Window Icon" className="w-12 h-12 opacity-80" />
        </div>
      </section>
      <section className="w-full max-w-4xl py-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-red-400">Featured Portfolios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Example artist cards, replace with dynamic data later */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
            <img src="/vercel.svg" alt="Artist" className="w-20 h-20 mb-4 rounded-full border-4 border-red-500" />
            <h3 className="text-xl font-semibold mb-2">InkMaster</h3>
            <p className="text-gray-400 mb-2">Specializes in realism and blackwork.</p>
            <a href="/artist/1" className="text-red-400 hover:underline">View Portfolio</a>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
            <img src="/next.svg" alt="Artist" className="w-20 h-20 mb-4 rounded-full border-4 border-red-500" />
            <h3 className="text-xl font-semibold mb-2">TattooQueen</h3>
            <p className="text-gray-400 mb-2">Colorful neo-traditional designs.</p>
            <a href="/artist/2" className="text-red-400 hover:underline">View Portfolio</a>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
            <img src="/window.svg" alt="Artist" className="w-20 h-20 mb-4 rounded-full border-4 border-red-500" />
            <h3 className="text-xl font-semibold mb-2">ShadowLine</h3>
            <p className="text-gray-400 mb-2">Expert in fine line and minimalism.</p>
            <a href="/artist/3" className="text-red-400 hover:underline">View Portfolio</a>
          </div>
        </div>
      </section>
    </main>
  );
}

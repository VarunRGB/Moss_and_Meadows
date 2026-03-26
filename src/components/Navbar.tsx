import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 w-full flex justify-center z-50">
      
      {/* OUTER WRAPPER (for blur glow) */}
      <div className="relative w-[90%] max-w-6xl">
        
        {/* BLURRED EDGE LAYER */}
        <div className="absolute inset-0 rounded-2xl bg-white/40 blur-xl opacity-60"></div>

        {/* MAIN NAVBAR */}
        <nav className="relative bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl px-8 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <h1 className="text-xl font-semibold tracking-wide text-gray-800">
            Moss & <span className="text-green-700">Meadows</span>
          </h1>

          {/* LINKS */}
          <div className="flex gap-8 items-center text-gray-600 text-sm font-medium">
            <Link href="/" className="hover:text-green-700 transition">
              Home
            </Link>
            <Link href="/shop" className="hover:text-green-700 transition">
              Shop
            </Link>
            <Link href="/new-arrivals" className="hover:text-green-700 transition">
              New Arrivals
            </Link>
            <Link href="/contact" className="hover:text-green-700 transition">
              Contact
            </Link>

            {/* BUTTON */}
            <Link
              href="/admin"
              className="ml-4 px-5 py-2 rounded-full bg-green-700 text-white hover:bg-green-800 transition"
            >
              Login
            </Link>
          </div>
        </nav>

      </div>
    </div>
  );
}
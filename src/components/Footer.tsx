import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white w-full">
        
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 items-start">
          
          {/* BRAND */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 leading-none">
              Moss & <span className="text-green-400">Meadows</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bringing nature closer to your home with carefully curated plants 
              and premium greenery.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wider text-xs text-white/50">
              Shop
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link href="#" className="hover:text-green-400 transition">All Plants</Link></li>
              <li><Link href="#" className="hover:text-green-400 transition">Indoor</Link></li>
              <li><Link href="#" className="hover:text-green-400 transition">Outdoor</Link></li>
              <li><Link href="#" className="hover:text-green-400 transition">Succulents</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wider text-xs text-white/50">
              Company
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link href="#" className="hover:text-green-400 transition">About</Link></li>
              <li><Link href="#" className="hover:text-green-400 transition">Contact</Link></li>
              <li><Link href="#" className="hover:text-green-400 transition">Care Guide</Link></li>
              <li><Link href="#" className="hover:text-green-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wider text-xs text-white/50">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Get plant care tips & new arrivals.
            </p>

            <div className="flex group">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white focus:text-black transition-all"
              />
              <button className="bg-green-600 px-4 rounded-r-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-8 text-center text-xs text-gray-500 tracking-wide uppercase">
        © {new Date().getFullYear()} Moss & Meadows. All rights reserved.
      </div>
    </footer>
  );
}
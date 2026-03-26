import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-green-50 py-16 pt-30">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <p className="bg-green-100 inline-block px-3 py-1 rounded-full text-green-700 mb-4">
            Welcome to Moss & Meadows
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Bring Nature <span className="text-green-600">Into</span> Your Home
          </h1>

          <p className="text-gray-600 mb-6">
            Discover our curated collection of beautiful plants.
          </p>

          <div className="flex gap-4">
            <button className="btn-primary">Shop All Plants →</button>
            <button className="btn-secondary">View New Arrivals</button>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/hero.jpg"
            width={500}
            height={400}
            className="rounded-xl"
            alt="plants"
          />

          <div className="absolute -bottom-6 left-6 bg-white shadow-lg px-5 py-3 rounded-xl">
            <h3 className="text-green-600 text-xl font-bold">12+</h3>
            <p className="text-sm">Plants Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
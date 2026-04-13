"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import { cartApi, normalizeList, plantApi } from "@/lib/api";

type Plant = {
  _id: string; // MongoDB ID is essential for the cart
  name: string;
  price: string | number;
  image?: string;
  description?: string;
};

export default function Home() {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await plantApi.getPlants();
        // Use normalizeList to handle the array safely
        setPlants(normalizeList(data));
      } catch (err: any) {
        setError(err.message || "Failed to load plants");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Updated to use the corrected cartApi.addToCart signature
  const handleAddToCart = async (e: React.MouseEvent, plantId: string) => {
    e.stopPropagation(); // Prevents navigating to the detail page
    try {
      // Passes plant_id as string and quantity as 1
      await cartApi.addToCart(plantId, 1);
      alert("Added to cart!");
    } catch (err: any) {
      alert(err.message || "Please login to add items to cart");
    }
  };

  const featured = plants.slice(0, 4);

  return (
    <main style={{ backgroundColor: '#fdfaf5', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Features />

      {error && (
        <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '16px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '12px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* Featured Plants Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <p style={{ color: '#008a45', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Our Collection</p>
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>Featured Plants</h2>
            </div>
            <button 
              onClick={() => router.push('/shop')}
              style={{ background: 'none', border: 'none', color: '#4a5568', fontWeight: '700', cursor: 'pointer' }}
            >
              View All →
            </button>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#718096' }}>Loading plants...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '30px' }}>
              {featured.map((plant) => (
                <div 
                  key={plant._id}
                  onClick={() => router.push(`/plants/${encodeURIComponent(plant.name)}`)}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                >
                  <ProductCard
                    id={plant._id} // Pass the real MongoDB ID here
                    title={plant.name}
                    price={plant.price}
                    image={plant.image}
                    // Pass the event and the ID to our handler
                    onAddToCart={(id) => handleAddToCart(window.event as any, id as string)} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ backgroundColor: '#f9f6f0', padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1a1a1a', marginBottom: '16px' }}>Shop by Category</h2>
            <p style={{ color: '#718096', fontSize: '18px' }}>Find the perfect green companion for every corner of your home.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <CategoryCard title="Indoor" image="/hero.jpg" href="/shop" />
            <CategoryCard title="Outdoor" image="/hero.jpg" href="/shop" />
            <CategoryCard title="Bulk" image="/hero.jpg" href="/shop" />
            <CategoryCard title="Decorative" image="/hero.jpg" href="/shop" />
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
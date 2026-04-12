"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Added for navigation
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import { cartApi, normalizeList, plantApi } from "@/lib/api";

type Plant = {
  id?: string | number;
  _id?: string | number;
  name: string;
  price: string | number;
  image?: string;
  description?: string;
};

export default function Home() {
  const router = useRouter(); // Initialize router
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await plantApi.getPlants();
        setPlants(normalizeList(data));
      } catch (err: any) {
        setError(err.message || "Failed to load plants");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddToCart = async (e: React.MouseEvent, plantId: string | number) => {
    // We stop propagation so clicking the button doesn't trigger the card navigation
    e.stopPropagation();
    try {
      await cartApi.addToCart({ plant_id: plantId, quantity: 1 });
      alert("Added to cart");
    } catch (err: any) {
      alert(err.message || "Could not add to cart");
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
              {featured.map((plant, index) => (
                <div 
                  key={index}
                  // USE ENCODED NAME AS ID (Matching Shop Logic)
                  onClick={() => router.push(`/plants/${encodeURIComponent(plant.name)}`)}
                  style={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                >
                  <ProductCard
                    id={plant.name} // Passing name as the ID
                    title={plant.name}
                    price={plant.price}
                    image={plant.image}
                    // We wrap the add to cart call to prevent it from navigating
                    onAddToCart={(plantId) => console.log("Button clicked", plantId)} 
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

          {/* Categories Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <CategoryCard 
              title="Indoor" 
              image="/hero.jpg" 
              href="/shop" // The card handles the ?category=indoor part automatically
            />
            <CategoryCard 
              title="Outdoor" 
              image="/hero.jpg" 
              href="/shop"
            />
            <CategoryCard 
              title="Bulk" 
              image="/hero.jpg" 
              href="/shop"
            />
            <CategoryCard 
              title="Decorative" 
              image="/hero.jpg" 
              href="/shop"
            />
          </div>
        </div>
      </section>
      
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cartApi, normalizeList, plantApi } from "@/lib/api";

const COLORS = {
  bg: "#fbfaf8",
  textMain: "#3f342c",
  textDim: "#8e8175",
  brandGreen: "#008a45",
  darkBrown: "#2D241E",
  border: "#ddd2bf"
};

export default function PlantDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [plant, setPlant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        // Fetch the full catalog
        const data = await plantApi.getPlants();
        const list = normalizeList(data);
        
        // Find the plant by its unique Database ID (_id)
        const found = list.find((p: any) => 
          (p._id || p.id) === params.id
        );
        
        setPlant(found || null);
      } catch (err) {
        console.error("Error fetching plant details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchPlant();
  }, [params.id]);

  const addToCart = async () => {
    if (!plant) return;
    const plantId = plant._id || plant.id;

    try {
      // Corrected call to match your api.ts: addToCart(id, quantity)
      await cartApi.addToCart(plantId, 1);
      alert(`The ${plant.name} has been added to your collection!`);
    } catch (err: any) {
      if (err.message.includes("401")) {
        alert("Please login to add items to your cart.");
        router.push("/login");
      } else {
        alert("Could not add to cart. Please try again.");
      }
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 24px 80px' }}>
        <button 
          onClick={() => router.back()} 
          style={{ background: 'none', border: 'none', color: COLORS.textDim, cursor: 'pointer', marginBottom: '40px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}
        >
          ← BACK TO SHOP
        </button>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: COLORS.textDim, fontStyle: 'italic' }}>
            Reading the botanical journals...
          </div>
        ) : plant ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>
            
            {/* Image Section */}
            <div style={{ borderRadius: '40px', overflow: 'hidden', height: '600px', backgroundColor: '#f3ede4', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' }}>
              <img src={plant.image || "/hero.jpg"} alt={plant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Details Section */}
            <div>
              <span style={{ fontSize: '10px', fontWeight: '700', color: COLORS.brandGreen, textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                {plant.category || "Native Specimen"}
              </span>
              
              <h1 style={{ fontSize: '3.5rem', color: COLORS.textMain, margin: '20px 0', fontFamily: 'serif', fontWeight: '500' }}>
                {plant.name}
              </h1>
              
              <div style={{ fontSize: '28px', fontWeight: '400', color: COLORS.textMain, marginBottom: '32px', borderBottom: `1px solid ${COLORS.border}40`, paddingBottom: '20px' }}>
                ₹{plant.price}
              </div>
              
              <p style={{ lineHeight: '1.8', color: COLORS.textDim, marginBottom: '40px', fontSize: '16px' }}>
                {plant.description || "A beautiful addition to any space, this carefully curated botanical specimen is known for its resilience and air-purifying qualities."}
              </p>

              <div style={{ marginBottom: '40px' }}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: COLORS.textMain, marginBottom: '10px' }}>AVAILABILITY</p>
                <p style={{ color: COLORS.brandGreen, fontWeight: '600' }}>
                  {plant.stock > 0 ? `In Stock (${plant.stock} available)` : "Out of Stock"}
                </p>
              </div>
              
              <button
                onClick={addToCart}
                disabled={plant.stock <= 0}
                style={{ 
                  backgroundColor: plant.stock > 0 ? COLORS.darkBrown : COLORS.textDim, 
                  color: 'white', 
                  padding: '20px 60px', 
                  borderRadius: '100px', 
                  border: 'none', 
                  cursor: plant.stock > 0 ? 'pointer' : 'not-allowed', 
                  fontWeight: '700',
                  letterSpacing: '1px',
                  transition: 'transform 0.2s ease'
                }}
              >
                {plant.stock > 0 ? "ADD TO BASKET" : "UNAVAILABLE"}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ color: COLORS.textMain }}>Specimen Not Found</h2>
            <p style={{ color: COLORS.textDim }}>The plant you are looking for has been moved or is no longer in our catalog.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
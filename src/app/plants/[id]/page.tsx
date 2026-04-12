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
  darkBrown: "#2D241E"
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
        const data = await plantApi.getPlants();
        const list = normalizeList(data);
        
        // Decode the ID from the URL (e.g., "Peace%20Lily" becomes "Peace Lily")
        const decodedName = decodeURIComponent(params.id);
        
        // Find the plant that matches the name exactly
        const found = list.find((p: any) => 
          p.name.toLowerCase() === decodedName.toLowerCase()
        );
        
        setPlant(found || null);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchPlant();
  }, [params.id]);

  const addToCart = async () => {
    if (!plant) return;
    try {
      // Since name is the ID, we use it here
      await cartApi.addToCart({ plant_id: plant.name, quantity: 1 });
      alert(`${plant.name} added to cart!`);
    } catch (err) {
      alert("Could not add to cart");
    }
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 24px 80px' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: COLORS.textDim, cursor: 'pointer', marginBottom: '40px' }}>
          ← BACK TO SHOP
        </button>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: COLORS.textDim }}>LOADING...</div>
        ) : plant ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', height: '600px', backgroundColor: '#f3ede4' }}>
              <img src={plant.image || "/hero.jpg"} alt={plant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div>
              <span style={{ fontSize: '10px', fontWeight: '700', color: COLORS.brandGreen, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                {plant.category || "House Plant"}
              </span>
              <h1 style={{ fontSize: '3.5rem', color: COLORS.textMain, margin: '16px 0' }}>{plant.name}</h1>
              <div style={{ fontSize: '24px', fontWeight: '600', color: COLORS.textMain, marginBottom: '32px' }}>₹{plant.price}</div>
              <p style={{ lineHeight: '1.8', color: COLORS.textDim, marginBottom: '40px' }}>{plant.description}</p>
              
              <button
                onClick={addToCart}
                style={{ backgroundColor: COLORS.darkBrown, color: 'white', padding: '18px 48px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700' }}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>Plant not found.</div>
        )}
      </main>
    </div>
  );
}
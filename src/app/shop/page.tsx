"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { normalizeList, plantApi } from "@/lib/api";

const COLORS = {
  bg: "#f8f3eb",
  border: "#ddd2bf",
  textMain: "#3f342c",
  textDim: "#8e8175",
  brandGreen: "#008a45",
  gridcolor: "#fdfaf5"
};

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plants, setPlants] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [loading, setLoading] = useState(false);

  const loadPlants = async () => {
    setLoading(true);
    try {
      // Note: If you haven't implemented a specific search API yet, 
      // the standard getPlants(category) will suffice for now.
      const data = await plantApi.getPlants(category);
      let list = normalizeList(data);

      // Frontend filtering for search (more reliable than broken backend search routes)
      if (query.trim()) {
        list = list.filter((p: any) => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category?.toLowerCase().includes(query.toLowerCase())
        );
      }

      setPlants(list);
    } catch (err) {
      console.error("Failed to load plants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadPlants(); 
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadPlants();
  };

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', width: '100%' }}>
      
      {/* HEADER SECTION */}
      <section style={{ paddingTop: '160px', paddingBottom: '40px', borderBottom: `1px solid ${COLORS.border}40` }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h1 style={{ fontSize: '3rem', fontWeight: '500', color: COLORS.textMain, margin: 0, fontFamily: 'serif' }}>
                Botanical <span style={{ color: COLORS.brandGreen }}>Catalog</span>
              </h1>
              <p style={{ marginTop: '8px', fontSize: '11px', color: COLORS.textDim, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                Hand-picked specimens for your space
              </p>
            </div>

            {/* SEARCH & FILTER FORM */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by species name..."
                style={{ 
                  width: '300px', 
                  borderRadius: '100px', 
                  border: `1px solid ${COLORS.border}`, 
                  backgroundColor: 'white',
                  padding: '12px 24px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              
              <select
                value={category}
                onChange={(e) => { 
                  setCategory(e.target.value); 
                }}
                style={{ 
                  borderRadius: '100px', 
                  border: `1px solid ${COLORS.border}`, 
                  backgroundColor: 'white', 
                  padding: '12px 24px', 
                  fontSize: '14px', 
                  cursor: 'pointer',
                  outline: 'none',
                  color: COLORS.textMain
                }}
              >
                <option value="">All Categories</option>
                <option value="indoor">Indoor Plants</option>
                <option value="outdoor">Outdoor Plants</option>
                <option value="decorative">Decorative</option>
                <option value="bulk">Bulk Selection</option>
              </select>

              <button 
                type="submit"
                style={{ 
                  borderRadius: '100px', 
                  backgroundColor: '#2D241E', 
                  color: 'white', 
                  padding: '12px 32px', 
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  border: 'none', 
                  cursor: 'pointer' 
                }}
              >
                Filter
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section style={{ backgroundColor: COLORS.gridcolor, padding: '80px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
               <p style={{ letterSpacing: '0.3em', fontSize: '12px', color: COLORS.textDim }}>CURATING COLLECTION...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '60px 40px' }}>
              {plants.map((plant) => {
                // IMPORTANT: Use _id for the URL to match the Detail Page logic
                const plantId = plant._id || plant.id;
                
                return (
                  <div 
                    key={String(plantId)}
                    onClick={() => router.push(`/shop/${plantId}`)}
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'transform 0.4s ease'
                    }}
                  >
                    <ProductCard
                      id={plantId}
                      title={plant.name}
                      price={plant.price}
                      image={plant.image}
                      description={plant.description}
                      onAddToCart={() => {}} // Handled inside Detail Page for better UX
                    />
                  </div>
                );
              })}
            </div>
          )}
          
          {!loading && plants.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0', color: COLORS.textDim }}>
              No specimens match your current selection.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
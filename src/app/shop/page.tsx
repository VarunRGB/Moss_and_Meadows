"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
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
      const data = query.trim()
        ? await plantApi.searchPlants(query.trim())
        : await plantApi.getPlants(category);
      setPlants(normalizeList(data));
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
      <section style={{ paddingTop: '120px', paddingBottom: '40px', borderBottom: `1px solid ${COLORS.border}40` }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: COLORS.textMain, margin: 0 }}>
                Shop <span style={{ color: COLORS.brandGreen }}>Plants</span>
              </h1>
              <p style={{ marginTop: '8px', fontSize: '11px', color: COLORS.textDim, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                Curated Botanical Luxury
              </p>
            </div>

            {/* SEARCH & FILTER FORM */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a plant..."
                style={{ 
                  width: '260px', 
                  borderRadius: '12px', 
                  border: `1px solid ${COLORS.border}`, 
                  backgroundColor: 'white',
                  padding: '10px 16px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              
              {/* CATEGORY DROPDOWN ADDED BACK */}
              <select
                value={category}
                onChange={(e) => { 
                  setCategory(e.target.value); 
                  setQuery(""); // Clear search query when changing category
                }}
                style={{ 
                  borderRadius: '12px', 
                  border: `1px solid ${COLORS.border}`, 
                  backgroundColor: 'white', 
                  padding: '10px 16px', 
                  fontSize: '14px', 
                  cursor: 'pointer',
                  outline: 'none',
                  color: COLORS.textMain
                }}
              >
                <option value="">All Categories</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
                <option value="bulk">Bulk</option>
                <option value="decorative">Decorative</option>
              </select>

              <button 
                type="submit"
                style={{ 
                  borderRadius: '12px', 
                  backgroundColor: '#2D241E', 
                  color: 'white', 
                  padding: '10px 24px', 
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  border: 'none', 
                  cursor: 'pointer' 
                }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section style={{ backgroundColor: COLORS.gridcolor, padding: '64px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
               <p style={{ letterSpacing: '0.3em', fontSize: '12px', color: COLORS.textDim }}>LOADING COLLECTION...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '48px 32px' }}>
              {plants.map((plant, index) => (
                <div 
                  key={index}
                  onClick={() => router.push(`/plants/${encodeURIComponent(plant.name)}`)}
                  style={{ 
                    cursor: 'pointer', 
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative' 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  <ProductCard
                    id={plant.name}
                    title={plant.name}
                    price={plant.price}
                    image={plant.image}
                    description={plant.description}
                    onAddToCart={undefined}
                  />
                </div>
              ))}
            </div>
          )}
          
          {!loading && plants.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0', color: COLORS.textDim }}>
              No plants found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
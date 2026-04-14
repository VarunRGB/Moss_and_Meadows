// looks for accessories category in db //

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { normalizeList, plantApi } from "@/lib/api";

const COLORS = {
  bg: "#fdfaf5",
  brandGreen: "#008a45",
  textMain: "#1a1a1a",
  textDim: "#718096",
  white: "#ffffff",
  border: "#f0ece6",
  sectionBg: "#f9f6f0"
};

export default function MaintenancePage() {
  const router = useRouter();
  const [accessories, setAccessories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        // Fetching 'accessories' or 'decorative' for the planter/maintenance gear catalogue
        const data = await plantApi.getPlants("accessories"); 
        setAccessories(normalizeList(data));
      } catch (err) {
        console.error("Failed to load planters:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccessories();
  }, []);

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: '100vh', paddingTop: '120px' }}>
      <Navbar />

      {/* HERO SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ color: COLORS.brandGreen, fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Expert Aftercare</p>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: COLORS.textMain }}>Care That Keeps Your Space Alive</h1>
          <p style={{ color: COLORS.textDim, fontSize: '20px', maxWidth: '700px', margin: '20px auto' }}>
            Beyond just delivery—we provide the science, the gear, and the professional care to ensure your greenery thrives.
          </p>
        </div>
      </section>

      {/* MAINTENANCE PILLARS */}
        <section style={{ padding: '0 20px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div 
            style={{ 
                display: 'grid', 
                // Changed repeat(auto-fit...) to a fixed 4-column layout for desktop
                // Using a media query-like approach or simply 1fr 1fr 1fr 1fr
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '20px' 
            }}
            >
            {[
                { title: "Watering & Pruning", icon: "💧", desc: "Scheduled professional visits to ensure optimal hydration and aesthetic growth." },
                { title: "Health Monitoring", icon: "🔍", desc: "Proactive checks for nutrient levels, environmental stressors, and light levels." },
                { title: "Pest Control", icon: "🛡️", desc: "Organic and safe treatments to keep your greenery vibrant, clean, and bug-free." },
                { title: "Plant Replacement", icon: "🔄", desc: "Worry-free replacement of any plant that doesn't meet our strict health standards." }
            ].map((item, i) => (
                <div key={i} style={pillarCardStyle}>
                <div style={iconCircleStyle}>{item.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: COLORS.textDim, fontSize: '14px', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
            ))}
            </div>
        </div>
        </section>

      {/* EXPERT HORTICULTURE SECTION */}
      <section style={{ backgroundColor: COLORS.sectionBg, padding: '100px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
             <img src="/hero.jpg" alt="Expert Advice" style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: COLORS.textMain }}>Consult with Our Horticulture Experts</h2>
            <p style={{ fontSize: '18px', color: COLORS.textDim, margin: '20px 0', lineHeight: '1.7' }}>
              Every plant has a unique DNA. Our certified horticulturists don't just water; they analyze. Get professional guidance on:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '15px' }}>
              {[
                "Custom Soil Mixology & Drainage",
                "Precision Organic Fertilizers",
                "Suitability & Light Mapping",
                "Seasonal Acclimatization Tips"
              ].map(tip => (
                <li key={tip} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: COLORS.textMain }}>
                  <div style={{ backgroundColor: COLORS.brandGreen, color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✔</div>
                  {tip}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '30px', color: COLORS.textDim }}>
              We help you understand which species are suitable for your specific airflow and light, ensuring your space stays green year-round.
            </p>
          </div>
        </div>
      </section>

      {/* PLANTER OPTIONS CATALOGUE */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 20px' }}>
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: COLORS.textMain }}>Premium Planter Collection</h2>
          <p style={{ color: COLORS.textDim }}>Vessels designed for both architectural beauty and plant health.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
            {["Ceramic", "Metal (Gold/Matte)", "Fiber", "Self-Watering"].map(tag => (
              <span key={tag} style={{ padding: '10px 24px', backgroundColor: COLORS.white, borderRadius: '50px', border: `1px solid ${COLORS.border}`, fontSize: '14px', fontWeight: '700', color: COLORS.brandGreen }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: COLORS.textDim }}>Fetching catalog...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
            {accessories.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div 
                  key={String(itemId)} 
                  onClick={() => router.push(`/shop/${itemId}`)} 
                  style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                >
                  <ProductCard
                    id={itemId}
                    title={item.name}
                    price={item.price}
                    image={item.image}
                    description={item.description}
                    onAddToCart={() => {}} 
                  />
                  <div style={{ marginTop: '15px', textAlign: 'center', color: COLORS.brandGreen, fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Browse Options →
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </main>
  );
}

// Styling Objects
const pillarCardStyle: React.CSSProperties = {
  backgroundColor: COLORS.white,
  padding: '40px 30px',
  borderRadius: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  textAlign: 'center',
};

const iconCircleStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  backgroundColor: '#e6f3ec',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  margin: '0 auto 20px auto',
};
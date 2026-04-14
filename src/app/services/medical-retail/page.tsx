//looks for decorative category currently

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
  border: "#f0ece6"
};

export default function MedicalRetailPage() {
  const router = useRouter();
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetailPlants = async () => {
      try {
        // Fetching 'decorative' category as they fit retail/hospitals best
        const data = await plantApi.getPlants("decorative"); 
        setPlants(normalizeList(data));
      } catch (err) {
        console.error("Failed to load catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRetailPlants();
  }, []);

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: '100vh', paddingTop: '120px' }}>
      <Navbar />

      {/* HERO SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ color: COLORS.brandGreen, fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Biophilic Design</p>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: COLORS.textMain }}>Bringing Calm to High-Energy Spaces</h1>
          <p style={{ color: COLORS.textDim, fontSize: '20px', maxWidth: '700px', margin: '20px auto' }}>
            Creating serene environments where nature meets comfort and customer experience.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { title: "Hospitals & Clinics", icon: "🏥", desc: "Reduces patient stress and improves air quality." },
            { title: "Shopping Malls", icon: "🛍️", desc: "Increases 'dwell time' and creates a premium shopping feel." },
            { title: "Retail Spaces", icon: "🏢", desc: "Easy-to-maintain solutions for boutiques and showrooms." }
          ].map(item => (
            <div key={item.title} style={{ backgroundColor: COLORS.white, padding: '40px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '42px', marginBottom: '15px' }}>{item.icon}</div>
              <h3 style={{ marginBottom: '15px', color: COLORS.textMain }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: COLORS.textDim, lineHeight: '1.6' }}>{item.desc}<br/>✔ Enhances visitor experience</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELIABILITY & HYGIENE SECTION */}
      <section style={{ backgroundColor: '#f0f7f4', padding: '80px 20px', margin: '40px 0', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: COLORS.textMain }}>Reliable Scale, Hospital-Grade Quality</h2>
          <p style={{ fontSize: '18px', color: COLORS.textDim, marginTop: '15px', lineHeight: '1.7' }}>
            We understand the specific needs of public spaces. Our plants are selected for <strong>durability, low-pollen counts, and high oxygen output</strong>. 
            We can facilitate large-scale installations across multiple floors or retail chains, handling <strong>batch orders in the 1000s</strong> with ease.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '40px' }}>
            <div style={{ padding: '20px', border: `1px solid ${COLORS.brandGreen}30`, borderRadius: '15px' }}>
              <strong>Air Purifying</strong>
              <p style={{ fontSize: '13px', margin: '5px 0 0' }}>Natural toxins removal</p>
            </div>
            <div style={{ padding: '20px', border: `1px solid ${COLORS.brandGreen}30`, borderRadius: '15px' }}>
              <strong>Low Maintenance</strong>
              <p style={{ fontSize: '13px', margin: '5px 0 0' }}>Perfect for busy staff</p>
            </div>
            <div style={{ padding: '20px', border: `1px solid ${COLORS.brandGreen}30`, borderRadius: '15px' }}>
              <strong>Bulk Readiness</strong>
              <p style={{ fontSize: '13px', margin: '5px 0 0' }}>1000+ units on demand</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIMEN CATALOGUE */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ marginBottom: '50px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: COLORS.textMain }}>Plants for Healing & Footfall</h2>
          <p style={{ color: COLORS.textDim }}>Botanical specimens curated for high-traffic and healthcare environments.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <p style={{ letterSpacing: '0.3em', fontSize: '12px', color: COLORS.textDim }}>SYNCING BOTANICAL DATA...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
            {plants.map((plant) => {
              const plantId = plant._id || plant.id;
              return (
                <div 
                  key={String(plantId)}
                  onClick={() => router.push(`/shop/${plantId}`)}
                  style={{ 
                    cursor: 'pointer', 
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                >
                  <ProductCard
                    id={plantId}
                    title={plant.name}
                    price={plant.price}
                    image={plant.image}
                    description={plant.description}
                    onAddToCart={() => {}} // Disabled for browsing
                  />
                  <div style={{ 
                    marginTop: '15px', 
                    textAlign: 'center', 
                    color: COLORS.brandGreen, 
                    fontWeight: '700', 
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    View Details
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && plants.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: COLORS.textDim }}>
            Currently updating our healthcare-safe selections.
          </div>
        )}
      </section>

    </main>
  );
}
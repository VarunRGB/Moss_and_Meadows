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

export default function RentalsPage() {
  const router = useRouter();
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentalPlants = async () => {
      try {
        const data = await plantApi.getPlants("bulk"); 
        setPlants(normalizeList(data));
      } catch (err) {
        console.error("Failed to load rental catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRentalPlants();
  }, []);

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: '100vh', paddingTop: '120px' }}>
      <Navbar />
      
      {/* HERO SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ backgroundColor: COLORS.brandGreen, color: COLORS.white, padding: '80px 60px', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontWeight: '700', letterSpacing: '2px', marginBottom: '16px', opacity: 0.9 }}>FLEXIBLE LEASING</p>
            <h1 style={{ fontSize: '56px', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px' }}>
              Designed Around You. <br /> Not Just Your Space.
            </h1>
            <p style={{ fontSize: '20px', maxWidth: '600px', opacity: 0.9, lineHeight: '1.6' }}>
              Experience the benefits of premium greenery without the long-term commitment of ownership or maintenance.
            </p>
          </div>
          <div style={{ position: 'absolute', right: '-50px', bottom: '-50px', fontSize: '250px', opacity: 0.1, pointerEvents: 'none' }}>🌿</div>
        </div>
      </section>

      {/* CORE PILLARS / RENTAL TYPES */}
      <section style={{ padding: '40px 20px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>📅</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Short-term Rental</h3>
              <p style={{ color: COLORS.textDim, lineHeight: '1.6' }}>Perfect for events, exhibitions, or weddings. Instant impact for a few days or weeks.</p>
            </div>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>🏢</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Long-term Lease</h3>
              <p style={{ color: COLORS.textDim, lineHeight: '1.6' }}>Ideal for corporate offices. Monthly or yearly billing with maintenance included.</p>
            </div>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>🔄</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Fresh Rotation</h3>
              <p style={{ color: COLORS.textDim, lineHeight: '1.6' }}>Feeling like a change? Exchange your plants once a month to keep your aesthetic evolving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{ backgroundColor: COLORS.sectionBg, padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: COLORS.textMain }}>How it Works</h2>
            <p style={{ color: COLORS.textDim, fontSize: '18px' }}>Your journey to a greener space in three simple steps.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            {[
              { step: "01", title: "Select Your Batch", desc: "Choose your first set of plants from our premium rental collection." },
              { step: "02", title: "Monthly Care", desc: "Our team visits regularly to ensure your plants are thriving and healthy." },
              { step: "03", title: "Exchange or Renew", desc: "After 30 days, keep your plants or swap them for a completely new look." }
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <span style={{ fontSize: '64px', fontWeight: '900', color: COLORS.brandGreen, opacity: 0.1, position: 'absolute', top: '-20px', left: '0' }}>{item.step}</span>
                <div style={{ position: 'relative', zIndex: 1, paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>{item.title}</h4>
                  <p style={{ color: COLORS.textDim, lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RENTAL CATALOGUE GRID */}
      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '50px' }}>
            <p style={{ color: COLORS.brandGreen, fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Fleet Selection</p>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: COLORS.textMain }}>Available for Rental</h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: COLORS.textDim }}>Loading collection...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
              {plants.map((plant) => {
                const plantId = plant._id || plant.id;
                return (
                  <div 
                    key={String(plantId)} 
                    onClick={() => router.push(`/shop/${plantId}`)} 
                    style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                  >
                    <ProductCard
                      id={plantId}
                      title={plant.name}
                      price={`${plant.price}/mo`}
                      image={plant.image}
                      description={plant.description}
                      onAddToCart={() => {}} 
                    />
                    <div style={{ marginTop: '15px', textAlign: 'center', color: COLORS.brandGreen, fontWeight: '700', fontSize: '14px' }}>
                      Rental Options →
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// Maintaining uniformity with Home Page styles
const pillarCardStyle: React.CSSProperties = {
  backgroundColor: COLORS.white,
  padding: '50px 30px',
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
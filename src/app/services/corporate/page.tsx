// ***************************************** //
// fetches plants which has "Bulk" category //
// *************************************** //


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

export default function CorporatePage() {
  const router = useRouter();
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessPlants = async () => {
      try {
        // Fetching 'bulk' or 'indoor' plants which are usually suitable for business
        const data = await plantApi.getPlants("bulk"); 
        setPlants(normalizeList(data));
      } catch (err) {
        console.error("Failed to load business catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessPlants();
  }, []);

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: '100vh', paddingTop: '120px' }}>
      <Navbar />

      {/* HERO SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <p style={{ color: COLORS.brandGreen, fontWeight: '700', letterSpacing: '1px' }}>WORKSPACE TRANSFORMATION</p>
            <h1 style={{ fontSize: '48px', fontWeight: '800', color: COLORS.textMain, lineHeight: '1.2' }}>
              Designed for Productivity.<br />Inspired by Nature.
            </h1>
            <p style={{ fontSize: '18px', color: COLORS.textDim, margin: '20px 0', lineHeight: '1.6' }}>
              We transform work and learning environments into living ecosystems that breathe life into every desk and classroom.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' }}>
              {["Corporate Offices", "Institutions", "Co-working Spaces"].map(item => (
                <div key={item} style={{ padding: '15px', backgroundColor: COLORS.white, borderRadius: '12px', border: `1px solid ${COLORS.border}`, fontWeight: '600' }}>
                  <span style={{ color: COLORS.brandGreen }}>🌿</span> {item}
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img src="/images/office-plants.jpg" alt="Corporate" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* BULK ASSURANCE SECTION */}
      <section style={{ backgroundColor: '#eef5f1', padding: '80px 20px', margin: '40px 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: COLORS.textMain }}>High-Volume Supply Experts</h2>
          <p style={{ fontSize: '18px', color: COLORS.textDim, marginTop: '15px', lineHeight: '1.7' }}>
            Whether you are outfitting a single startup floor or a massive university campus, we have the infrastructure to scale. 
            We specialize in <strong>bulk quantities (1,000+ units)</strong> with guaranteed consistency in plant health and aesthetics.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '30px' }}>
            <div><span style={{ fontSize: '24px', display: 'block' }}>🚜</span> <small>Direct from Nursery</small></div>
            <div><span style={{ fontSize: '24px', display: 'block' }}>🚛</span> <small>Pan-India Logistics</small></div>
            <div><span style={{ fontSize: '24px', display: 'block' }}>🍃</span> <small>Fresh & Healthy Delivery</small></div>
          </div>
        </div>
      </section>

      {/* BUSINESS CATALOGUE */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: COLORS.textMain }}>Business Plants Catalogue</h2>
          <p style={{ color: COLORS.textDim }}>Hand-picked specimens ideal for high-traffic environments</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <p style={{ letterSpacing: '0.3em', fontSize: '12px', color: COLORS.textDim }}>LOADING CATALOGUE...</p>
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
                    position: 'relative'
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
                    onAddToCart={() => {}} // Empty function to hide/disable add to cart logic inside card
                  />
                  <div style={{ 
                    marginTop: '10px', 
                    textAlign: 'center', 
                    color: COLORS.brandGreen, 
                    fontWeight: '700', 
                    fontSize: '14px' 
                  }}>
                    View Details →
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && plants.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: COLORS.textDim }}>
            Catalogue is currently being updated. Please check back soon.
          </div>
        )}
      </section>

    </main>
  );
}
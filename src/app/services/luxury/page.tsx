// currently looking for decorative to display catalogue // 

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
  gold: "#b89b5e" 
};

export default function LuxuryPage() {
  const router = useRouter();
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLuxuryPlants = async () => {
      try {
        const data = await plantApi.getPlants("decorative"); 
        setPlants(normalizeList(data));
      } catch (err) {
        console.error("Failed to load luxury catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLuxuryPlants();
  }, []);

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: '100vh', paddingTop: '120px' }}>
      <Navbar />

      {/* HERO SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{ borderRadius: '40px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}>
            <img src="/images/luxury-monstera.jpg" alt="Luxury Interior" style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <p style={{ color: COLORS.gold, fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Botanical Elegance</p>
            <h1 style={{ fontSize: '56px', fontWeight: '800', color: COLORS.textMain, lineHeight: '1.1', margin: '15px 0' }}>Statement Greenery</h1>
            <p style={{ fontSize: '20px', color: COLORS.textDim, marginBottom: '30px', lineHeight: '1.6' }}>
              Where bespoke design meets architectural nature. Elevating luxury living through curated botanical statements that define a room.
            </p>
            
            <div style={{ borderLeft: `4px solid ${COLORS.brandGreen}`, paddingLeft: '30px' }}>
              <h3 style={{ color: COLORS.brandGreen, marginBottom: '10px' }}>Exclusives</h3>
              <p style={{ margin: '5px 0', fontWeight: '500' }}>• Monstera – Bold luxury statement</p>
              <p style={{ margin: '5px 0', fontWeight: '500' }}>• Snake Plant – Minimal architectural beauty</p>
              <p style={{ margin: '5px 0', fontWeight: '500' }}>• Designer Planters (Ceramic & Metal)</p>
            </div>
          </div>
        </div>
      </section>

      {/* BESPOKE SERVICE SECTION */}
      <section style={{ backgroundColor: '#1a1a1a', padding: '80px 20px', margin: '40px 0', color: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: COLORS.white }}>White-Glove Bespoke Curation</h2>
          <p style={{ fontSize: '18px', color: '#a0aec0', marginTop: '15px', lineHeight: '1.7' }}>
            Luxury is found in the details. We provide a tailored experience for private residences, premium showrooms, and high-end hospitality. 
            Our specialists offer <strong>custom botanical consulting</strong>, ensuring each specimen is hand-picked for its unique character, silhouette, 
            and harmony with your interior architecture.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px', flexWrap: 'wrap' }}>
             {[
               { icon: "", text: "Architectural Styling" },
               { icon: "", text: "Rare Specimen Sourcing" },
               { icon: "", text: "Premium Finishing" }
             ].map((feat) => (
               <div key={feat.text} style={{ padding: '15px 25px', backgroundColor: '#252525', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <span>{feat.icon}</span>
                 <span style={{ fontSize: '14px', fontWeight: '600' }}>{feat.text}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* DESIGNER CATALOGUE */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: COLORS.textMain }}>Designer Botanical Catalogue</h2>
          <p style={{ color: COLORS.textDim }}>Signature specimens curated for elevated interiors.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <p style={{ letterSpacing: '0.3em', fontSize: '12px', color: COLORS.textDim }}>REFINING COLLECTION...</p>
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
                    onAddToCart={() => {}} 
                  />
                  <div style={{ 
                    marginTop: '15px', 
                    textAlign: 'center', 
                    color: COLORS.brandGreen, 
                    fontWeight: '700', 
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Explore Specimen
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
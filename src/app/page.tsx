"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import { cartApi, normalizeList, plantApi } from "@/lib/api";

type Plant = {
  _id: string;
  name: string;
  price: string | number;
  image?: string;
  description?: string;
};

export default function Home() {
  const router = useRouter();
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

  const handleAddToCart = async (e: React.MouseEvent, plantId: string) => {
    e.stopPropagation();
    try {
      await cartApi.addToCart(plantId, 1);
      alert("Added to cart!");
    } catch (err: any) {
      alert(err.message || "Please login to add items to cart");
    }
  };

  const featured = plants.slice(0, 4);

  // Services Data
  const services = [
    { title: "Corporate & Education", icon: "🏢", href: "/services/corporate" },
    { title: "Medical & Retail", icon: "🏥", href: "/services/medical-retail" },
    { title: "Luxury Interiors", icon: "✨", href: "/services/luxury" },
    { title: "Plant Rentals", icon: "📅", href: "/services/rentals" },
    { title: "Maintenance & Planters", icon: "🛠️", href: "/services/maintenance" },
    { title: "Social Impact", icon: "🤝", href: "/social-impact" },
  ];

  return (
    <main style={{ backgroundColor: '#fdfaf5', minHeight: '100vh' }}>
      <Navbar />
      <Hero />

      {/* Core Pillars Section */}
      <section style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: '#008a45', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Rooted in Purpose</p>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1a1a1a', marginBottom: '16px' }}>Grown with Excellence</h2>
          <p style={{ color: '#718096', fontSize: '18px', marginBottom: '60px' }}>The values that shape every space we create</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>🌿</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Quality & Scale</h3>
              <p style={{ color: '#718096', lineHeight: '1.6' }}>Premium plants delivered in high volumes with consistent quality.</p>
            </div>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>🌿</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Design & Aesthetics</h3>
              <p style={{ color: '#718096', lineHeight: '1.6' }}>Curated greenery that enhances modern interiors.</p>
            </div>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>🌿</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Sustainability & Empowerment</h3>
              <p style={{ color: '#718096', lineHeight: '1.6' }}>Supporting communities while promoting conscious living.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section style={{ backgroundColor: '#f9f6f0', padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a1a' }}>Our Expert Services</h2>
            <p style={{ color: '#718096', fontSize: '18px' }}>Comprehensive green solutions tailored for you.</p>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              // This forces exactly 3 columns on larger screens and stacks on smaller ones
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              // Setting a max-width on the grid itself or using a 3-column repeat ensures it won't hit 4
              // If you want it STRICTLY 3 columns until it hits mobile, use the line below:
              // gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '30px',
              maxWidth: '1100px', // Restricting the container helps keep the 3-column look sharp
              margin: '0 auto'
            }}
          >
            {services.map((service, index) => (
              <div 
                key={index}
                onClick={() => router.push(service.href)}
                style={serviceCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '15px' }}>{service.icon}</div>
                <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>{service.title}</h4>
                <p style={{ color: '#008a45', fontWeight: '600', marginTop: '10px', fontSize: '14px' }}>Learn More →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              {featured.map((plant) => (
                <div 
                  key={plant._id}
                  onClick={() => router.push(`/plants/${encodeURIComponent(plant.name)}`)}
                  style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
                >
                  <ProductCard
                    id={plant._id}
                    title={plant.name}
                    price={plant.price}
                    image={plant.image}
                    onAddToCart={(id) => handleAddToCart(window.event as any, id as string)} 
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <CategoryCard title="Interior" image="/hero.jpg" href="/shop" />
            <CategoryCard title="Rental" image="/hero.jpg" href="/shop" />
            <CategoryCard title="Corporative" image="/hero.jpg" href="/shop" />
            <CategoryCard title="Accessories" image="/hero.jpg" href="/shop" />
          </div>
        </div>
      </section>
    </main>
  );
}

// Inline Styles for new components
const pillarCardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
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

const serviceCardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};
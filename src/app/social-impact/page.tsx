"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COLORS = {
  bg: "#fdfaf5",
  brandGreen: "#008a45",
  textMain: "#1a1a1a",
  textDim: "#718096",
  white: "#ffffff",
  border: "#f0ece6",
  sectionBg: "#f9f6f0"
};

export default function SocialImpactPage() {
  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: '100vh', paddingTop: '120px' }}>
      <Navbar />

      {/* HERO SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ color: COLORS.brandGreen, fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Rooted in Purpose</p>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: COLORS.textMain }}>Empowering Through Green Livelihoods</h1>
          <p style={{ color: COLORS.textDim, fontSize: '20px', maxWidth: '800px', margin: '20px auto', lineHeight: '1.6' }}>
            Every plant you bring home or into your office is a testament to the resilience of women from rural and drought-affected regions. 
          </p>
        </div>
      </section>

      {/* IMPACT PILLARS */}
      <section style={{ padding: '0 20px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>👩🏽‍🤝‍👩🏼</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Women-Led Supply Chain</h3>
              <p style={{ color: COLORS.textDim, lineHeight: '1.6' }}>
                From the initial sowing of seeds to the final packaging, our entire production cycle is managed by women-led <strong>Bachat Gat (Self-Help Groups)</strong>.
              </p>
            </div>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>📈</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Financial Independence</h3>
              <p style={{ color: COLORS.textDim, lineHeight: '1.6' }}>
                By providing a direct marketplace for their plants, we ensure these women earn a fair, sustainable income that supports their families and children's education.
              </p>
            </div>
            <div style={pillarCardStyle}>
              <div style={iconCircleStyle}>🌍</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Drought Resilience</h3>
              <p style={{ color: COLORS.textDim, lineHeight: '1.6' }}>
                We work specifically in regions where traditional farming is difficult due to water scarcity, offering a reliable alternative through climate-conscious plant nurseries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE STORY / MISSION SECTION */}
      <section style={{ backgroundColor: COLORS.sectionBg, padding: '100px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: COLORS.textMain }}>Bridging the Gap: From Rural Soil to Urban Spaces</h2>
            <p style={{ fontSize: '18px', color: COLORS.textDim, margin: '24px 0', lineHeight: '1.7' }}>
              The <strong>Bachat Dals</strong> (Self-Help Collectives) are the backbone of our mission. These groups bring together women who possess immense traditional knowledge of botany but lack access to modern markets.
            </p>
            <p style={{ fontSize: '18px', color: COLORS.textDim, marginBottom: '24px', lineHeight: '1.7' }}>
              We provide the infrastructure, training, and logistics. They provide the care and expertise. Together, we create a ecosystem where:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '15px' }}>
              {[
                "Rural women gain decision-making power in their households.",
                "Sustainable green techniques are preserved and promoted.",
                "Urban demand directly fuels rural economic growth.",
                "100% of the handling and nursery management is women-operated."
              ].map((point, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: COLORS.textMain }}>
                  <div style={{ backgroundColor: COLORS.brandGreen, color: '#fff', borderRadius: '50%', minWidth: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✔</div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
             <img src="/images/social-impact-women.jpg" alt="Women working in nursery" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: COLORS.textMain }}>Every Purchase Makes a Difference</h2>
        <p style={{ color: COLORS.textDim, fontSize: '18px', marginTop: '16px' }}>
          When you choose our plants, you aren't just decorating a room. You are participating in a movement that values people as much as the planet.
        </p>
      </section>

    </main>
  );
}

// Uniform Styling Objects
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
"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COLORS = {
  bg: "#fdfaf5",
  brandGreen: "#008a45",
  textMain: "#3f342c",
  textDim: "#8e8175",
  border: "#ddd2bf",
  white: "#ffffff"
};

export default function AboutUs() {
  const [email, setEmail] = useState("");

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! We will reach out to ${email} shortly.`);
    setEmail("");
  };

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>

      {/* SECTION 1: HERO / MISSION */}
      <section style={{ paddingTop: "160px", paddingBottom: "80px", textAlign: "center", paddingInline: "20px" }}>
        <p style={{ color: COLORS.brandGreen, fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", fontSize: "14px" }}>
          Our Story
        </p>
        <h1 style={{ fontSize: "3.5rem", color: COLORS.textMain, marginTop: "10px" }}>
          Rooted in <span style={{ color: COLORS.brandGreen }}>Community</span>
        </h1>
        <p style={{ maxWidth: "700px", margin: "20px auto", color: COLORS.textDim, fontSize: "18px", lineHeight: "1.6" }}>
          We believe that plants do more than decorate a room, they breathe life into it. Our journey is about bringing nature closer to you while empowering the hands that grow them.
        </p>
      </section>

      {/* SECTION 2: PLANT CARE & MAINTENANCE */}
      <section style={{ padding: "80px 20px", backgroundColor: COLORS.white }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", color: COLORS.textMain, marginBottom: "20px" }}>Expert Care for Every Leaf</h2>
            <p style={{ color: COLORS.textDim, lineHeight: "1.8", marginBottom: "20px" }}>
              Our responsibility doesn't end at the checkout. Every plant from our nursery comes with a lifetime of support. 
            </p>
            <ul style={{ listStyle: "none", padding: 0, color: COLORS.textMain, fontWeight: "600" }}>
              <li style={{ marginBottom: "12px" }}>✓ Customized Watering Schedules</li>
              <li style={{ marginBottom: "12px" }}>✓ Seasonal Maintenance Guides</li>
              <li style={{ marginBottom: "12px" }}>✓ Soil Health & Fertilization Tips</li>
            </ul>
          </div>
          <div style={{ borderRadius: "24px", overflow: "hidden", height: "400px" }}>
            <img src="/hero.jpg" alt="Plant care" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* SECTION 3: RENTER SERVICES */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", color: COLORS.textMain }}>Renter-Friendly Greenery</h2>
          <p style={{ color: COLORS.textDim, marginBottom: "50px" }}>Short-term stay? Long-term beauty. Our rental services are designed for the modern nomad.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
            {["Flexible Lease", "Free Delivery", "Monthly Rotation", "Zero Commitment"].map((service) => (
              <div key={service} style={{ padding: "40px", backgroundColor: COLORS.white, borderRadius: "20px", border: `1px solid ${COLORS.border}` }}>
                <h4 style={{ color: COLORS.brandGreen, margin: 0 }}>{service}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SOCIAL CAUSE (Bachat Gat) */}
      <section style={{ padding: "100px 20px", backgroundColor: "#2D241E", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
          <div style={{ borderRadius: "24px", overflow: "hidden", height: "500px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <img src="/hero.jpg" alt="Women empowerment" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
          </div>
          <div>
            <span style={{ textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px", color: COLORS.brandGreen, fontWeight: "700" }}>Our Social Impact</span>
            <h2 style={{ fontSize: "2.5rem", marginTop: "10px", marginBottom: "20px" }}>Empowering Bachat Gat Artisans</h2>
            <p style={{ lineHeight: "1.8", color: "#ddd2bf" }}>
              Our workflow is powered by local Bachat Gat (Women’s Self-Help Groups). These talented ladies are the backbone of our operations—from hand-painting our ceramic pots to nurturing saplings in the early stages.
            </p>
            <p style={{ lineHeight: "1.8", marginTop: "20px", color: "#ddd2bf" }}>
              By choosing us, you aren't just buying a plant; you are providing sustainable livelihoods and financial independence to women in our rural communities.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT US */}
      <section style={{ padding: "100px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "60px", backgroundColor: COLORS.white, borderRadius: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.03)" }}>
          <h2 style={{ fontSize: "2rem", color: COLORS.textMain }}>Get in Touch</h2>
          <p style={{ color: COLORS.textDim, marginBottom: "30px" }}>Have questions about care or rentals? Drop your email below.</p>
          <form onSubmit={handleContact} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "16px 24px", borderRadius: "12px", border: `1px solid ${COLORS.border}`, outline: "none", fontSize: "16px" }}
            />
            <button 
              type="submit"
              style={{ backgroundColor: COLORS.brandGreen, color: "white", padding: "16px", borderRadius: "12px", border: "none", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}
"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GiftingPage() {
  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '120px' }}>
      <Navbar />
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px' }}>Gifts That Grew, Stories That Matter 🌱</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '50px' }}>
           {["Corporate Gifting", "Employee Kits", "Festive Hampers"].map(g => (
             <div key={g} style={{ border: '1px solid #eee', padding: '30px', borderRadius: '20px' }}>
               <h3>{g}</h3>
               <p style={{ fontSize: '13px' }}>Custom branding & Eco packaging</p>
             </div>
           ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
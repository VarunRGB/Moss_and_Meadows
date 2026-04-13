"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cartApi, normalizeList, plantApi } from "@/lib/api";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const loadCart = async () => {
    try {
      setLoading(true);
      // 1. Get raw cart data (contains plant_id and quantity)
      const cartData = await cartApi.getCart();
      const rawItems = normalizeList(cartData);
      
      // 2. Get full plant catalog for details
      const plantsData = await plantApi.getPlants();
      const allPlants = normalizeList(plantsData);

      // 3. Match them up
      const enriched = rawItems.map((item: any) => {
        // We force both IDs to strings to ensure the match works
        const details = allPlants.find((p: any) => 
          String(p._id || p.id) === String(item.plant_id)
        );

        return {
          ...item,
          name: details?.name || "Botanical Specimen",
          price: details?.price || 0,
          image: details?.image || "/hero.jpg",
          plant_id: item.plant_id // Keep this for the delete button
        };
      });

      setItems(enriched);
      setIsLoggedOut(false);
    } catch (err: any) {
      if (err.message.includes("401")) setIsLoggedOut(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (pid: string) => {
      if (!pid) return;
      
      try {
        // Show a temporary "Removing..." state if you like
        await cartApi.removeFromCart(pid);
        
        // Critical: Re-fetch the cart data so the UI updates
        await loadCart(); 
      } catch (err: any) {
        console.error("Remove failed:", err);
        alert("Could not remove item: " + err.message);
      }
    };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  // --- UI RENDER ---
  if (loading) return <div style={statusStyle}>Consulting the garden records...</div>;

  return (
    <main style={{ backgroundColor: "#fdfaf5", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "160px 24px" }}>
        <h1 style={{ fontSize: "3rem", fontFamily: "serif", marginBottom: "40px" }}>The Basket</h1>

        {isLoggedOut ? (
          <div style={emptyStateStyle}>
            <p>Please login to view your selections.</p>
            <Link href="/login" style={btnStyle}>LOGIN</Link>
          </div>
        ) : items.length === 0 ? (
          <div style={emptyStateStyle}>
            <p>Your basket is currently empty.</p>
            <Link href="/shop" style={{ textDecoration: "underline" }}>Continue Shopping</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {items.map((item, i) => (
                <div key={i} style={itemCardStyle}>
                  <img src={item.image} style={imgStyle} alt="" />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <h3 style={{ margin: 0 }}>{item.name}</h3>
                      <span style={{ fontWeight: "700" }}>₹{item.price}</span>
                    </div>
                    <p style={{ color: "#8e8175", fontSize: "14px" }}>Quantity: {item.quantity}</p>
                    <button 
                      onClick={() => handleRemove(item.plant_id)}
                      style={removeBtnStyle}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Summary */}
            <div style={sidebarStyle}>
              <h3 style={{ marginTop: 0 }}>Summary</h3>
              <div style={rowStyle}><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div style={rowStyle}><span>Delivery</span><span style={{ color: "#008a45" }}>FREE</span></div>
              <hr style={{ border: "none", borderTop: "1px solid #ddd2bf", margin: "20px 0" }} />
              <div style={{ ...rowStyle, fontWeight: "700", fontSize: "20px" }}>
                <span>Total</span><span>₹{subtotal.toFixed(2)}</span>
              </div>
              <Link href="/checkout" style={{ ...btnStyle, display: "block", marginTop: "20px", textAlign: "center" }}>
                CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// --- Styles ---
const itemCardStyle: React.CSSProperties = { display: "flex", gap: "20px", padding: "20px", backgroundColor: "#fff", borderRadius: "20px", border: "1px solid #ddd2bf40" };
const imgStyle: React.CSSProperties = { width: "100px", height: "120px", borderRadius: "12px", objectFit: "cover" };
const removeBtnStyle: React.CSSProperties = { background: "none", border: "none", color: "#a64444", fontWeight: "700", fontSize: "11px", cursor: "pointer", padding: 0, marginTop: "10px" };
const sidebarStyle: React.CSSProperties = { backgroundColor: "#fff", padding: "30px", borderRadius: "25px", border: "1px solid #ddd2bf", height: "fit-content", position: "sticky", top: "140px" };
const rowStyle: React.CSSProperties = { display: "flex", justifyContent: "space-between", marginBottom: "10px" };
const btnStyle: React.CSSProperties = { backgroundColor: "#2D241E", color: "#fff", padding: "15px 30px", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "14px" };
const emptyStateStyle: React.CSSProperties = { textAlign: "center", padding: "100px 0", color: "#8e8175" };
const statusStyle: React.CSSProperties = { textAlign: "center", padding: "200px 0", color: "#8e8175", fontFamily: "serif" };
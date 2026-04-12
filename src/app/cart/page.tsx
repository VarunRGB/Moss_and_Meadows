"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cartApi, normalizeList } from "@/lib/api";

type CartItem = {
  quantity?: number;
  plant?: {
    id?: string | number;
    _id?: string | number;
    name: string;
    price: string | number;
    image?: string;
  };
  id?: string | number;
  _id?: string | number;
  name?: string;
  price?: string | number;
  image?: string;
  plant_id?: string | number;
};

const COLORS = {
  bg: "#fdfaf5",
  card: "#ffffff",
  border: "#ddd2bf",
  textMain: "#2D241E",
  textDim: "#8e8175",
  brandGreen: "#008a45",
  accent: "#f8f3eb",
  error: "#9f5f5f",
  softBeige: "#f4ede4"
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await cartApi.getCart();
      setItems(normalizeList(data));
      setIsLoggedOut(false);
    } catch (err: any) {
      if (err.message.includes("401") || err.message.includes("Unauthorized")) {
        setIsLoggedOut(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (item: CartItem) => {
    const plantId = item.plant?.id || item.plant?._id || item.id || item._id || item.plant_id || "";
    await cartApi.removeFromCart({ plant_id: plantId });
    await loadCart();
  };

  const total = items.reduce((sum, item) => {
    const plant = item.plant || item;
    const price = Number(plant.price || 0);
    const qty = Number(item.quantity || 1);
    return sum + price * qty;
  }, 0);

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "160px 24px 100px" }}>
        {/* Editorial Header */}
        <header style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "30px", marginBottom: "50px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: COLORS.brandGreen }}>
            Your Selection
          </span>
          <h1 style={{ fontSize: "3.5rem", color: COLORS.textMain, marginTop: "10px", fontWeight: "600" }}>
            The Basket
          </h1>
        </header>

        {loading ? (
          <div style={{ padding: "100px 0", textAlign: "center", color: COLORS.textDim, fontSize: "18px", fontStyle: "italic" }}>
            Curating your collection...
          </div>
        ) : isLoggedOut ? (
          /* RICH LOGGED OUT STATE */
          <div style={{ textAlign: "center", padding: "80px 40px", backgroundColor: COLORS.card, borderRadius: "40px", border: `1px solid ${COLORS.border}50` }}>
            <h2 style={{ fontSize: "24px", color: COLORS.textMain, marginBottom: "15px" }}>Private Collection</h2>
            <p style={{ color: COLORS.textDim, marginBottom: "30px", maxWidth: "400px", margin: "0 auto 30px" }}>
              Please sign in to access your curated plants and saved selections.
            </p>
            <Link href="/login" style={{ backgroundColor: COLORS.brandGreen, color: "white", padding: "18px 45px", borderRadius: "100px", textDecoration: "none", fontWeight: "700", display: "inline-block", fontSize: "14px", letterSpacing: "1px" }}>
              LOGIN TO ACCOUNT
            </Link>
          </div>
        ) : items.length === 0 ? (
          /* POLISHED EMPTY STATE */
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <p style={{ fontSize: "20px", color: COLORS.textDim, marginBottom: "30px" }}>Your basket is waiting to be filled.</p>
            <Link href="/shop" style={{ color: COLORS.textMain, fontWeight: "700", textDecoration: "underline", textUnderlineOffset: "8px" }}>
              EXPLORE OUR BOTANICALS
            </Link>
          </div>
        ) : (
          /* CART CONTENT */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "50px", alignItems: "start" }}>
            
            {/* List of Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              {items.map((item, index) => {
                const plant = item.plant || item;
                return (
                  <div key={index} style={{ display: "flex", gap: "25px", paddingBottom: "30px", borderBottom: `1px solid ${COLORS.border}30` }}>
                    <div style={{ width: "150px", height: "180px", borderRadius: "20px", overflow: "hidden", backgroundColor: COLORS.softBeige }}>
                      <img src={plant.image || "/hero.jpg"} alt={plant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h3 style={{ fontSize: "22px", color: COLORS.textMain, margin: 0 }}>{plant.name}</h3>
                          <span style={{ fontSize: "18px", fontWeight: "600", color: COLORS.textMain }}>₹{plant.price}</span>
                        </div>
                        <p style={{ color: COLORS.textDim, fontSize: "14px", marginTop: "10px" }}>Healthy sapling in eco-friendly grow bag</p>
                      </div>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: "14px", color: COLORS.textMain, fontWeight: "600" }}>
                          QUANTITY: {item.quantity || 1}
                        </div>
                        <button 
                          onClick={() => removeItem(item)}
                          style={{ background: "none", border: "none", color: COLORS.error, fontWeight: "700", cursor: "pointer", fontSize: "12px", letterSpacing: "1px", textDecoration: "underline" }}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Summary Side Bar */}
            <div style={{ position: "sticky", top: "140px", backgroundColor: COLORS.card, padding: "40px", borderRadius: "30px", border: `1px solid ${COLORS.border}50` }}>
              <h3 style={{ fontSize: "20px", marginBottom: "25px", color: COLORS.textMain }}>Summary</h3>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: COLORS.textDim }}>
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", color: COLORS.textDim }}>
                <span>Shipping</span>
                <span style={{ color: COLORS.brandGreen, fontWeight: "700" }}>FREE</span>
              </div>

              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: "20px", marginBottom: "35px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "18px", fontWeight: "700" }}>Total</span>
                <span style={{ fontSize: "24px", fontWeight: "700", color: COLORS.brandGreen }}>₹{total.toFixed(2)}</span>
              </div>

              <Link href="/payment" style={{ 
                display: "block", textAlign: "center", backgroundColor: COLORS.textMain, color: "white", padding: "20px", borderRadius: "100px", textDecoration: "none", fontWeight: "700", letterSpacing: "1px", transition: "transform 0.2s"
              }}>
                CHECKOUT NOW
              </Link>
              
              <p style={{ textAlign: "center", fontSize: "12px", color: COLORS.textDim, marginTop: "20px" }}>
                Secure SSL Encrypted Payment
              </p>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { normalizeList, orderApi } from "@/lib/api";

type Order = {
  id?: string | number;
  _id?: string | number;
  status?: string;
  items?: any[];
  created_at?: string;
  total_amount?: number | string;
};

const COLORS = {
  bg: "#fdfaf5",
  card: "#ffffff",
  border: "#ddd2bf",
  textMain: "#2D241E",
  textDim: "#8e8175",
  brandGreen: "#008a45",
  accent: "#f8f3eb",
  softBeige: "#f4ede4"
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await orderApi.getOrders();
        setOrders(normalizeList(data));
      } catch (err: any) {
        if (err.message.includes("401") || err.message.includes("Unauthorized")) {
          setIsLoggedOut(true);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "160px 24px 100px" }}>
        {/* Editorial Header */}
        <header style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "30px", marginBottom: "50px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: COLORS.brandGreen }}>
            Purchase History
          </span>
          <h1 style={{ fontSize: "3.5rem", color: COLORS.textMain, marginTop: "10px", fontWeight: "600" }}>
            My Orders
          </h1>
        </header>

        {loading ? (
          <div style={{ padding: "100px 0", textAlign: "center", color: COLORS.textDim, fontSize: "18px", fontStyle: "italic" }}>
            Retrieving your botanical history...
          </div>
        ) : isLoggedOut ? (
          /* AUTH REQUIRED STATE */
          <div style={{ textAlign: "center", padding: "80px 40px", backgroundColor: COLORS.card, borderRadius: "40px", border: `1px solid ${COLORS.border}50` }}>
            <h2 style={{ fontSize: "24px", color: COLORS.textMain, marginBottom: "15px" }}>Private Records</h2>
            <p style={{ color: COLORS.textDim, marginBottom: "30px" }}>Please sign in to view your order history and tracking details.</p>
            <Link href="/login" style={{ backgroundColor: COLORS.brandGreen, color: "white", padding: "18px 45px", borderRadius: "100px", textDecoration: "none", fontWeight: "700", display: "inline-block", fontSize: "14px", letterSpacing: "1px" }}>
              LOGIN TO VIEW
            </Link>
          </div>
        ) : orders.length === 0 ? (
          /* EMPTY STATE */
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <p style={{ fontSize: "20px", color: COLORS.textDim, marginBottom: "30px" }}>You haven't started your collection yet.</p>
            <Link href="/shop" style={{ color: COLORS.textMain, fontWeight: "700", textDecoration: "underline", textUnderlineOffset: "8px" }}>
              BROWSE THE BOUTIQUE
            </Link>
          </div>
        ) : (
          /* ORDERS LIST */
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {orders.map((order) => {
              const id = order.id || order._id || "";
              const status = order.status || "Processing";
              
              return (
                <div 
                  key={String(id)} 
                  style={{ 
                    backgroundColor: COLORS.card, 
                    borderRadius: "24px", 
                    padding: "30px", 
                    border: `1px solid ${COLORS.border}40`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    transition: "transform 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "15px" }}>
                    <div>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "1px" }}>
                        Order Identifier
                      </span>
                      <h3 style={{ fontSize: "20px", color: COLORS.textMain, margin: "4px 0 0 0" }}>#{String(id).slice(-8).toUpperCase()}</h3>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ 
                        fontSize: "10px", 
                        fontWeight: "700", 
                        padding: "6px 14px", 
                        borderRadius: "100px", 
                        backgroundColor: status === "Delivered" ? "#e8f5e9" : COLORS.accent,
                        color: status === "Delivered" ? "#2e7d32" : COLORS.textMain,
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                      }}>
                        {status}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${COLORS.softBeige}`, paddingTop: "20px" }}>
                    <div>
                        <p style={{ margin: 0, fontSize: "14px", color: COLORS.textDim }}>Items in order: <span style={{ color: COLORS.textMain, fontWeight: "600" }}>{order.items?.length || 1}</span></p>
                    </div>
                    <Link 
                      href={`/orders/${id}`} 
                      style={{ 
                        textDecoration: "none", 
                        color: COLORS.brandGreen, 
                        fontWeight: "700", 
                        fontSize: "14px", 
                        letterSpacing: "0.5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      VIEW DETAILS <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
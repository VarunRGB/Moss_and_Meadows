"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { adminApi, normalizeList } from "@/lib/api";

// --- TypeScript Definitions ---
type OrderItem = {
  plant_id: string;
  plant_name?: string; // This is the key field from your backend lookup
  quantity: number;
};

type Order = {
  _id: string;
  order_id: string; // The readable ID like ORD-123456
  user_id: string;
  status: string;
  amount: number;
  date: string;
  items: OrderItem[];
};

const COLORS = {
  bg: "#fdfaf5",
  card: "#ffffff",
  border: "#ddd2bf",
  textMain: "#2D241E",
  textDim: "#8e8175",
  brandGreen: "#008a45",
  gold: "#b5a48b",
  softBeige: "#f4ede4",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  // --- Data Fetching ---
  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getOrders();
      
      // If the backend returns an error object instead of a list
      if (data && (data as any).error) {
        setIsAuthorized(false);
        return;
      }

      setOrders(normalizeList(data));
      setIsAuthorized(true);
    } catch (err: any) {
      console.error("Authorization or Fetch error:", err);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // --- Status Update Handler ---
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      // Passes the readable order_id to the backend route
      await adminApi.updateStatus(orderId, newStatus);
      await loadOrders(); // Refresh to see changes
    } catch (err) {
      alert("Failed to update status. Please verify your admin session.");
    }
  };

  // --- Restricted Access View ---
  if (!isAuthorized && !loading) {
    return (
      <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "180px 20px" }}>
          <div style={{ 
            textAlign: "center", padding: "60px 40px", backgroundColor: COLORS.card, 
            borderRadius: "40px", border: `1px solid ${COLORS.border}50`, maxWidth: "500px",
            boxShadow: "0 20px 40px rgba(45, 36, 30, 0.05)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔒</div>
            <h2 style={{ fontSize: "24px", color: COLORS.textMain, marginBottom: "12px", fontWeight: "600" }}>
              Restricted Access
            </h2>
            <p style={{ color: COLORS.textDim, marginBottom: "30px", lineHeight: "1.6" }}>
              The Order Registry is limited to botanical administrators. 
              Please authenticate to continue.
            </p>
            <Link href="/login" style={{ 
              backgroundColor: COLORS.textMain, color: "white", padding: "16px 40px", 
              borderRadius: "100px", textDecoration: "none", fontWeight: "700",
              fontSize: "14px", letterSpacing: "1px"
            }}>
              LOGIN AS ADMIN
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>
      
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "160px 24px 100px" }}>
        <header style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "40px", marginBottom: "60px" }}>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.brandGreen }}>
            Logistics Portal
          </span>
          <h1 style={{ fontSize: "3.5rem", color: COLORS.textMain, marginTop: "15px", fontWeight: "500", fontFamily: "serif" }}>
            Order Registry
          </h1>
        </header>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <p style={{ fontSize: "12px", letterSpacing: "3px", color: COLORS.textDim, textTransform: "uppercase" }}>
              Synchronizing Ledger...
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {orders.map((order) => (
              <div 
                key={order._id} 
                style={{ 
                  backgroundColor: COLORS.card, borderRadius: "30px", padding: "40px", 
                  border: `1px solid ${COLORS.border}40`, boxShadow: "0 10px 30px rgba(45,36,30,0.02)" 
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "30px" }}>
                  
                  {/* Left: Metadata & Manifest */}
                  <div style={{ flex: "1", minWidth: "300px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: COLORS.gold, letterSpacing: "1px" }}>
                        {order.order_id}
                      </span>
                      <span style={{ fontSize: "9px", padding: "4px 12px", backgroundColor: COLORS.softBeige, borderRadius: "50px", fontWeight: "700", textTransform: "uppercase", color: COLORS.textMain }}>
                        {order.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "28px", color: COLORS.textMain, fontWeight: "600", marginBottom: "4px" }}>
                      ₹{order.amount.toFixed(2)}
                    </h3>
                    <p style={{ fontSize: "13px", color: COLORS.textDim, marginBottom: "20px" }}>
                      Placed on {order.date} • Customer: <span style={{ fontFamily: "monospace", color: COLORS.textMain }}>{order.user_id}</span>
                    </p>

                    <div style={{ backgroundColor: COLORS.bg + "80", padding: "20px", borderRadius: "16px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "800", color: COLORS.textMain, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                        Manifest
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {order.items?.map((item, idx) => (
                          <li key={idx} style={{ 
                            fontSize: "14px", 
                            color: COLORS.textMain, 
                            padding: "6px 0", 
                            borderBottom: idx !== order.items.length - 1 ? `1px solid ${COLORS.border}30` : "none", 
                            display: "flex", 
                            justifyContent: "space-between" 
                          }}>
                            {/* Uses plant_name from backend lookup */}
                            <span>{item.plant_name || "Specimen Record Loading..."}</span>
                            <span style={{ fontWeight: "700", color: COLORS.brandGreen }}>× {item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Management Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "160px" }}>
                    <p style={{ fontSize: "10px", fontWeight: "700", color: COLORS.textDim, textTransform: "uppercase", marginBottom: "5px" }}>
                      Update Status
                    </p>
                    {["pending", "approved", "shipped", "delivered", "cancelled"].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(order.order_id, status)}
                        style={{
                          padding: "10px 20px", borderRadius: "50px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer", transition: "all 0.2s ease",
                          border: order.status === status ? `1px solid ${COLORS.textMain}` : `1px solid ${COLORS.border}80`,
                          backgroundColor: order.status === status ? COLORS.textMain : "transparent",
                          color: order.status === status ? "white" : COLORS.textDim,
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px", backgroundColor: COLORS.card, borderRadius: "30px", border: `1px solid ${COLORS.border}40` }}>
                <p style={{ color: COLORS.textDim }}>The order registry is currently empty.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { adminApi, normalizeList } from "@/lib/api";

type Order = {
  id?: string | number;
  _id?: string | number;
  status?: string;
  total_price?: number;
};

interface DashboardResponse {
  error?: string;
  status?: number;
}

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

  const loadOrders = async () => {
    try {
      // EXACT LOGIC FROM YOUR DASHBOARD
      const data = await adminApi.getOrders() as any;
      
      if (data && (data.error === "Unauthorized" || data.status === 401)) {
        setIsAuthorized(false);
        return;
      }

      setOrders(normalizeList(data));
      setIsAuthorized(true);
    } catch (err: any) {
      // EXACT LOGIC FROM YOUR DASHBOARD
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id: string | number, status: string) => {
    try {
      await adminApi.updateOrderStatus(id, status);
      await loadOrders();
    } catch (err) {
      console.error("Update failed");
    }
  };

  // --- EXACT ACCESS DENIED VIEW FROM DASHBOARD ---
  if (!isAuthorized && !loading) {
    return (
      <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "180px 20px" }}>
          <div style={{ 
            textAlign: "center", 
            padding: "60px 40px", 
            backgroundColor: COLORS.card, 
            borderRadius: "40px", 
            border: `1px solid ${COLORS.border}50`, 
            maxWidth: "500px",
            boxShadow: "0 20px 40px rgba(45, 36, 30, 0.05)"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔒</div>
            <h2 style={{ fontSize: "24px", color: COLORS.textMain, marginBottom: "12px", fontWeight: "600" }}>
              Restricted Access
            </h2>
            <p style={{ color: COLORS.textDim, marginBottom: "30px", lineHeight: "1.6" }}>
              The Executive Dashboard is reserved for authorized botanical administrators. 
              Please sign in with appropriate credentials to continue.
            </p>
            <Link href="/login" style={{ 
              backgroundColor: COLORS.textMain, 
              color: "white", 
              padding: "16px 40px", 
              borderRadius: "100px", 
              textDecoration: "none", 
              fontWeight: "700",
              fontSize: "14px",
              letterSpacing: "1px"
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
        {/* Posh Header */}
        <header style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "40px", marginBottom: "60px" }}>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.brandGreen }}>
            Logistics Portal
          </span>
          <h1 style={{ fontSize: "3.5rem", color: COLORS.textMain, marginTop: "15px", fontWeight: "500", letterSpacing: "-1px", fontFamily: "serif" }}>
            Order Registry
          </h1>
          <p style={{ color: COLORS.textDim, marginTop: "10px", fontSize: "15px" }}>
            Reviewing current botanical shipments and order statuses.
          </p>
        </header>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <p style={{ fontSize: "12px", letterSpacing: "3px", color: COLORS.textDim, textTransform: "uppercase" }}>Synchronizing Ledger...</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {orders.map((order) => {
              const id = order.id || order._id || "N/A";
              return (
                <div 
                  key={String(id)} 
                  style={{ 
                    backgroundColor: COLORS.card, 
                    borderRadius: "30px", 
                    padding: "30px", 
                    border: `1px solid ${COLORS.border}40`, 
                    boxShadow: "0 10px 30px rgba(45,36,30,0.02)" 
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                    
                    {/* Order Details */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1px", color: COLORS.gold }}>ID: #{String(id).slice(-6)}</span>
                        <span style={{ fontSize: "9px", padding: "4px 12px", backgroundColor: COLORS.softBeige, borderRadius: "50px", color: COLORS.textMain, fontWeight: "700", textTransform: "uppercase" }}>
                          {order.status}
                        </span>
                      </div>
                      <h3 style={{ fontSize: "20px", color: COLORS.textMain, fontWeight: "600" }}>₹{order.total_price || "0.00"}</h3>
                    </div>

                    {/* Status Toggle Buttons */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {["pending", "approved", "shipped", "delivered", "cancelled"].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(id, status)}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "50px",
                            fontSize: "10px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
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
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
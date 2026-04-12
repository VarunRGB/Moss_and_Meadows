"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { adminApi } from "@/lib/api";

interface DashboardResponse {
  total_plants?: number;
  pending_orders?: number;
  revenue?: number | string;
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
  accent: "#f8f3eb",
  softBeige: "#f4ede4",
  error: "#d9534f"
};

export default function AdminPage() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await adminApi.getDashboard() as DashboardResponse;
        
        // If data returns but contains an error field, treat as unauthorized
        if (data && (data.error === "Unauthorized" || data.status === 401)) {
          setIsAuthorized(false);
          return;
        }

        setDashboard(data);
        setIsAuthorized(true);
      } catch (err: any) {
        // Any fetch failure (like the 500 error in your logs) triggers Restricted Access
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const navLinkStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "160px",
    borderRadius: "24px",
    border: `1px solid ${COLORS.border}50`,
    backgroundColor: COLORS.card,
    color: COLORS.textMain,
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(45, 36, 30, 0.03)"
  };

  // --- ACCESS DENIED VIEW ---
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "160px 24px 100px" }}>
        <header style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "30px", marginBottom: "50px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: COLORS.brandGreen }}>
            Executive Portal
          </span>
          <h1 style={{ fontSize: "3rem", color: COLORS.textMain, marginTop: "10px", fontWeight: "600" }}>
            Dashboard
          </h1>
          <p style={{ color: COLORS.textDim, marginTop: "8px" }}>Overview of the Moss & Meadows botanical operations.</p>
        </header>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 0", color: COLORS.textDim }}>
            <p style={{ letterSpacing: "1px" }}>Synchronizing secure connection...</p>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "50px" }}>
              <div style={{ padding: "30px", backgroundColor: COLORS.textMain, borderRadius: "28px", color: "white" }}>
                <span style={{ fontSize: "12px", opacity: 0.7, textTransform: "uppercase", letterSpacing: "1px" }}>Total Catalog</span>
                <div style={{ fontSize: "32px", fontWeight: "700", marginTop: "10px" }}>{dashboard?.total_plants || 0}</div>
              </div>
              <div style={{ padding: "30px", backgroundColor: COLORS.card, borderRadius: "28px", border: `1px solid ${COLORS.border}50` }}>
                <span style={{ fontSize: "12px", color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "1px" }}>Pending Orders</span>
                <div style={{ fontSize: "32px", fontWeight: "700", color: COLORS.textMain, marginTop: "10px" }}>{dashboard?.pending_orders || 0}</div>
              </div>
              <div style={{ padding: "30px", backgroundColor: COLORS.card, borderRadius: "28px", border: `1px solid ${COLORS.border}50` }}>
                <span style={{ fontSize: "12px", color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "1px" }}>Total Revenue</span>
                <div style={{ fontSize: "32px", fontWeight: "700", color: COLORS.textMain, marginTop: "10px" }}>₹{dashboard?.revenue || "0.00"}</div>
              </div>
            </div>

            <h2 style={{ fontSize: "18px", color: COLORS.textMain, marginBottom: "25px", fontWeight: "600" }}>Quick Actions</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "60px" }}>
              <Link href="/admin/plants" style={navLinkStyle}><span>Manage Plants</span></Link>
              <Link href="/admin/orders" style={navLinkStyle}><span>Manage Orders</span></Link>
              <Link href="/" style={navLinkStyle}><span>Customer View</span></Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
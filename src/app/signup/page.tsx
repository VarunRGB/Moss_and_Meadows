"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { authApi } from "@/lib/api";

const COLORS = {
  bg: "#fdfaf5",
  card: "#ffffff",
  border: "#ddd2bf",
  textMain: "#2D241E",
  textDim: "#8e8175",
  brandGreen: "#008a45",
  accent: "#f8f3eb"
};

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    user_id: "",
    password: "",
    organization: "",
  });
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await authApi.signup(form);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "14px",
    border: `1px solid ${COLORS.border}`,
    padding: "14px 18px",
    fontSize: "15px",
    outline: "none",
    backgroundColor: COLORS.accent,
    color: COLORS.textMain,
    boxSizing: "border-box"
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: COLORS.textDim,
    marginLeft: "4px",
    marginBottom: "8px",
    display: "block"
  };

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>
        
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        paddingTop: "140px", 
        paddingBottom: "100px",
        paddingInline: "20px"
      }}>
        <div style={{ 
          width: "100%", 
          maxWidth: "480px", 
          backgroundColor: COLORS.card, 
          borderRadius: "32px", 
          padding: "50px", 
          boxShadow: "0 20px 50px rgba(45, 36, 30, 0.05)",
          border: `1px solid ${COLORS.border}40`,
          textAlign: "center"
        }}>
          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <span style={{ 
              fontSize: "12px", 
              fontWeight: "700", 
              letterSpacing: "0.3em", 
              color: COLORS.brandGreen, 
              textTransform: "uppercase" 
            }}>
              Join the Meadow
            </span>
            <h1 style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: COLORS.textMain, 
              marginTop: "12px",
              marginBottom: "8px"
            }}>
              Create Account
            </h1>
            <p style={{ fontSize: "14px", color: COLORS.textDim, lineHeight: "1.6" }}>
              Start your curated botanical journey with us today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ textAlign: "left" }}>
              <label style={labelStyle}>Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                style={inputStyle}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={labelStyle}>User ID</label>
              <input
                value={form.user_id}
                onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                placeholder="choose_a_username"
                style={inputStyle}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={labelStyle}>Organization (Optional)</label>
              <input
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                placeholder="Company Name"
                style={inputStyle}
              />
            </div>

            {error && (
              <p style={{ fontSize: "13px", color: "#d9534f", margin: "4px 0", fontWeight: "500" }}>
                {error}
              </p>
            )}

            <button 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ 
                width: "100%", 
                borderRadius: "14px", 
                backgroundColor: isHovered ? COLORS.textMain : COLORS.brandGreen, 
                color: "white", 
                padding: "16px", 
                fontSize: "14px", 
                fontWeight: "700", 
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                border: "none", 
                cursor: "pointer",
                marginTop: "12px",
                transition: "all 0.3s ease",
                boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.1)" : "none"
              }}
            >
              Create Account
            </button>
          </form>

          {/* Footer of Card */}
          <div style={{ 
            marginTop: "32px", 
            borderTop: `1px solid ${COLORS.border}40`, 
            paddingTop: "24px" 
          }}>
            <p style={{ fontSize: "13px", color: COLORS.textDim }}>
              Already a member?{" "}
              <Link 
                href="/login" 
                style={{ 
                  color: COLORS.brandGreen, 
                  fontWeight: "700", 
                  textDecoration: "none",
                  transition: "opacity 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}
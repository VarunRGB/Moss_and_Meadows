"use client";

import { useState, useEffect } from "react";
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
  accent: "#f8f3eb",
};

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ user_id: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      }
    }
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authApi.login(form);

      // ✅ Ensure backend returns token
      if (!res?.token) {
        throw new Error("Login failed: No token received");
      }

      router.push("/");
    } catch (err: any) {
      setError(
        err.message.includes("<!doctype html>")
          ? "Server Error: Please check backend logs."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "140px",
          paddingBottom: "100px",
          paddingInline: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            backgroundColor: COLORS.card,
            borderRadius: "32px",
            padding: "50px",
            boxShadow: "0 20px 50px rgba(45, 36, 30, 0.05)",
            border: `1px solid ${COLORS.border}40`,
            textAlign: "center",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.3em",
                color: COLORS.brandGreen,
                textTransform: "uppercase",
              }}
            >
              Welcome Back
            </span>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: COLORS.textMain,
                marginTop: "12px",
                marginBottom: "8px",
              }}
            >
              Account Login
            </h1>
            <p style={{ fontSize: "14px", color: COLORS.textDim }}>
              Enter your botanical credentials to continue.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* User ID */}
            <div style={{ textAlign: "left" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: COLORS.textDim,
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                User ID
              </label>
              <input
                value={form.user_id}
                onChange={(e) =>
                  setForm({ ...form, user_id: e.target.value })
                }
                placeholder="Username"
                required
                style={{
                  width: "100%",
                  borderRadius: "14px",
                  border: `1px solid ${COLORS.border}`,
                  padding: "14px 18px",
                  outline: "none",
                  backgroundColor: COLORS.accent,
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ textAlign: "left" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: COLORS.textDim,
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  borderRadius: "14px",
                  border: `1px solid ${COLORS.border}`,
                  padding: "14px 18px",
                  outline: "none",
                  backgroundColor: COLORS.accent,
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <p
                style={{
                  fontSize: "13px",
                  color: "#d9534f",
                  margin: "4px 0",
                }}
              >
                {error}
              </p>
            )}

            {/* Button */}
            <button
              disabled={loading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: "100%",
                borderRadius: "14px",
                backgroundColor: loading
                  ? "#ccc"
                  : isHovered
                  ? COLORS.textMain
                  : COLORS.brandGreen,
                color: "white",
                padding: "16px",
                fontWeight: "700",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div
            style={{
              marginTop: "32px",
              borderTop: `1px solid ${COLORS.border}40`,
              paddingTop: "24px",
            }}
          >
            <p style={{ fontSize: "13px", color: COLORS.textDim }}>
              Don't have an account?{" "}
              <Link
                href="/signup"
                style={{
                  color: COLORS.brandGreen,
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Join the Club
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
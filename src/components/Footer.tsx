"use client";

import React from "react";
import Link from "next/link";

const COLORS = {
  darkBrown: "#2D241E",
  lightTan: "#d1c7bc",
  mutedBrown: "#8e8175",
  sageGreen: "#b7cf9d",
  white: "#ffffff",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Common link style
  const linkStyle: React.CSSProperties = {
    color: COLORS.lightTan,
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s ease",
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: "24px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: COLORS.mutedBrown,
  };

  const listStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  return (
    <footer style={{ backgroundColor: COLORS.darkBrown, color: COLORS.white, width: "100%" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        
        {/* Main Flex/Grid Wrapper */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "60px", 
          justifyContent: "space-between" 
        }}>
          
          {/* Column 1: Brand & About */}
          <div style={{ flex: "1 1 300px", minWidth: "280px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px", letterSpacing: "-0.01em" }}>
              Moss <span style={{ color: COLORS.sageGreen }}>&</span> Meadows
            </h2>
            <p style={{ color: COLORS.lightTan, fontSize: "14px", lineHeight: "1.7", maxWidth: "320px" }}>
              A premium plant boutique dedicated to bringing fresh greenery and 
              elegance into your everyday living spaces.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div style={{ flex: "0 1 150px", minWidth: "120px" }}>
            <h3 style={headerStyle}>Shop</h3>
            <ul style={listStyle}>
              <li><Link href="/shop" style={linkStyle}>All Plants</Link></li>
              <li><Link href="/shop?category=indoor" style={linkStyle}>Indoor</Link></li>
              <li><Link href="/shop?category=outdoor" style={linkStyle}>Outdoor</Link></li>
              <li><Link href="/shop?category=bulk" style={linkStyle}>Bulk</Link></li>
              <li><Link href="/shop?category=decorative" style={linkStyle}>Decorative</Link></li>
            </ul>
          </div>

          {/* Column 3: Care/Links */}
          <div style={{ flex: "0 1 150px", minWidth: "120px" }}>
            <h3 style={headerStyle}>Care</h3>
            <ul style={listStyle}>
              <li><Link href="/contact" style={linkStyle}>Our Story</Link></li>
              <li><Link href="/contact" style={linkStyle}>Contact</Link></li>
              <li><Link href="/orders" style={linkStyle}>Orders</Link></li>
              <li><Link href="/shipping" style={linkStyle}>Shipping</Link></li>
            </ul>
          </div>

          {/* Column 4: Social Cause Note */}
          <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
            <h3 style={headerStyle}>Sustainability</h3>
            <p style={{ color: COLORS.mutedBrown, fontSize: "13px", lineHeight: "1.6" }}>
              Our pots are handcrafted by local Bachat Gat artisans, ensuring every purchase supports women empowerment.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ 
          marginTop: "60px", 
          paddingTop: "32px", 
          borderTop: `1px solid rgba(255, 255, 255, 0.05)`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <p style={{ 
            fontSize: "10px", 
            fontWeight: "600", 
            textTransform: "uppercase", 
            letterSpacing: "0.3em", 
            color: COLORS.mutedBrown,
            margin: 0
          }}>
            © {currentYear} Moss & Meadows. All rights reserved.
          </p>
          
          <div style={{ display: "flex", gap: "24px" }}>
             <span style={{ fontSize: "10px", color: COLORS.mutedBrown, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}>Privacy</span>
             <span style={{ fontSize: "10px", color: COLORS.mutedBrown, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
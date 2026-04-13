"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; is_admin: boolean } | null>(null);

  // Check login status on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none'
    }}>
      <div style={{
        width: '95%',
        maxWidth: '1200px',
        backgroundColor: '#fdfdfc',
        borderRadius: '100px',
        border: '1px solid #f0ece6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 30px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        pointerEvents: 'auto'
      }}>
        
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#2d3748', letterSpacing: '-0.02em' }}>
            Moss & <span style={{ color: '#008a45' }}>Meadows</span>
          </span>
        </Link>

        {/* Dynamic Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          
          {/* COMMON LINKS (Always show Home) */}
          <Link href="/" style={navLinkStyle}>Home</Link>

          {/* LOGGED OUT VIEW */}
          {!user && (
            <>
              <Link href="/shop" style={navLinkStyle}>Shop</Link>
              <Link href="/shop" style={navLinkStyle}>New Arrivals</Link>
              <Link href="/about" style={navLinkStyle}>About Us</Link>
              <Link href="/login" style={loginButtonStyle}>Login</Link>
            </>
          )}

          {/* ADMIN VIEW */}
          {user && user.is_admin && (
            <>
              <Link href="/shop" style={navLinkStyle}>Shop</Link>
              <Link href="/admin" style={navLinkStyle}>Dashboard</Link>
              <Link href="/about" style={navLinkStyle}>About Us</Link>
              <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            </>
          )}

          {/* CUSTOMER VIEW */}
          {user && !user.is_admin && (
            <>
              <Link href="/shop" style={navLinkStyle}>Shop</Link>
              <Link href="/orders" style={navLinkStyle}>Orders</Link>
              <Link href="/cart" style={{...navLinkStyle, color: '#008a45'}}>Cart</Link>
              <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

// Reusable styles
const navLinkStyle = {
  textDecoration: 'none',
  color: '#4a5568',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'color 0.2s ease',
};

const loginButtonStyle = {
  backgroundColor: '#008a45',
  color: 'white',
  padding: '10px 24px',
  borderRadius: '50px',
  fontSize: '14px',
  fontWeight: '700',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  marginLeft: '10px'
};

const logoutButtonStyle = {
  backgroundColor: '#2d3748',
  color: 'white',
  padding: '10px 24px',
  borderRadius: '50px',
  fontSize: '14px',
  fontWeight: '700',
  border: 'none',
  cursor: 'pointer',
  marginLeft: '10px',
  fontFamily: 'inherit'
};
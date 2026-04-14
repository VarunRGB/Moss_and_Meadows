"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; is_admin: boolean } | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, padding: '20px 0', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{ width: '95%', maxWidth: '1200px', backgroundColor: '#fdfdfc', borderRadius: '100px', border: '1px solid #f0ece6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 30px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', pointerEvents: 'auto' }}>
        
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#2d3748' }}>Moss & <span style={{ color: '#008a45' }}>Meadows</span></span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <Link href="/" style={navLinkStyle}>Home</Link>
          
          <div 
            style={{ position: 'relative', padding: '10px 0' }} // Added padding hit-area
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <span style={{ ...navLinkStyle, cursor: 'pointer' }}>Services ▾</span>
            {isServicesOpen && (
              <div style={dropdownContainerStyle}>
                <Link href="/services/corporate" style={dropdownItemStyle}>Corporate & Education</Link>
                <Link href="/services/medical-retail" style={dropdownItemStyle}>Medical & Retail</Link>
                <Link href="/services/luxury" style={dropdownItemStyle}>Luxury Interiors</Link>
                <Link href="/services/rentals" style={dropdownItemStyle}>Plant Rentals</Link>
                <Link href="/services/maintenance" style={dropdownItemStyle}>Maintenance & Planters</Link>
                <Link href="/social-impact" style={dropdownItemStyle}>Social Impact</Link>
              </div>
            )}
          </div>

          <Link href="/shop" style={navLinkStyle}>Shop</Link>
          <Link href="/gifting" style={navLinkStyle}>Gifting</Link>

          {user?.is_admin ? (
             <Link href="/admin" style={navLinkStyle}>Dashboard</Link>
          ) : user && (
             <Link href="/orders" style={navLinkStyle}>Orders</Link>
          )}

          {user ? (
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
          ) : (
            <Link href="/login" style={loginButtonStyle}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const navLinkStyle = { textDecoration: 'none', color: '#4a5568', fontSize: '14px', fontWeight: '600' };
const loginButtonStyle = { backgroundColor: '#008a45', color: 'white', padding: '10px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', textDecoration: 'none' };
const logoutButtonStyle = { backgroundColor: '#2d3748', color: 'white', padding: '10px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', border: 'none', cursor: 'pointer' };
const dropdownContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '80%', // Adjusted to overlap slightly with the hit-area
  left: '0',
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
  padding: '10px 0',
  width: '230px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #f0ece6',
  zIndex: 1100
};
const dropdownItemStyle = { padding: '12px 20px', textDecoration: 'none', color: '#4a5568', fontSize: '13px', fontWeight: '500', borderBottom: '1px solid #f8f8f8' };
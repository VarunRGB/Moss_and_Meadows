import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: '20px 0', // Spacing above the navbar
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none' // Allows clicking things "under" the transparent area
    }}>
      <div style={{
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: '#fdfdfc',
        borderRadius: '100px', // Perfect Pill Shape
        border: '1px solid #f0ece6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 30px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        pointerEvents: 'auto' // Re-enables clicking for the navbar itself
      }}>
        
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: '#2d3748', 
            letterSpacing: '-0.02em'
          }}>
            Moss & <span style={{ color: '#008a45' }}>Meadows</span>
          </span>
        </Link>

        {/* Navigation Links - Always Visible */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '25px' // Space between links
        }}>
          <Link href="/" style={navLinkStyle}>Home</Link>
          <Link href="/shop" style={navLinkStyle}>Shop</Link>
          <Link href="/shop" style={navLinkStyle}>New Arrivals</Link>
          <Link href="/contact" style={navLinkStyle}>About Us</Link>
          
          <Link
            href="/login"
            style={{
              backgroundColor: '#008a45',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              marginLeft: '10px'
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Reusable style for the text links
const navLinkStyle = {
  textDecoration: 'none',
  color: '#4a5568',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'color 0.2s ease',
};
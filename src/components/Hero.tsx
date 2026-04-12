import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section style={{ backgroundColor: '#fdfaf5', paddingTop: '120px', paddingBottom: '60px', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Main Flex Wrapper - This forces the side-by-side look */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
          
          {/* LEFT SIDE: Text Content */}
          <div style={{ flex: '1', minWidth: '320px', maxWidth: '550px' }}>
            <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '6px 16px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', display: 'inline-block', marginBottom: '24px' }}>
              Welcome to Moss & Meadows
            </span>
            
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', color: '#1a1a1a', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-0.02em' }}>
              Bring Nature <span style={{ color: '#008a45' }}>Into</span> Your Home
            </h1>
            
            <p style={{ fontSize: '18px', color: '#555', marginBottom: '40px', lineHeight: '1.6' }}>
              Discover our curated collection of beautiful plants designed to elevate your space.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/shop" style={{ backgroundColor: '#008a45', color: 'white', padding: '16px 32px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0, 138, 69, 0.3)' }}>
                Shop All Plants →
              </Link>
              <Link href="/shop" style={{ backgroundColor: 'white', color: '#444', padding: '16px 32px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', border: '1px solid #e2e8f0' }}>
                View New Arrivals
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Image with Floating Badge */}
          <div style={{ flex: '1', minWidth: '320px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px', height: '400px', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)', border: '8px solid white' }}>
              <Image
                src="/hero.jpg"
                alt="Plant Hero"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
              
              {/* Floating Badge from your reference */}
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', backgroundColor: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', minWidth: '140px' }}>
                <p style={{ fontSize: '24px', fontWeight: '900', color: '#008a45', margin: '0' }}>12+</p>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#718096', margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plants Available</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
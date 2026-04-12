export default function Features() {
  const items = [
    { 
      title: "Free Delivery", 
      desc: "On orders over ₹1000",
      iconColor: "#dcfce7" 
    },
    { 
      title: "Healthy Guarantee", 
      desc: "Carefully selected plants",
      iconColor: "#dcfce7" 
    },
    { 
      title: "Expert Support", 
      desc: "Get plant care help",
      iconColor: "#dcfce7" 
    },
  ];

  return (
    <section style={{ 
      backgroundColor: '#f8f3eb', // This is the new beige background
      padding: '60px 20px', 
      width: '100%',
      borderTop: '1px solid #f0ece6' // Subtle line to separate from the Hero
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        gap: '40px'
      }}>
        {items.map((item) => (
          <div key={item.title} style={{ 
            textAlign: 'center', 
            flex: '1', 
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* The Green Circle Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: item.iconColor,
              borderRadius: '50%',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.03)' // Very subtle lift
            }}>
              {/* You can add SVG icons inside here later */}
            </div>

            {/* Title */}
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: '#1a202c', 
              margin: '0 0 8px 0',
              letterSpacing: '-0.01em'
            }}>
              {item.title}
            </h3>

            {/* Description */}
            <p style={{ 
              fontSize: '14px', 
              color: '#718096', 
              margin: 0,
              fontWeight: '500',
              lineHeight: '1.5'
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
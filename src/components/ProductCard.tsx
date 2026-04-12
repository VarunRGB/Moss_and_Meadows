"use client";

import Link from "next/link";

type Props = {
  id: string | number; // This will be the plant name (e.g., "Aloe Vera")
  title: string;
  price: string | number;
  image?: string;
  description?: string;
  onAddToCart?: (id: string | number) => void;
};

export default function ProductCard({
  id,
  title,
  price,
  image = "/hero.jpg",
  onAddToCart,
}: Props) {
  // Create the safe URL string once
  const detailPath = `/plants/${encodeURIComponent(id)}`;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      padding: '16px',
      border: '1px solid #f0f0f0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}
    className="hover:-translate-y-2"
    >
      {/* Image Container - Links to Specific Plant Page */}
      <Link href={detailPath} style={{ textDecoration: 'none' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#f8f8f8'
        }}>
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/hero.jpg";
            }}
          />
        </div>
      </Link>

      {/* Content Area */}
      <div style={{ padding: '4px' }}>
        <Link href={detailPath} style={{ textDecoration: 'none' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            color: '#1a1a1a', 
            margin: '0 0 8px 0' 
          }}>
            {title}
          </h3>
        </Link>

        {/* Price */}
        <p style={{ 
          fontSize: '18px', 
          fontWeight: '800', 
          color: '#008a45', 
          margin: '0 0 16px 0' 
        }}>
          ₹{price}
        </p>

        {/* Action Button - Order Now */}
        <button
          onClick={(e) => {
            // Prevent clicking the button from triggering the card's outer Link if applicable
            e.stopPropagation();
            onAddToCart?.(id);
          }}
          style={{
            width: '100%',
            backgroundColor: '#008a45',
            color: 'white',
            border: 'none',
            padding: '14px 0',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: '0.2s ease'
          }}
          className="hover:opacity-90 active:scale-95"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
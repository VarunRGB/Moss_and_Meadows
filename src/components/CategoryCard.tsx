import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  href?: string;
};

export default function CategoryCard({ title, image, href = "/shop" }: Props) {
  return (
    <Link
      href={`${href}?category=${encodeURIComponent(title.toLowerCase())}`}
      className="group relative block aspect-square w-full overflow-hidden rounded-[1.5rem] border border-[#ddd2bf] bg-[#f8f3eb] shadow-sm transition-all hover:shadow-md"
    >
      {/* 1. THE IMAGE: We force it to stay at Z-0 */}
      <Image
        src={image || "/hero.jpg"}
        alt={title}
        fill
        className="object-cover z-0 transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 25vw"
      />

      {/* 2. THE OVERLAY: We force it to Z-10 and use a SOLID background first to ensure visibility */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 50, // Massive z-index to stay on top
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Solid 80% black
          padding: '16px 0',
          backdropFilter: 'blur(4px)' // Premium feel
        }}
      >
        <h3 
          style={{ 
            color: 'white', 
            textAlign: 'center', 
            fontSize: '14px', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            margin: 0
          }}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
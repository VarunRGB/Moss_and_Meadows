import Image from "next/image";

type Props = {
  title: string;
  image: string;
};

export default function CategoryCard({ title, image }: Props) {
  return (
    // Note the added 'relative' class here!
    <div className="relative group rounded-xl overflow-hidden aspect-square w-full shadow-sm hover:shadow-md transition-shadow">
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-300" 
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
}
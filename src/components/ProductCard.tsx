import Image from "next/image";

type Props = {
  title: string;
  price: string;
  image: string;
};

export default function ProductCard({ title, price, image }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <Image src={image} width={300} height={200} alt={title} />

      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="text-green-600 font-bold mt-2">₹{price}</p>

      <button className="btn-primary w-full mt-3">Order Now</button>
    </div>
  );
}
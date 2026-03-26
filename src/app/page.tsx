import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />

      <Section title="Featured Plants">
        <div className="grid md:grid-cols-4 gap-6">
          <ProductCard title="Cactus" price="299.99" image="/images/p1.jpg" />
          <ProductCard title="Succulent" price="199.99" image="/images/p2.jpg" />
          <ProductCard title="Monstera" price="459.99" image="/images/p3.jpg" />
          <ProductCard title="Snake Plant" price="249.99" image="/images/p4.jpg" />
        </div>
      </Section>

      <Section title="New Arrivals">
        <div className="grid md:grid-cols-4 gap-6">
          <ProductCard title="Fiddle Leaf" price="559.99" image="/images/p5.jpg" />
          <ProductCard title="Monstera" price="459.99" image="/images/p3.jpg" />
          <ProductCard title="String of Pearls" price="269.99" image="/images/p6.jpg" />
          <ProductCard title="Echeveria" price="199.99" image="/images/p2.jpg" />
        </div>
      </Section>

      <section className="bg-green-100 pt-20 pb-32"> {/* Increased bottom padding */}
  <div className="container mx-auto px-6"> {/* Added mx-auto and px-6 for alignment */}
    <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">
      Shop by Category
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <CategoryCard title="Cactus" image="/images/p1.jpg" />
      <CategoryCard title="Succulents" image="/images/p2.jpg" />
      <CategoryCard title="Indoor Plants" image="/images/p3.jpg" />
      <CategoryCard title="Decorative Plants" image="/images/p4.jpg" />
    </div>
  </div>
</section>

      <Footer />
    </>
  );
}
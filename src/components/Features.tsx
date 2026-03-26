export default function Features() {
  const items = [
    { title: "Free Delivery", desc: "On orders over ₹100" },
    { title: "Healthy Guarantee", desc: "Carefully selected plants" },
    { title: "Expert Support", desc: "Get plant care help" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container grid md:grid-cols-3 gap-8 text-center">
        {items.map((item, i) => (
          <div key={i}>
            <div className="w-14 h-14 mx-auto bg-green-100 rounded-full mb-4"></div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
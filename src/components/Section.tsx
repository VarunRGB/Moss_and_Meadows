type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button className="btn-secondary">View All →</button>
        </div>
        {children}
      </div>
    </section>
  );
}
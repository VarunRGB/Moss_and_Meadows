import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  id?: string;
};

export default function Section({ title, children, id }: Props) {
  return (
    <section id={id} className="bg-[#f5f0e8] px-4 py-10 md:py-16">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold text-[#3f342c] md:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
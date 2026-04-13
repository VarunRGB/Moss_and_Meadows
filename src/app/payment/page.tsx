"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cartApi, normalizeList, orderApi } from "@/lib/api";

type CartItem = {
  quantity?: number;
  plant?: {
    name: string;
    price: string | number;
  };
  name?: string;
  price?: string | number;
};

export default function PaymentPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    (async () => {
      const data = await cartApi.getCart();
      setItems(normalizeList(data));
    })();
  }, []);

  const total = items.reduce((sum, item) => {
    const plant = item.plant || item;
    return sum + Number(plant.price || 0) * Number(item.quantity || 1);
  }, 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await orderApi.checkout();
    router.push("/orders");
  };

  return (
    <main className="bg-[#f5f0e8]">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-32">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#ddd2bf] bg-[#f8f3eb] p-8 shadow-sm">
            <h1 className="text-4xl font-semibold text-[#3f342c]">Payment Portal</h1>
            <p className="mt-3 text-[#6a5d52]">
              Complete your order details and place the checkout request.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name"
                className="w-full rounded-2xl border border-[#ddd2bf] bg-white px-4 py-3 outline-none focus:border-[#6f8555]"
              />
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Address"
                className="w-full rounded-2xl border border-[#ddd2bf] bg-white px-4 py-3 outline-none focus:border-[#6f8555]"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone Number"
                className="w-full rounded-2xl border border-[#ddd2bf] bg-white px-4 py-3 outline-none focus:border-[#6f8555]"
              />
              <button className="w-full rounded-2xl bg-[#6f8555] py-3 font-medium text-white transition hover:bg-[#5f7448]">
                Place Order
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-[#ddd2bf] bg-[#efe5d6] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#3f342c]">Order Summary</h2>
            <div className="mt-6 space-y-3">
              {items.map((item, index) => {
                const plant = item.plant || item;
                return (
                  <div key={index} className="flex items-center justify-between text-sm text-[#6a5d52]">
                    <span>{plant.name}</span>
                    <span>₹{plant.price}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t border-[#d8cbb8] pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[#6a5d52]">Total</span>
                <span className="text-2xl font-semibold text-[#3f342c]">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
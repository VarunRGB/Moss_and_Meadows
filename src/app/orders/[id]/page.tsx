"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { normalizeList, orderApi } from "@/lib/api";

type Order = {
  id?: string | number;
  _id?: string | number;
  status?: string;
  items?: any[];
  total_amount?: number;
  created_at?: string;
};

const COLORS = {
  bg: "#fdfaf5",
  card: "#ffffff",
  border: "#ddd2bf",
  textMain: "#2D241E",
  textDim: "#8e8175",
  brandGreen: "#008a45",
  accent: "#f8f3eb",
  softBeige: "#f4ede4"
};

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await orderApi.getOrders();
        const list = normalizeList(data);
        const found = list.find((o: Order) => String(o.id || o._id) === String(params.id));
        setOrder(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (loading) {
    return (
      <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "200px", color: COLORS.textDim }}>
          <p style={{ fontStyle: "italic" }}>Opening records...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "160px 24px 100px" }}>
        {/* Back Button */}
        <Link href="/orders" style={{ 
          textDecoration: "none", color: COLORS.textDim, fontSize: "12px", fontWeight: "700", 
          letterSpacing: "1px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "30px" 
        }}>
          ← BACK TO HISTORY
        </Link>

        {order ? (
          <div style={{ 
            backgroundColor: COLORS.card, 
            borderRadius: "32px", 
            padding: "50px", 
            boxShadow: "0 20px 50px rgba(45, 36, 30, 0.05)",
            border: `1px solid ${COLORS.border}40`
          }}>
            {/* Order Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${COLORS.softBeige}`, paddingBottom: "30px", marginBottom: "40px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: "700", color: COLORS.brandGreen, textTransform: "uppercase", letterSpacing: "2px" }}>
                  Receipt Details
                </span>
                <h1 style={{ fontSize: "28px", color: COLORS.textMain, margin: "8px 0 0 0" }}>
                  #{String(order.id || order._id).slice(-8).toUpperCase()}
                </h1>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ 
                  fontSize: "11px", fontWeight: "700", padding: "8px 16px", borderRadius: "100px", 
                  backgroundColor: COLORS.accent, color: COLORS.textMain, textTransform: "uppercase" 
                }}>
                  {order.status || "Confirmed"}
                </span>
              </div>
            </div>

            {/* Items Section */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: COLORS.textMain, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Manifest
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {(order.items || []).map((item, index) => {
                  const plantName = item.name || item.plant?.name || "Botanical Item";
                  const plantPrice = item.price || item.plant?.price || "—";
                  const plantImg = item.image || item.plant?.image;

                  return (
                    <div key={index} style={{ 
                      display: "flex", alignItems: "center", justifyContent: "space-between", 
                      padding: "16px", backgroundColor: COLORS.bg, borderRadius: "16px", border: `1px solid ${COLORS.border}20` 
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ width: "50px", height: "50px", borderRadius: "10px", backgroundColor: COLORS.softBeige, overflow: "hidden" }}>
                          {plantImg && <img src={plantImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                        </div>
                        <span style={{ fontWeight: "600", color: COLORS.textMain }}>{plantName}</span>
                      </div>
                      <span style={{ color: COLORS.textDim }}>₹{plantPrice}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Footer */}
            <div style={{ backgroundColor: COLORS.softBeige, borderRadius: "20px", padding: "24px", marginTop: "40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: COLORS.textDim, fontSize: "14px" }}>
                <span>Subtotal</span>
                <span>₹{order.items?.reduce((acc, i) => acc + (i.price || i.plant?.price || 0), 0).toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", color: COLORS.textDim, fontSize: "14px" }}>
                <span>Logistics & Handling</span>
                <span style={{ color: COLORS.brandGreen, fontWeight: "600" }}>Complimentary</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${COLORS.border}50`, paddingTop: "16px" }}>
                <span style={{ fontWeight: "700", color: COLORS.textMain }}>Final Amount</span>
                <span style={{ fontWeight: "800", color: COLORS.textMain, fontSize: "20px" }}>
                  ₹{order.items?.reduce((acc, i) => acc + (i.price || i.plant?.price || 0), 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div style={{ marginTop: "30px", textAlign: "center" }}>
               <p style={{ fontSize: "12px", color: COLORS.textDim, fontStyle: "italic" }}>
                 Thank you for being part of the Moss & Meadows ecosystem.
               </p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px", backgroundColor: COLORS.card, borderRadius: "32px" }}>
            <p style={{ color: COLORS.textDim }}>The record you are looking for could not be found.</p>
            <Link href="/orders" style={{ display: "inline-block", marginTop: "20px", color: COLORS.brandGreen, fontWeight: "700" }}>Return to History</Link>
          </div>
        )}
      </div>
    </main>
  );
}
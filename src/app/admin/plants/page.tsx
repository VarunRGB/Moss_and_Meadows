"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { normalizeList, plantApi } from "@/lib/api";

type Plant = {
  id?: string | number;
  _id?: string | number;
  name: string;
  price: string | number;
  description?: string;
  image?: string;
  category?: string;
  stock?: string | number;
};

const COLORS = {
  bg: "#fdfaf5",
  card: "#ffffff",
  border: "#ddd2bf",
  textMain: "#2D241E",
  textDim: "#8e8175",
  brandGreen: "#008a45",
  gold: "#b5a48b",
  softBeige: "#f4ede4",
  danger: "#a64444"
};

export default function AdminPlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
  });

  const loadPlants = async () => {
    try {
      // EXACT LOGIC FROM YOUR DASHBOARD
      const data = await plantApi.getPlants() as any;
      
      if (data && (data.error === "Unauthorized" || data.status === 401)) {
        setIsAuthorized(false);
        return;
      }

      setPlants(normalizeList(data));
      setIsAuthorized(true);
    } catch (err: any) {
      // EXACT LOGIC FROM YOUR DASHBOARD
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlants();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", price: "", description: "", image: "", category: "", stock: "" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await plantApi.updatePlant(editingId, form);
    } else {
      await plantApi.addPlant(form);
    }
    resetForm();
    await loadPlants();
  };

  const editPlant = (plant: Plant) => {
    const id = plant.id || plant._id || null;
    setEditingId(id);
    setForm({
      name: plant.name || "",
      price: String(plant.price || ""),
      description: plant.description || "",
      image: plant.image || "",
      category: plant.category || "",
      stock: String(plant.stock || ""),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removePlant = async (id: string | number) => {
    if(confirm("Archive this specimen from the catalog?")) {
      await plantApi.deletePlant(id);
      await loadPlants();
    }
  };

  const togglePlant = async (id: string | number) => {
    await plantApi.togglePlant(id);
    await loadPlants();
  };

  // --- EXACT ACCESS DENIED VIEW FROM DASHBOARD ---
  if (!isAuthorized && !loading) {
    return (
      <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "180px 20px" }}>
          <div style={{ textAlign: "center", padding: "60px 40px", backgroundColor: COLORS.card, borderRadius: "40px", border: `1px solid ${COLORS.border}50`, maxWidth: "500px", boxShadow: "0 20px 40px rgba(45, 36, 30, 0.05)" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔒</div>
            <h2 style={{ fontSize: "24px", color: COLORS.textMain, marginBottom: "12px", fontWeight: "600" }}>Restricted Access</h2>
            <p style={{ color: COLORS.textDim, marginBottom: "30px", lineHeight: "1.6" }}>The Executive Dashboard is reserved for authorized botanical administrators.</p>
            <Link href="/login" style={{ backgroundColor: COLORS.textMain, color: "white", padding: "16px 40px", borderRadius: "100px", textDecoration: "none", fontWeight: "700", fontSize: "14px", letterSpacing: "1px" }}>LOGIN AS ADMIN</Link>
          </div>
        </div>
      </main>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "15px",
    border: `1px solid ${COLORS.border}80`,
    backgroundColor: COLORS.bg,
    color: COLORS.textMain,
    outline: "none",
    fontSize: "14px",
    marginBottom: "15px"
  };

  return (
    <main style={{ backgroundColor: COLORS.bg, minHeight: "100vh" }}>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "160px 24px 100px" }}>
        {/* Posh Header */}
        <header style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "40px", marginBottom: "60px" }}>
          <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "4px", textTransform: "uppercase", color: COLORS.brandGreen }}>Catalog Management</span>
          <h1 style={{ fontSize: "3.5rem", color: COLORS.textMain, marginTop: "15px", fontWeight: "500", letterSpacing: "-1px", fontFamily: "serif" }}>Botanical Inventory</h1>
          <p style={{ color: COLORS.textDim, marginTop: "10px", fontSize: "15px" }}>Curate and manage the Moss & Meadows plant collection.</p>
        </header>

        {/* Form Section */}
        <section style={{ backgroundColor: COLORS.card, borderRadius: "35px", padding: "40px", border: `1px solid ${COLORS.border}40`, boxShadow: "0 15px 40px rgba(45,36,30,0.03)", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: COLORS.textMain, marginBottom: "25px" }}>{editingId ? "Edit Specimen" : "Add New Specimen"}</h2>
          <form onSubmit={submit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Botanical Name" />
              <input style={inputStyle} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (INR)" />
              <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category (e.g. Indoor)" />
              <input style={inputStyle} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Stock Quantity" />
            </div>
            <input style={inputStyle} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" />
            <textarea style={{ ...inputStyle, minHeight: "100px", fontFamily: "sans-serif" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed Description" />
            
            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <button type="submit" style={{ backgroundColor: COLORS.textMain, color: "white", padding: "14px 35px", borderRadius: "100px", border: "none", fontWeight: "700", fontSize: "12px", letterSpacing: "1px", cursor: "pointer" }}>
                {editingId ? "UPDATE CATALOG" : "ADD TO CATALOG"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={{ backgroundColor: "transparent", color: COLORS.textDim, padding: "14px 35px", borderRadius: "100px", border: `1px solid ${COLORS.border}`, fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {loading ? <p style={{ textAlign: "center", color: COLORS.textDim, letterSpacing: "2px" }}>SYNCING CATALOG...</p> : plants.map((plant) => {
            const id = plant.id || plant._id || "";
            return (
              <div key={String(id)} style={{ backgroundColor: COLORS.card, borderRadius: "30px", padding: "25px", border: `1px solid ${COLORS.border}30`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <img src={plant.image || "/hero.jpg"} alt="" style={{ width: "80px", height: "80px", borderRadius: "20px", objectFit: "cover", backgroundColor: COLORS.bg }} />
                  <div>
                    <h4 style={{ fontSize: "18px", color: COLORS.textMain, fontWeight: "600", marginBottom: "4px" }}>{plant.name}</h4>
                    <p style={{ fontSize: "13px", color: COLORS.textDim }}>₹{plant.price} <span style={{ color: COLORS.border, margin: "0 8px" }}>|</span> {plant.category || "General"}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => editPlant(plant)} style={{ padding: "10px 20px", borderRadius: "50px", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", border: `1px solid ${COLORS.border}`, backgroundColor: "white", color: COLORS.textMain, cursor: "pointer" }}>EDIT</button>
                  <button onClick={() => togglePlant(id)} style={{ padding: "10px 20px", borderRadius: "50px", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", border: "none", backgroundColor: COLORS.softBeige, color: COLORS.brandGreen, cursor: "pointer" }}>VISIBILITY</button>
                  <button onClick={() => removePlant(id)} style={{ padding: "10px 20px", borderRadius: "50px", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", border: "none", backgroundColor: "#fdf2f2", color: COLORS.danger, cursor: "pointer" }}>DELETE</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
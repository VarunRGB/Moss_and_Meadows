const BASE_URL = "https://mnm-backend-zym2.onrender.com";

type AnyObject = Record<string, any>;

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  
  const text = await res.text();
  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || `Error ${res.status}`);
  }

  return data as T;
}

export const authApi = {
  signup: (body: any) => 
    request("/signup", { method: "POST", body: JSON.stringify(body) }),

  login: async (body: any) => {
    const data = await request<any>("/login", { method: "POST", body: JSON.stringify(body) });
    if (data.token) localStorage.setItem("token", data.token);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export const plantApi = {
  getPlants: (category = "") => request(`/plants${category ? `?category=${category}` : ""}`),
  
  // NEW: Added Add, Update, Toggle, and Delete
  addPlant: (body: AnyObject) => 
    request("/plants/add", { method: "POST", body: JSON.stringify(body) }),
  
  updatePlant: (id: string, body: AnyObject) => 
    request(`/plants/update/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  
  togglePlant: (id: string | number) => 
    request(`/plants/toggle/${id}`, { method: "POST" }),
    
  deletePlant: (id: string | number) => 
    request(`/plants/delete/${id}`, { method: "DELETE" }),
};

export const cartApi = {
  getCart: () => request("/cart"),
  addToCart: (plant_id: string, quantity: number = 1) => 
    request("/cart/add", { 
      method: "POST", 
      body: JSON.stringify({ plant_id, quantity }) 
    }),
  removeFromCart: (plant_id: string) => 
    request("/cart/remove", { 
      method: "POST", 
      body: JSON.stringify({ plant_id }) 
    }),
};

export const orderApi = {
  checkout: () => request("/orders/checkout", { method: "POST" }),
  getOrders: () => request("/orders"),
};

export const adminApi = {
  getOrders: () => request("/admin/orders"),
  getDashboard: () => request("/admin/dashboard"),
  updateStatus: (orderId: string, status: string) => 
    request(`/admin/orders/${orderId}/status`, {
      method: "POST",
      body: JSON.stringify({ status })
    }),
};

export function normalizeList(data: any) {
  if (Array.isArray(data)) return data;
  return (
    data?.plants ||
    data?.orders ||
    data?.items ||
    data?.cart_items ||
    data?.cart ||
    data?.data ||
    []
  );
}
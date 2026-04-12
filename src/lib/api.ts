const BASE_URL = "https://mnm-backend-zym2.onrender.com";

type AnyObject = Record<string, any>;

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await res.text();
  let data: any = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    throw new Error(data?.message || data || `Request failed (${res.status})`);
  }

  return data as T;
}

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

export const authApi = {
  signup: (body: AnyObject) => request("/signup", { method: "POST", body: JSON.stringify(body) }),
  login: (body: AnyObject) => request("/login", { method: "POST", body: JSON.stringify(body) }),
  logout: () => request("/logout", { method: "POST" }),
  updateUser: (body: AnyObject) =>
    request("/user/update", { method: "POST", body: JSON.stringify(body) }),
};

export const plantApi = {
  getPlants: (category = "") =>
    request(category ? `/plants?category=${encodeURIComponent(category)}` : "/plants"),
  searchPlants: (name: string) => request(`/plants/search/${encodeURIComponent(name)}`),
  addPlant: (body: AnyObject) => request("/plants/add", { method: "POST", body: JSON.stringify(body) }),
  updatePlant: (id: string | number, body: AnyObject) =>
    request(`/plants/update/${id}`, { method: "POST", body: JSON.stringify(body) }),
  deletePlant: (id: string | number) => request(`/plants/delete/${id}`, { method: "DELETE" }),
  togglePlant: (id: string | number) => request(`/plants/toggle/${id}`, { method: "POST" }),
};

export const cartApi = {
  getCart: () => request("/cart"),
  addToCart: (body: AnyObject) => request("/cart/add", { method: "POST", body: JSON.stringify(body) }),
  removeFromCart: (body: AnyObject) =>
    request("/cart/remove", { method: "POST", body: JSON.stringify(body) }),
};

export const orderApi = {
  checkout: () => request("/orders/checkout", { method: "POST" }),
  getOrders: () => request("/orders"),
};

export const adminApi = {
  getOrders: () => request("/admin/orders"),
  updateOrderStatus: (id: string | number, status: string) =>
    request(`/admin/orders/${id}/status`, {
      method: "POST",
      body: JSON.stringify({ status }),
    }),
  getDashboard: () => request("/admin/dashboard"),
};
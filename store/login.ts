// store/useAuthStore.ts
import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

type AuthState = {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  loading: false,
  error: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  login: async () => {
    const { email, password } = get();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!email || !password) {
      set({ error: "Email and password are required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      set({ error: "Invalid email format" });
      return;
    }

    if (password.length < 6) {
      set({ error: "Password must be at least 6 characters" });
      return;
    }

    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${API_URL}/api/student/login`, { email, password });
      console.log("Login success:", res.data);
      const {msg, token, user} = res.data;
      Cookies.set("token", token, {path: "/", expires: 3});
      Cookies.set("user", user, {path: "/", expires: 3});
      toast.success(msg);
    } catch (err: any) {
      set({ error: err.response?.data?.msg || "Login failed" });
      toast.error(err?.response?.data?.msg);
    } finally {
      set({ loading: false });
    }
  },
}));

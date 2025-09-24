"use client";

import React from "react";
import { useAuthStore } from "@/store/login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function StudentLogin() {
  const { email, password, setEmail, setPassword, loading, error, setLoading, setError } =
    useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

    // validations
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(`${API_URL}/api/student/login`, {
        email,
        password,
      });

      const { msg, token, user } = res.data;
      Cookies.set("token", token, { path: "/", expires: 3 });
      Cookies.set("user", JSON.stringify(user), { path: "/", expires: 3 });
      toast.success(msg);
      router.push("/dashboard/student");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Login failed");
      toast.error(err?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] bg-gray-50">
      {/* Logo as top nav */}
      <div className="w-full pt-5 flex justify-center">
        <Image
          src="/boride-black-crop.png"
          width={120}
          height={120}
          alt="borides"
          className="object-contain"
          priority
        />
      </div>

      {/* Login card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-sm p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Student Login
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p>
              New user?{" "}
              <Link
                href="/student/register"
                className="underline text-blue-500"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

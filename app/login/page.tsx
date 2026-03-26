"use client";

import { useState } from "react";
import { Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Our connection

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // REAL AUTHENTICATION CHECK
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Access Denied: " + error.message);
    } else {
      // If password is correct, send them to the dashboard
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-blue-900 p-8 text-center">
          <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Staff Portal</h1>
          <p className="text-blue-200 text-sm">Authorized Management Only</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900"
                  placeholder="admin@multiservicepro.co.tz"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Secure Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
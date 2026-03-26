"use client";

import { useState } from "react";
import { Lock, Mail, UserPlus, LogIn, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function ClientLoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggles between Login and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // 1. LOG IN EXISTING CLIENT
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert("Login Failed: " + error.message);
      else router.push("/client-dashboard"); // Send to their private portal
    } else {
      // 2. REGISTER NEW CLIENT
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) alert("Sign Up Failed: " + error.message);
      else {
        alert("Account created successfully! You can now log in.");
        setIsLogin(true); // Switch back to login view
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="mx-auto bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner">
            {isLogin ? <LogIn className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? "Client Portal" : "Create Account"}</h1>
          <p className="text-blue-100 text-sm mt-1">
            {isLogin ? "Welcome back to MultiServicePro" : "Join us to track your services"}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900"
                  placeholder="client@example.com"
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
              {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Log In" : "Sign Up")}
            </button>
          </form>

          {/* Toggle Button */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-blue-600 font-bold hover:underline"
              >
                {isLogin ? "Sign up here" : "Log in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
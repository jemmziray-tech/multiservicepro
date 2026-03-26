"use client";

import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation"; // <-- The Router is imported here

export default function LoginPage() {
  
  const router = useRouter(); // <-- We initialize the router here

  // This function handles the form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Instead of just showing an alert, this command moves the user to the /dashboard page
    router.push("/dashboard"); 
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* The Login Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Card Header */}
        <div className="bg-blue-900 p-8 text-center">
          <div className="mx-auto bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Staff Portal</h1>
          <p className="text-blue-200 text-sm">Authorized access for Management only</p>
        </div>

        {/* Card Body (The Form) */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition text-gray-900 bg-white"
                  placeholder="admin@multiservicepro.co.tz"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition text-gray-900 bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2 shadow-md"
            >
              Secure Login <Lock className="w-4 h-4" />
            </button>
            
          </form>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            This portal is strictly restricted to the Admin/CEO, Marketing Manager, and Finance Manager.
          </p>
        </div>

      </div>
    </main>
  );
}
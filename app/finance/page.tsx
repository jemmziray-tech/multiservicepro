"use client";

import { useEffect, useState } from "react";
import { DollarSign, FileDown, Receipt, Landmark, Wallet } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function FinancePage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceData = async () => {
      const { data } = await supabase.from('bookings').select('*');
      if (data) setBookings(data);
      setLoading(false);
    };
    fetchFinanceData();
  }, []);

  // Professional feature: Exporting data to a simple CSV/Text file
  const exportReport = () => {
    const reportData = bookings.map(b => `${b.full_name}, ${b.service}, ${b.preferred_date}`).join("\n");
    const blob = new Blob([`Name, Service, Date\n${reportData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance_report.csv';
    a.click();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Landmark className="text-blue-600" /> Finance Management
          </h1>
          <button 
            onClick={exportReport}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
          >
            <FileDown className="w-5 h-5" /> Export Financial Report
          </button>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Wallet className="text-blue-500 mb-2" />
            <p className="text-sm text-gray-500">Projected Revenue</p>
            <p className="text-2xl font-bold text-gray-900">TZS {bookings.length * 50000}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Receipt className="text-orange-500 mb-2" />
            <p className="text-sm text-gray-500">Pending Invoices</p>
            <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <DollarSign className="text-green-500 mb-2" />
            <p className="text-sm text-gray-500">Average Service Value</p>
            <p className="text-2xl font-bold text-gray-900">TZS 50,000</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Transaction ID</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Client</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Service</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-50">
                  <td className="p-4 text-sm text-gray-500">#INV-00{b.id}</td>
                  <td className="p-4 font-medium">{b.full_name}</td>
                  <td className="p-4 text-sm text-blue-600">{b.service}</td>
                  <td className="p-4 font-bold">TZS 50,000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
import { FileText, Image as ImageIcon, Download } from "lucide-react";

export default function MarketingPage() {
  // These represent the 5 flyers and 1 proposal required by your structure
  const materials = [
    { title: "Logistics Excellence Flyer", type: "Flyer", color: "bg-blue-100" },
    { title: "IT Solutions Overview", type: "Flyer", color: "bg-green-100" },
    { title: "Agriculture Innovation", type: "Flyer", color: "bg-orange-100" },
    { title: "Garage & Spares Promo", type: "Flyer", color: "bg-red-100" },
    { title: "Cleaning Services Flyer", type: "Flyer", color: "bg-purple-100" },
    { title: "New Business Idea Proposal", type: "Proposal", color: "bg-gray-800", text: "text-white" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900">Marketing Materials</h1>
          <p className="text-gray-600 mt-4">Required flyers and business proposals for company growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
              {/* Flyer/Proposal Placeholder Image */}
              <div className={`${item.color} h-48 flex items-center justify-center`}>
                {item.type === "Flyer" ? (
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                ) : (
                  <FileText className="w-16 h-16 text-white" />
                )}
              </div>
              
              <div className="p-6 flex-grow">
                <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${item.type === "Flyer" ? "bg-blue-50 text-blue-600" : "bg-gray-200 text-gray-800"}`}>
                  {item.type}
                </span>
                <h3 className="text-xl font-bold mt-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">Professional branding material for marketing campaigns.</p>
                
                <button className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
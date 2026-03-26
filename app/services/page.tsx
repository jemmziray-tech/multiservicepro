// We import the specific icons we need from the lucide-react library
import { Truck, SprayCan, Monitor, Leaf, Wrench, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  // Here we list out all the services with professional Lucide icons
  const services = [
    {
      title: "Logistics",
      description: "Reliable and efficient transportation, delivery, and supply chain solutions tailored to your needs.",
      icon: <Truck className="w-10 h-10 text-blue-600" />
    },
    {
      title: "Farmigation & Cleaning",
      description: "Professional pest control, farmigation, and deep cleaning services to keep your environments safe.",
      icon: <SprayCan className="w-10 h-10 text-blue-600" />
    },
    {
      title: "IT Services",
      description: "Modern technology solutions, website development, networking, and digital support for your business.",
      icon: <Monitor className="w-10 h-10 text-blue-600" />
    },
    {
      title: "Agriculture",
      description: "Innovative agricultural practices, consulting, and supply of high-quality farming products.",
      icon: <Leaf className="w-10 h-10 text-blue-600" />
    },
    {
      title: "Garage & Spare",
      description: "Expert vehicle repair, maintenance, and genuine spare parts to keep you on the road.",
      icon: <Wrench className="w-10 h-10 text-blue-600" />
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of professional services to meet all your personal and business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition duration-300 border border-gray-100">
              
              {/* Professional Icon Display */}
              <div className="mb-6 bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center">
                {service.icon}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
              
              {/* Quick Book Button */}
              <button className="mt-6 text-blue-600 font-semibold hover:text-blue-800 transition flex items-center gap-2">
                Book this service <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
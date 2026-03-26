import { Target, Shield, Users, Briefcase } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">About MultiServicePro</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are a dedicated team of professionals providing top-tier logistics, agriculture, IT, and maintenance services across Tanzania.
          </p>
        </div>

        {/* Mission and Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
            <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600">To deliver reliable, all-in-one solutions that empower businesses and individuals to thrive.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
            <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Promise</h3>
            <p className="text-gray-600">We guarantee quality, transparency, and dedication in every service we provide, from farming to IT.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition">
            <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Client Focused</h3>
            <p className="text-gray-600">Our clients are at the center of our structure. Your success is our ultimate business goal.</p>
          </div>
        </div>

        {/* Leadership Structure Section */}
        <div className="bg-blue-900 rounded-2xl shadow-xl overflow-hidden text-white">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Structure</h2>
            <p className="text-blue-200 max-w-2xl mx-auto mb-12">
              Our company is guided by a strong organizational framework designed to ensure excellence in every department.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Admin/CEO */}
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold">The Admin / CEO</h3>
                <p className="text-blue-300 text-sm mt-2">Overseeing all operations and strategic direction.</p>
              </div>

              {/* Marketing Manager */}
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold">Marketing Manager</h3>
                <p className="text-blue-300 text-sm mt-2">Driving our brand, client relations, and digital presence.</p>
              </div>

              {/* Finance Manager */}
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold">Finance Manager</h3>
                <p className="text-blue-300 text-sm mt-2">Ensuring secure transactions, accounting, and financial health.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
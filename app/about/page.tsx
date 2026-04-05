"use client";

import { Target, Shield, Users, Briefcase } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function AboutPage() {
  // --- Animation Variants ---
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#09090b] py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-500 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 dark:bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 dark:bg-indigo-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn} 
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">MultiServicePro</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We are a dedicated team of professionals providing top-tier logistics, agriculture, IT, and maintenance services across Tanzania.
          </p>
        </motion.div>

        {/* Mission and Values Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={staggerContainer} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          <motion.div variants={fadeIn} className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-white/50 dark:border-gray-800/60 text-center hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 group">
            <div className="mx-auto bg-blue-50 dark:bg-blue-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Target className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">To deliver reliable, all-in-one solutions that empower businesses and individuals to thrive.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-white/50 dark:border-gray-800/60 text-center hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-500 group">
            <div className="mx-auto bg-green-50 dark:bg-green-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <Shield className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Promise</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">We guarantee quality, transparency, and dedication in every service we provide, from farming to IT.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-white/50 dark:border-gray-800/60 text-center hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500 group">
            <div className="mx-auto bg-purple-50 dark:bg-purple-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Client Focused</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Our clients are at the center of our structure. Your success is our ultimate business goal.</p>
          </motion.div>
        </motion.div>

        {/* Leadership Structure Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeIn}
          className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-[3rem] shadow-2xl overflow-hidden text-white relative border border-white/10"
        >
          {/* Decorative Interior Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="p-10 md:p-16 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">Our Leadership Structure</h2>
            <p className="text-blue-200/80 max-w-2xl mx-auto mb-16 text-lg">
              Our company is guided by a strong organizational framework designed to ensure excellence in every department.
            </p>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              
              {/* Admin/CEO */}
              <motion.div variants={fadeIn} className="flex flex-col items-center group">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl mb-6 border border-white/10 shadow-lg group-hover:bg-white/20 transition-all duration-300 group-hover:-translate-y-2">
                  <Briefcase className="w-10 h-10 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2">The Admin / CEO</h3>
                <p className="text-blue-200/70 text-sm max-w-[250px] leading-relaxed">Overseeing all operations and strategic direction.</p>
              </motion.div>

              {/* Marketing Manager */}
              <motion.div variants={fadeIn} className="flex flex-col items-center group">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl mb-6 border border-white/10 shadow-lg group-hover:bg-white/20 transition-all duration-300 group-hover:-translate-y-2">
                  <Briefcase className="w-10 h-10 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Marketing Manager</h3>
                <p className="text-blue-200/70 text-sm max-w-[250px] leading-relaxed">Driving our brand, client relations, and digital presence.</p>
              </motion.div>

              {/* Finance Manager */}
              <motion.div variants={fadeIn} className="flex flex-col items-center group">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl mb-6 border border-white/10 shadow-lg group-hover:bg-white/20 transition-all duration-300 group-hover:-translate-y-2">
                  <Briefcase className="w-10 h-10 text-emerald-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Finance Manager</h3>
                <p className="text-blue-200/70 text-sm max-w-[250px] leading-relaxed">Ensuring secure transactions, accounting, and financial health.</p>
              </motion.div>

            </motion.div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
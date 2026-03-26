"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion"; // <-- FIX: Imported Variants
import { Truck, Monitor, Tractor, Wrench, ArrowRight } from "lucide-react";

export default function HomePage() {
  // --- Animation Recipes ---
  // FIX: Added ': Variants' so TypeScript knows exactly what these are
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // This makes items appear one after another
      }
    }
  };

  // Your Services Data
  const services = [
    { title: "Logistics", icon: <Truck className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400" />, desc: "Reliable transport and comprehensive fleet management." },
    { title: "IT Services", icon: <Monitor className="w-10 h-10 mb-4 text-purple-600 dark:text-purple-400" />, desc: "Network setup, software solutions, and tech support." },
    { title: "Agriculture", icon: <Tractor className="w-10 h-10 mb-4 text-green-600 dark:text-green-400" />, desc: "Modern farming solutions, farmigation, and equipment." },
    { title: "Garage", icon: <Wrench className="w-10 h-10 mb-4 text-orange-600 dark:text-orange-400" />, desc: "Expert vehicle repair and preventative maintenance." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 opacity-60"></div>

        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
            Welcome to Our <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">Multi-Service</span> Platform
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your one-stop solution for Logistics, IT, Agriculture, and Garage Services. Professional, reliable, and ready to scale your business.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/services" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center gap-2 group">
              Explore Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/book" className="bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition shadow-sm">
              Book an Appointment
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SERVICES GRID SECTION --- */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">Our Expertise</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Everything you need, in one place.</h3>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
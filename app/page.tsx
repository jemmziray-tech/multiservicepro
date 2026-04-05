"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Truck, Monitor, Tractor, Wrench, ArrowRight, Star, Quote } from "lucide-react";

export default function HomePage() {
  // --- Animation Recipes ---
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

  // --- Data ---
  const services = [
    { title: "Logistics", icon: <Truck className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />, desc: "Reliable transport and comprehensive fleet management." },
    { title: "IT Services", icon: <Monitor className="w-10 h-10 mb-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />, desc: "Network setup, software solutions, and tech support." },
    { title: "Agriculture", icon: <Tractor className="w-10 h-10 mb-4 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />, desc: "Modern farming solutions, farmigation, and equipment." },
    { title: "Garage", icon: <Wrench className="w-10 h-10 mb-4 text-orange-600 dark:text-orange-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />, desc: "Expert vehicle repair and preventative maintenance." }
  ];

  // Fake reviews
  const testimonials = [
    { name: "Amani J.", role: "Fleet Manager", text: "MultiServicePro overhauled our entire delivery fleet in under a week. Incredible garage service!", rating: 5 },
    { name: "Sarah M.", role: "Operations Director", text: "The logistics team handled our Dar es Salaam port clearance flawlessly. Highly recommended.", rating: 5 },
    { name: "David K.", role: "Farm Owner", text: "Their farmigation setup increased our crop yield by 30% this season. Top-tier agricultural experts.", rating: 5 },
    { name: "Linda E.", role: "Tech Startup CEO", text: "They completely networked our new office and set up our cloud infrastructure without a hitch.", rating: 5 },
  ];

  // Duplicated for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] transition-colors duration-500 overflow-hidden relative">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 dark:bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/20 dark:bg-purple-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-green-600/10 dark:bg-green-600/5 blur-[120px] pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tighter mb-8 leading-tight">
            Welcome to Our <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 drop-shadow-sm">Multi-Service</span> Platform
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-gray-300/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your one-stop solution for Logistics, IT, Agriculture, and Garage Services. Professional, reliable, and ready to scale your business.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/services" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center gap-2 group">
              Explore Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/book" className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white dark:hover:bg-gray-800 transition-all hover:-translate-y-1 shadow-sm">
              Book an Appointment
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SERVICES GRID SECTION --- */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">Our Expertise</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Everything you need, in one place.</h3>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeIn} 
                  className="group bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/40 dark:border-gray-800/60 text-center flex flex-col items-center hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:border-gray-700 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="p-4 bg-white/80 dark:bg-gray-800/50 rounded-2xl mb-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
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

      {/* --- TESTIMONIALS CAROUSEL --- */}
      <section className="py-24 relative z-10 overflow-hidden border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Client Success Stories</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Trusted by businesses across Tanzania.</h3>
        </div>

        {/* The Infinite Scrolling Container */}
        <div className="relative w-full flex overflow-hidden">
          
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#09090b] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#09090b] to-transparent z-20 pointer-events-none"></div>

          <motion.div 
            className="flex gap-6 whitespace-nowrap px-4"
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }} 
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-[350px] sm:w-[420px] flex-shrink-0 bg-white/50 dark:bg-gray-900/30 backdrop-blur-md border border-white/60 dark:border-gray-800/60 p-8 rounded-3xl whitespace-normal hover:bg-white/80 dark:hover:bg-gray-900/60 transition-colors duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400 drop-shadow-sm" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-500/20 dark:text-blue-400/20 mb-4" />
                <p className="text-gray-700 dark:text-gray-300/90 text-lg mb-8 leading-relaxed font-medium">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-800 pt-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
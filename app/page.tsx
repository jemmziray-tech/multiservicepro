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
    { title: "Logistics", icon: <Truck className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400" />, desc: "Reliable transport and comprehensive fleet management." },
    { title: "IT Services", icon: <Monitor className="w-10 h-10 mb-4 text-purple-600 dark:text-purple-400" />, desc: "Network setup, software solutions, and tech support." },
    { title: "Agriculture", icon: <Tractor className="w-10 h-10 mb-4 text-green-600 dark:text-green-400" />, desc: "Modern farming solutions, farmigation, and equipment." },
    { title: "Garage", icon: <Wrench className="w-10 h-10 mb-4 text-orange-600 dark:text-orange-400" />, desc: "Expert vehicle repair and preventative maintenance." }
  ];

  // Fake reviews (You can change these to real ones later!)
  const testimonials = [
    { name: "Amani J.", role: "Fleet Manager", text: "MultiServicePro overhauled our entire delivery fleet in under a week. Incredible garage service!", rating: 5 },
    { name: "Sarah M.", role: "Operations Director", text: "The logistics team handled our Dar es Salaam port clearance flawlessly. Highly recommended.", rating: 5 },
    { name: "David K.", role: "Farm Owner", text: "Their farmigation setup increased our crop yield by 30% this season. Top-tier agricultural experts.", rating: 5 },
    { name: "Linda E.", role: "Tech Startup CEO", text: "They completely networked our new office and set up our cloud infrastructure without a hitch.", rating: 5 },
  ];

  // We duplicate the array so the infinite scroll never has a "blank" gap
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 opacity-60"></div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">Our Expertise</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Everything you need, in one place.</h3>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div key={index} variants={fadeIn} whileHover={{ scale: 1.05, y: -5 }} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center hover:shadow-xl transition-all duration-300">
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

      {/* --- TESTIMONIALS CAROUSEL (NEW!) --- */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase mb-3">Client Success Stories</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Trusted by businesses across Tanzania.</h3>
        </div>

        {/* The Infinite Scrolling Container */}
        <div className="relative w-full flex overflow-hidden">
          
          {/* Fading Edges (Makes it look like cards are appearing/disappearing into the background) */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10"></div>

          <motion.div 
            className="flex gap-6 whitespace-nowrap px-4"
            animate={{ x: ["0%", "-50%"] }} // Slides exactly halfway, then resets instantly
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }} // 25 seconds for a smooth, readable scroll
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-[350px] sm:w-[400px] flex-shrink-0 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl whitespace-normal"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-gray-300 dark:text-gray-700 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
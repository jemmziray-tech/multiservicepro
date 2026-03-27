"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, X } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // --- BUSINESS CONTACT DETAILS ---
  // Note: For WhatsApp, use the country code (255) without the '+' symbol
  const whatsappNumber = "255743924467"; 
  const phoneNumber = "+255743924467";
  const email = "info@multiservicepro.co.tz";

  // Animation variants for the pop-up menu
  const menuVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* The Expanding Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-3xl p-4 mb-4 w-64 flex flex-col gap-2 origin-bottom-right"
          >
            <div className="p-2 border-b border-gray-100 dark:border-gray-800 mb-2">
              <p className="font-bold text-gray-900 dark:text-white text-sm">Need help?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">We usually reply instantly.</p>
            </div>

            {/* WhatsApp Button */}
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hello MultiServicePro, I need some assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
            >
              <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-bold text-sm">WhatsApp Us</span>
            </a>

            {/* Phone Button */}
            <a 
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-bold text-sm">Call Office</span>
            </a>

            {/* Email Button */}
            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
            >
              <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-full group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="font-bold text-sm">Send Email</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Main Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

    </div>
  );
}
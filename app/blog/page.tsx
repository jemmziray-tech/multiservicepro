"use client";

import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "The Future of Smart Farming in Tanzania",
      excerpt: "How modern IT solutions and automated irrigation are changing the landscape of local agriculture, increasing yields by up to 30%.",
      category: "Agriculture",
      author: "Agri-Expert",
      date: "March 25, 2026",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Top 5 Security Tips for Small Business IT",
      excerpt: "Protecting your digital assets is more important than ever. Here is how to stay safe from cyber threats and ensure data integrity.",
      category: "IT Services",
      author: "Tech Team",
      date: "March 22, 2026",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Optimizing Logistics for Faster Delivery",
      excerpt: "Our new route tracking system has reduced delivery times by 20%. See how we're utilizing fleet management to improve efficiency.",
      category: "Logistics",
      author: "Logistics Mgr",
      date: "March 18, 2026",
      image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#09090b] py-32 px-4 transition-colors duration-500 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 dark:bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-green-600/10 dark:bg-green-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6"
          >
            Company News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Insights</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Stay updated with the latest trends, expert tips, and success stories from MultiServicePro across all our sectors.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={post.id} 
              className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2rem] shadow-lg border border-white/50 dark:border-gray-800/60 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              
              {/* Featured Image */}
              <div className="h-56 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                {/* Title */}
                <Link href={`/blog/${post.id}`} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                  {post.title}
                </Link>

                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Data */}
                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800/80 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    {post.author}
                  </div>
                </div>

                {/* THE MAGIC LINK */}
                <Link href={`/blog/${post.id}`} className="mt-8 flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold py-3.5 rounded-xl transition-all group-hover:gap-3 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800/50">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </main>
  );
}
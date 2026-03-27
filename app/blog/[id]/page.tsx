import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

// We keep the data here so the template knows what to load
const posts = [
  {
    id: 1,
    title: "The Future of Smart Farming in Tanzania",
    category: "Agriculture",
    author: "Agri-Expert",
    date: "March 25, 2026",
    imageColor: "bg-green-600",
    content: "Tanzania's agricultural sector is undergoing a massive transformation. With the introduction of automated farmigation systems, local farmers in regions like Morogoro and Arusha are seeing crop yields increase by up to 40%. By utilizing IoT sensors to monitor soil moisture and nutrient levels, water waste is minimized. MultiServicePro is at the forefront of this revolution, installing solar-powered smart irrigation systems that guarantee year-round productivity regardless of unpredictable weather patterns."
  },
  {
    id: 2,
    title: "Top 5 Security Tips for Small Business IT",
    category: "IT Services",
    author: "Tech Team",
    date: "March 22, 2026",
    imageColor: "bg-blue-600",
    content: "In 2026, a simple antivirus is no longer enough. Cyber threats are targeting small businesses in Dar es Salaam more than ever. Here are the top 5 steps every CEO must take: \n\n1. Enforce Two-Factor Authentication (2FA) on all company emails. \n2. Use cloud backups that update daily. \n3. Secure your office Wi-Fi with WPA3 encryption. \n4. Train employees on spotting phishing emails. \n5. Hire a dedicated IT management team (like MultiServicePro) to monitor your network 24/7."
  },
  {
    id: 3,
    title: "Optimizing Logistics for Faster Delivery",
    category: "Logistics",
    author: "Logistics Mgr",
    date: "March 18, 2026",
    imageColor: "bg-orange-600",
    content: "Time is money, especially when moving goods from the Dar es Salaam port to landlocked neighboring countries. We recently overhauled our entire fleet tracking software. Now, every truck is equipped with real-time GPS and AI-driven route optimization that actively avoids traffic hotspots and poor road conditions. This upgrade has reduced our average delivery time by 20%, ensuring our clients get their goods faster and safer than ever before."
  }
];

export default function ArticlePage({ params }: { params: { id: string } }) {
  const articleId = Number(params.id); // Get the ID from the URL (e.g., /blog/1)
  
  // Find the exact post that matches the URL
  const post = posts.find((p) => p.id === articleId);

  // If someone types a random number like /blog/99, show a 404-style message
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold mb-10 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to all articles
        </Link>

        {/* Article Header */}
        <div className="mb-10">
          <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block">
            {post.category}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className={`${post.imageColor} w-full h-64 sm:h-96 rounded-3xl mb-12 flex items-center justify-center shadow-lg relative overflow-hidden`}>
           <Tag className="w-20 h-20 text-white opacity-30" />
        </div>

        {/* Article Content */}
        <article className="max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </article>

      </div>
    </main>
  );
}
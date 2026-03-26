import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "The Future of Smart Farming in Tanzania",
      excerpt: "How modern IT solutions and automated irrigation are changing the landscape of local agriculture...",
      category: "Agriculture",
      author: "Agri-Expert",
      date: "March 25, 2026",
      imageColor: "bg-green-600"
    },
    {
      id: 2,
      title: "Top 5 Security Tips for Small Business IT",
      excerpt: "Protecting your digital assets is more important than ever. Here is how to stay safe from cyber threats...",
      category: "IT Services",
      author: "Tech Team",
      date: "March 22, 2026",
      imageColor: "bg-blue-600"
    },
    {
      id: 3,
      title: "Optimizing Logistics for Faster Delivery",
      excerpt: "Our new route tracking system has reduced delivery times by 20%. See how we're improving for you...",
      category: "Logistics",
      author: "Logistics Mgr",
      date: "March 18, 2026",
      imageColor: "bg-orange-600"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Company News & Insights</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and stories from MultiServicePro across all our sectors.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
              
              {/* Featured Image Placeholder */}
              <div className={`${post.imageColor} h-48 flex items-center justify-center text-white`}>
                <Tag className="w-12 h-12 opacity-50" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition cursor-pointer">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Data */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>

                <button className="mt-6 flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
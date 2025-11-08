"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Search, Book, Laptop, Bike, Sofa, Gamepad2, Shirt, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { useMarketplace } from "@/src/context/MarketplaceContext";

const categories = [
  { id: "electronics", name: "Electronics", icon: Laptop, color: "bg-blue-100 text-blue-600", count: 124 },
  { id: "books", name: "Books", icon: Book, color: "bg-green-100 text-green-600", count: 89 },
  { id: "furniture", name: "Furniture", icon: Sofa, color: "bg-purple-100 text-purple-600", count: 56 },
  { id: "clothing", name: "Clothing", icon: Shirt, color: "bg-pink-100 text-pink-600", count: 78 },
  { id: "sports", name: "Sports", icon: Bike, color: "bg-orange-100 text-orange-600", count: 45 },
  { id: "gaming", name: "Gaming", icon: Gamepad2, color: "bg-indigo-100 text-indigo-600", count: 32 },
  { id: "supplies", name: "Supplies", icon: GraduationCap, color: "bg-yellow-100 text-yellow-600", count: 67 },
];

export default function CategoriesPage() {
  const router = useRouter();
  const { listings, isAuthenticated } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/marketplace/login");
    }
  }, [isAuthenticated, router]);

  // Calculate dynamic counts from listings
  const categoriesWithCounts = useMemo(() => {
    return categories.map((cat) => {
      const count = listings.filter(
        (listing) => listing.category.toLowerCase() === cat.name.toLowerCase()
      ).length;
      return { ...cat, count };
    });
  }, [listings]);

  const filteredCategories = categoriesWithCounts.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/marketplace/feed?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-6 shadow-sm">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h2 
            className="text-gray-900 mb-2"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700 }}
          >
            Browse Categories
          </h2>
          <p className="text-gray-600" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: 1.6 }}>
            Find what you're looking for
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    onClick={() => handleCategoryClick(category.id)}
                    className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white group"
                  >
                    <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 
                      className="font-semibold text-gray-900 mb-2"
                      style={{ fontSize: '1rem', fontWeight: 600 }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">{category.count} listings</p>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
}


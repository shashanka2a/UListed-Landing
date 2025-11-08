"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Search, Heart, MessageCircle, MapPin } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMarketplace } from "@/src/context/MarketplaceContext";

export default function FeedPage() {
  const router = useRouter();
  const { listings, favorites, toggleFavorite, isAuthenticated } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/marketplace/login");
    }
  }, [isAuthenticated, router]);

  const filteredListings = useMemo(() => {
    if (!searchQuery) return listings;
    const query = searchQuery.toLowerCase();
    return listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query) ||
        listing.category.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query)
    );
  }, [listings, searchQuery]);

  const handleFavoriteClick = (e: React.MouseEvent, listingId: number) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listingId);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-6 shadow-sm">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Feed */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h2 
            className="text-gray-900 mb-2"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700 }}
          >
            Recent Listings
          </h2>
          <p className="text-gray-600" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: 1.6 }}>
            Discover items from your campus
          </p>
        </motion.div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No listings found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredListings.map((listing, index) => {
              const isFavorited = favorites.includes(listing.id);
              return (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/marketplace/listing/${listing.id}`}>
                    <Card className="rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white group">
                      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 right-3">
                          <motion.button
                            onClick={(e) => handleFavoriteClick(e, listing.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all"
                          >
                            <Heart
                              className={`w-4 h-4 transition-colors ${
                                isFavorited ? "fill-red-500 text-red-500" : "text-gray-700"
                              }`}
                            />
                          </motion.button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 
                          className="font-semibold text-gray-900 mb-2 line-clamp-2"
                          style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.4 }}
                        >
                          {listing.title}
                        </h3>
                        <p 
                          className="font-bold mb-3"
                          style={{ fontSize: '1.25rem', color: '#2563EB' }}
                        >
                          ${listing.price}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="truncate">{listing.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                          <span>{listing.posted}</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <Heart className="w-3.5 h-3.5" />
                              <span>{listing.likes}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{listing.messages}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

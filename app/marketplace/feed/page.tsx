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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl border-2 bg-gray-50"
            />
          </div>
        </div>
      </header>

      {/* Feed */}
      <div className="px-4 py-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Listings</h2>
          <p className="text-sm text-gray-600 mt-1">Discover items from your campus</p>
        </div>

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
                    <Card className="rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white">
                      <div className="relative aspect-square">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={(e) => handleFavoriteClick(e, listing.id)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isFavorited ? "fill-red-500 text-red-500" : "text-gray-700"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          {listing.title}
                        </h3>
                        <p className="text-lg font-bold text-[#2563EB] mb-2">
                          ${listing.price}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{listing.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{listing.posted}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{listing.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
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

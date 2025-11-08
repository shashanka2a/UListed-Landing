"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Heart, Share2, MapPin, User, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useMarketplace } from "@/src/context/MarketplaceContext";

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { listings, favorites, toggleFavorite, addChat, isAuthenticated } = useMarketplace();
  const [listingId, setListingId] = useState<string>("");
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/marketplace/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    params.then((resolvedParams) => {
      setListingId(resolvedParams.id);
      const foundListing = listings.find((l) => l.id === parseInt(resolvedParams.id));
      setListing(foundListing || null);
    });
  }, [params, listings]);

  if (!isAuthenticated || !listing) {
    return null;
  }

  const isLiked = favorites.includes(listing.id);

  const handleFavoriteClick = () => {
    toggleFavorite(listing.id);
  };

  const handleMessageClick = () => {
    addChat(listing.id, listing.seller);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 flex-1">Listing Details</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Image Carousel */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={listing.images?.[0] || listing.image}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <motion.button
          onClick={handleFavoriteClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <Heart className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto space-y-8">
        {/* Title & Price */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 
            className="text-gray-900 mb-3"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}
          >
            {listing.title}
          </h2>
          <p 
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#2563EB' }}
          >
            ${listing.price}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{listing.location}</span>
            <span>•</span>
            <span>{listing.posted}</span>
          </div>
        </motion.div>

        {/* Seller Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="rounded-2xl border border-gray-200 p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                <Image
                  src={listing.seller.avatar}
                  alt={listing.seller.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1">
                <h3 
                  className="font-semibold text-gray-900 mb-1"
                  style={{ fontSize: '1rem' }}
                >
                  {listing.seller.name}
                </h3>
                <p className="text-sm text-gray-600">⭐ {listing.seller.rating} • Verified Student</p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 hover:border-[#2563EB] hover:text-[#2563EB] transition-all">
                View Profile
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 
            className="font-semibold text-gray-900 mb-4"
            style={{ fontSize: '1.25rem', fontWeight: 600 }}
          >
            Description
          </h3>
          <p 
            className="text-gray-700 leading-relaxed"
            style={{ fontSize: '1rem', lineHeight: 1.7 }}
          >
            {listing.description}
          </p>
        </motion.div>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 
            className="font-semibold text-gray-900 mb-4"
            style={{ fontSize: '1.25rem', fontWeight: 600 }}
          >
            Category
          </h3>
          <span 
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm"
            style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}
          >
            {listing.category}
          </span>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 safe-area-bottom shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="outline"
            className="flex-1 h-14 rounded-xl border-2 hover:border-[#2563EB] hover:text-[#2563EB] transition-all font-semibold"
            onClick={handleMessageClick}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Message
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button
              className="w-full h-14 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: "#2563EB" }}
            >
              Make Offer
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


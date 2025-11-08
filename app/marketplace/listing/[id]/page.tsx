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
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-4">
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
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Title & Price */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h2>
          <p className="text-3xl font-bold text-[#2563EB] mb-4">${listing.price}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{listing.location}</span>
            <span>•</span>
            <span>{listing.posted}</span>
          </div>
        </div>

        {/* Seller Info */}
        <Card className="rounded-2xl border border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={listing.seller.avatar}
                alt={listing.seller.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{listing.seller.name}</h3>
              <p className="text-sm text-gray-600">⭐ {listing.seller.rating} • Verified Student</p>
            </div>
            <Button variant="outline" className="rounded-xl">
              View Profile
            </Button>
          </div>
        </Card>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">{listing.description}</p>
        </div>

        {/* Category */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Category</h3>
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-sm font-medium">
            {listing.category}
          </span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 safe-area-bottom">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onClick={handleMessageClick}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Message
          </Button>
          <Button
            className="flex-1 h-12 rounded-xl text-base font-semibold"
            style={{ backgroundColor: "#2563EB" }}
          >
            Make Offer
          </Button>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Settings, Heart, Package, MessageCircle, LogOut, Edit2, MapPin, Mail } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMarketplace } from "@/src/context/MarketplaceContext";

const menuItems = [
  { label: "My Listings", icon: Package, href: "/marketplace/feed" },
  { label: "Saved Items", icon: Heart, href: "/marketplace/feed" },
  { label: "Settings", icon: Settings, href: "/marketplace/profile" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, listings, favorites, chats, logout, isAuthenticated } = useMarketplace();
  const [isEditing, setIsEditing] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/marketplace/login");
    }
  }, [isAuthenticated, router]);

  const stats = useMemo(() => {
    const myListings = listings.filter((l) => l.seller.id === user?.id);
    return [
      { label: "Listings", value: myListings.length, icon: Package, color: "bg-blue-100 text-blue-600" },
      { label: "Favorites", value: favorites.length, icon: Heart, color: "bg-pink-100 text-pink-600" },
      { label: "Messages", value: chats.length, icon: MessageCircle, color: "bg-green-100 text-green-600" },
    ];
  }, [listings, favorites, chats, user]);

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 
            className="text-gray-900"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700 }}
          >
            Profile
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Profile Header */}
      <div className="bg-white px-6 py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-start gap-6">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="rounded-2xl border border-gray-200 p-5 text-center bg-white hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p 
                    className="font-bold text-gray-900 mb-1"
                    style={{ fontSize: '1.75rem' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-4 space-y-3">
        <div className="max-w-7xl mx-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <Link href={item.href}>
                  <Card className="rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#2563EB]/10 transition-colors">
                        <Icon className="w-6 h-6 text-gray-600 group-hover:text-[#2563EB] transition-colors" />
                      </div>
                      <span 
                        className="font-semibold text-gray-900 flex-1"
                        style={{ fontSize: '1rem' }}
                      >
                        {item.label}
                      </span>
                      <span className="text-gray-400 text-xl">›</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-12 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:shadow-md transition-all font-semibold"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}


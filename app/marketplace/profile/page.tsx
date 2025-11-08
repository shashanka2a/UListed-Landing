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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Profile Header */}
      <div className="bg-white px-4 py-6">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-200">
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
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Card className="rounded-2xl border border-gray-200 p-4 text-center bg-white">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <Card className="rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900 flex-1">{item.label}</span>
                    <span className="text-gray-400">›</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="px-4 py-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}


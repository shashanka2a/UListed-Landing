"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Search, MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMarketplace } from "@/src/context/MarketplaceContext";

export default function ChatPage() {
  const router = useRouter();
  const { chats, isAuthenticated } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/marketplace/login");
    }
  }, [isAuthenticated, router]);

  const filteredChats = useMemo(() => {
    if (!searchQuery) return chats;
    const query = searchQuery.toLowerCase();
    return chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(query) ||
        chat.item.toLowerCase().includes(query) ||
        chat.lastMessage.toLowerCase().includes(query)
    );
  }, [chats, searchQuery]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 
              className="text-gray-900"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700 }}
            >
              Messages
            </h1>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2 border-gray-200 bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Chat List */}
      <div className="px-6 py-6 max-w-7xl mx-auto space-y-3">
        {filteredChats.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 mb-6" style={{ fontSize: '1rem' }}>No conversations found</p>
            <Button
              onClick={() => router.push("/marketplace/feed")}
              className="rounded-xl h-12 px-6 font-semibold hover:shadow-lg transition-all"
              style={{ backgroundColor: "#2563EB" }}
            >
              Browse Listings
            </Button>
          </motion.div>
        ) : (
          filteredChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/marketplace/chat/${chat.id}`}>
                <Card className="rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white group">
                  <div className="flex items-start gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={chat.avatar}
                        alt={chat.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1 truncate">{chat.item}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 truncate flex-1">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <span 
                            className="ml-2 px-2.5 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-full min-w-[22px] text-center shadow-sm"
                            style={{ backgroundColor: '#2563EB' }}
                          >
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Send, MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useMarketplace } from "@/src/context/MarketplaceContext";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
}

export default function ChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { chats, sendMessage, isAuthenticated } = useMarketplace();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! Is the MacBook still available?", sender: "other", time: "10:30 AM" },
    { id: 2, text: "Yes, it's still available! Are you interested?", sender: "me", time: "10:32 AM" },
    { id: 3, text: "Yes! Can I see more photos?", sender: "other", time: "10:33 AM" },
    { id: 4, text: "Of course! Let me send you some.", sender: "me", time: "10:35 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState<string>("");
  const [currentChat, setCurrentChat] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/marketplace/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    params.then((resolvedParams) => {
      setChatId(resolvedParams.id);
      const chat = chats.find((c) => c.id === parseInt(resolvedParams.id));
      setCurrentChat(chat || null);
    });
  }, [params, chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, message]);
    sendMessage(parseInt(chatId), newMessage);
    setNewMessage("");
  };

  if (!isAuthenticated || !currentChat) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={currentChat.avatar}
              alt={currentChat.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{currentChat.name}</h2>
            <p className="text-xs text-gray-500">{currentChat.item}</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                message.sender === "me"
                  ? "bg-[#2563EB] text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1.5 ${
                  message.sender === "me" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.time}
              </p>
            </motion.div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 safe-area-bottom shadow-lg">
        <form onSubmit={handleSend} className="flex items-center gap-3 max-w-7xl mx-auto">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 h-12 rounded-full border-2 border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="h-12 w-12 rounded-full p-0 shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: "#2563EB" }}
            >
              <Send className="w-5 h-5" />
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}


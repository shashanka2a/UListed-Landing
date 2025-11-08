"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, MessageCircle, User } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/components/ui/utils";

const navItems = [
  { href: "/marketplace/feed", icon: Home, label: "Home" },
  { href: "/marketplace/categories", icon: Search, label: "Search" },
  { href: "/marketplace/sell", icon: PlusCircle, label: "Sell" },
  { href: "/marketplace/chat", icon: MessageCircle, label: "Chat" },
  { href: "/marketplace/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around h-20 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 flex-1 h-full transition-all duration-300 relative group",
                isActive
                  ? "text-[#2563EB]"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <div className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full transition-all duration-300",
                isActive ? "bg-[#2563EB]" : "bg-transparent"
              )} />
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive ? "bg-[#2563EB]/10" : "group-hover:bg-gray-100"
                )}
              >
                <Icon className={cn("w-6 h-6", isActive && "stroke-[2.5]")} />
              </motion.div>
              <span className={cn(
                "text-xs transition-all duration-300",
                isActive ? "font-semibold" : "font-medium"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


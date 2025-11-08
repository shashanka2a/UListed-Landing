"use client";

import { BottomNav } from "@/src/components/BottomNav";
import { MarketplaceProvider } from "@/src/context/MarketplaceContext";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showBottomNav = !pathname?.includes("/login") && !pathname?.includes("/chat/") && !pathname?.includes("/listing/");

  return (
    <MarketplaceProvider>
      <div className="min-h-screen bg-white pb-20">
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
        {showBottomNav && <BottomNav />}
      </div>
    </MarketplaceProvider>
  );
}


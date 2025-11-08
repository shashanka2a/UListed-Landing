"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MarketplacePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated, or feed if authenticated
    // For now, redirecting to login
    router.replace("/marketplace/login");
  }, [router]);

  return null;
}


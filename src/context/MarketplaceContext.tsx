"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  rating: number;
}

interface Listing {
  id: number;
  title: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  location: string;
  time: string;
  likes: number;
  messages: number;
  seller: User;
  posted: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  item: string;
  listingId: number;
}

interface MarketplaceContextType {
  user: User | null;
  listings: Listing[];
  chats: Chat[];
  favorites: number[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addListing: (listing: Omit<Listing, "id" | "seller" | "posted" | "likes" | "messages" | "time">) => void;
  toggleFavorite: (listingId: number) => void;
  addChat: (listingId: number, seller: User) => void;
  sendMessage: (chatId: number, message: string) => void;
  isAuthenticated: boolean;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

// Mock data
const initialListings: Listing[] = [
  {
    id: 1,
    title: "MacBook Pro 13\" 2020",
    price: 850,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800",
    ],
    description: "Excellent condition MacBook Pro 13\" from 2020. Used for school work only. Comes with charger and original box. No scratches or dents.",
    category: "Electronics",
    location: "Main Campus",
    time: "2 hours ago",
    likes: 12,
    messages: 3,
    seller: {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@university.edu",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      location: "Main Campus",
      rating: 4.8,
    },
    posted: "2 hours ago",
  },
  {
    id: 2,
    title: "Calculus Textbook - 5th Edition",
    price: 45,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    description: "Calculus textbook in great condition. Barely used, no highlights or notes.",
    category: "Books",
    location: "Library",
    time: "5 hours ago",
    likes: 8,
    messages: 1,
    seller: {
      id: "3",
      name: "Mike Chen",
      email: "mike@university.edu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      location: "Library",
      rating: 4.9,
    },
    posted: "5 hours ago",
  },
  {
    id: 3,
    title: "Bike - Mountain Bike",
    price: 120,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400",
    description: "Mountain bike in excellent condition. Perfect for campus commuting.",
    category: "Sports",
    location: "Dorm A",
    time: "1 day ago",
    likes: 24,
    messages: 7,
    seller: {
      id: "4",
      name: "Emma Davis",
      email: "emma@university.edu",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      location: "Dorm A",
      rating: 4.7,
    },
    posted: "1 day ago",
  },
  {
    id: 4,
    title: "Furniture Set - Desk & Chair",
    price: 150,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    description: "Complete desk and chair set. Moving out sale!",
    category: "Furniture",
    location: "Off-Campus",
    time: "2 days ago",
    likes: 15,
    messages: 4,
    seller: {
      id: "5",
      name: "Alex Rodriguez",
      email: "alex@university.edu",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      location: "Off-Campus",
      rating: 4.6,
    },
    posted: "2 days ago",
  },
  {
    id: 5,
    title: "Gaming Headset - Brand New",
    price: 65,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400",
    description: "Brand new gaming headset, still in box. Never opened.",
    category: "Electronics",
    location: "Main Campus",
    time: "2 days ago",
    likes: 19,
    messages: 6,
    seller: {
      id: "6",
      name: "David Kim",
      email: "david@university.edu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      location: "Main Campus",
      rating: 5.0,
    },
    posted: "2 days ago",
  },
  {
    id: 6,
    title: "Chemistry Lab Kit",
    price: 35,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    description: "Complete chemistry lab kit with all equipment.",
    category: "Supplies",
    location: "Science Building",
    time: "3 days ago",
    likes: 5,
    messages: 2,
    seller: {
      id: "7",
      name: "Lisa Wang",
      email: "lisa@university.edu",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      location: "Science Building",
      rating: 4.8,
    },
    posted: "3 days ago",
  },
];

const initialChats: Chat[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    lastMessage: "Is the MacBook still available?",
    time: "2m ago",
    unread: 2,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    item: "MacBook Pro 13\"",
    listingId: 1,
  },
  {
    id: 2,
    name: "Mike Chen",
    lastMessage: "I can pick it up tomorrow",
    time: "1h ago",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    item: "Calculus Textbook",
    listingId: 2,
  },
  {
    id: 3,
    name: "Emma Davis",
    lastMessage: "Thanks for the quick response!",
    time: "3h ago",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    item: "Bike - Mountain Bike",
    listingId: 3,
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    lastMessage: "Can we meet at the library?",
    time: "5h ago",
    unread: 1,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    item: "Gaming Headset",
    listingId: 5,
  },
];

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [favorites, setFavorites] = useState<number[]>([]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (!email.endsWith(".edu")) {
      return false;
    }

    const newUser: User = {
      id: "1",
      name: email.split("@")[0].split(".").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" "),
      email,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      location: "Main Campus",
      rating: 4.9,
    };

    setUser(newUser);
    localStorage.setItem("ulisted_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ulisted_user");
    router.push("/marketplace/login");
  };

  const addListing = (listingData: Omit<Listing, "id" | "seller" | "posted" | "likes" | "messages" | "time">) => {
    if (!user) return;

    const newListing: Listing = {
      ...listingData,
      id: listings.length + 1,
      seller: user,
      posted: "Just now",
      time: "Just now",
      likes: 0,
      messages: 0,
    };

    setListings([newListing, ...listings]);
  };

  const toggleFavorite = (listingId: number) => {
    setFavorites((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  const addChat = (listingId: number, seller: User) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    const existingChat = chats.find((c) => c.listingId === listingId);
    if (existingChat) {
      router.push(`/marketplace/chat/${existingChat.id}`);
      return;
    }

    const newChat: Chat = {
      id: chats.length + 1,
      name: seller.name,
      lastMessage: `Interested in ${listing.title}`,
      time: "Just now",
      unread: 0,
      avatar: seller.avatar,
      item: listing.title,
      listingId,
    };

    setChats([newChat, ...chats]);
    router.push(`/marketplace/chat/${newChat.id}`);
  };

  const sendMessage = (chatId: number, message: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, lastMessage: message, time: "Just now" }
          : chat
      )
    );
  };

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("ulisted_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          // Invalid JSON, clear it
          localStorage.removeItem("ulisted_user");
        }
      }
    }
  }, []);

  return (
    <MarketplaceContext.Provider
      value={{
        user,
        listings,
        chats,
        favorites,
        login,
        logout,
        addListing,
        toggleFavorite,
        addChat,
        sendMessage,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card } from "@/src/components/ui/card";
import { Mail, Lock, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useMarketplace } from "@/src/context/MarketplaceContext";
import logo from "@/src/assets/3c236858ef9b00d424abd52b02cea90dbc74ff4b.png";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useMarketplace();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/marketplace/feed");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        router.push("/marketplace/feed");
      } else {
        setError("Invalid .edu email address. Please use your university email.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 rounded-2xl border border-gray-200 shadow-lg">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src={logo}
              alt="UListed Logo"
              className="w-16 h-16 rounded-xl mb-4"
              width={64}
              height={64}
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to UListed</h1>
            <p className="text-gray-600 text-sm text-center">
              Sign in with your .edu email to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                University Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl border-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 h-12 rounded-xl border-2"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-base font-semibold"
              style={{ backgroundColor: "#2563EB" }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button 
              onClick={() => router.push("/marketplace/feed")}
              className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Continue as Guest (Demo)</span>
            </button>
          </div>

          <p className="mt-6 text-xs text-center text-gray-500">
            By continuing, you agree to UListed's Terms of Service and Privacy Policy
          </p>
        </Card>
      </motion.div>
    </div>
  );
}


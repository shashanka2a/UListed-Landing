"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { ShieldCheck, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";
import { CountdownTimer } from "@/src/components/CountdownTimer";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/src/assets/3c236858ef9b00d424abd52b02cea90dbc74ff4b.png";

export default function Home() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    router.push("/marketplace/login");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <Image src={logo} alt="UListed Logo" className="w-10 h-10 rounded-lg" width={40} height={40} />
          <span className="text-xl" style={{ fontWeight: 700 }}>UListed</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('why-ulisted')} 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Why UListed
          </button>
          <button 
            onClick={() => scrollToSection('download')} 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Download
          </button>
          <button 
            onClick={() => scrollToSection('footer')} 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Contact
          </button>
        </nav>
        <Link href="/marketplace/login">
          <Button 
            className="hidden md:block"
            style={{ backgroundColor: '#2563EB' }}
          >
            Get Started
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section id="hero" className="flex-1 flex items-center justify-center w-full px-6 min-h-[calc(100vh-180px)]">
        <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
          {/* Main Headline */}
          <h1 
            className="text-gray-900" 
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
              fontWeight: 700, 
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            Buy. Sell. Swap.
            <br />
            <span style={{ color: '#2563EB' }}>Just for Students.</span>
          </h1>

          {/* Subtext */}
          <p 
            className="text-gray-600 max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
              lineHeight: 1.6
            }}
          >
            A safe, verified space to exchange items, tickets, and services within your university.
          </p>

          {/* Countdown Timer */}
          <div className="pt-8">
            <CountdownTimer />
          </div>

          {/* App Store Buttons */}
          <motion.div
            id="download"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl min-w-[200px] transition-shadow shadow-md hover:shadow-lg"
              style={{ 
                backgroundColor: '#000000',
                color: 'white'
              }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="flex flex-col items-start">
                <span style={{ fontSize: '0.625rem', opacity: 0.8 }}>Download on the</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 600, lineHeight: 1 }}>App Store</span>
              </div>
            </motion.a>
            
            <motion.a
              href="#"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl min-w-[200px] transition-shadow shadow-md hover:shadow-lg"
              style={{ 
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1.5px solid #E5E7EB'
              }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="flex flex-col items-start">
                <span style={{ fontSize: '0.625rem', opacity: 0.6 }}>GET IT ON</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 600, lineHeight: 1 }}>Google Play</span>
              </div>
            </motion.a>
          </motion.div>

          {/* Get Started CTA */}
          <motion.div
            id="get-started"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="max-w-md mx-auto pt-8"
          >
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-8 py-6 rounded-full text-base font-semibold text-white transition-shadow shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#2563EB' }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Join your campus marketplace today! 🚀
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main>
        {/* Why UListed Section */}
        <section id="why-ulisted" className="w-full py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 
                className="text-gray-900 mb-3"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700 }}
              >
                Why <span style={{ color: '#2563EB' }}>UListed?</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                      <ShieldCheck className="w-7 h-7" style={{ color: '#2563EB' }} />
                    </div>
                    <h3 
                      className="text-gray-900"
                      style={{ fontSize: '1.125rem', fontWeight: 600 }}
                    >
                      Verified Students Only
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      .edu login for real users
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                      <ShoppingBag className="w-7 h-7" style={{ color: '#2563EB' }} />
                    </div>
                    <h3 
                      className="text-gray-900"
                      style={{ fontSize: '1.125rem', fontWeight: 600 }}
                    >
                      Campus-Only Deals
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      Listings from your university
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                      <MessageCircle className="w-7 h-7" style={{ color: '#2563EB' }} />
                    </div>
                    <h3 
                      className="text-gray-900"
                      style={{ fontSize: '1.125rem', fontWeight: 600 }}
                    >
                      Safe Chats & Payments
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      Built for trust
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer id="footer" className="w-full px-6 py-12" style={{ backgroundColor: '#F9FAFB' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Logo and Wordmark */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image src={logo} alt="UListed Logo" className="w-8 h-8 rounded-lg" width={32} height={32} />
            <span className="text-xl" style={{ fontWeight: 700, color: '#2563EB' }}>UListed</span>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            © 2025 UListed Inc. All rights reserved.
          </div>
        </motion.div>
      </footer>
    </div>
  );
}


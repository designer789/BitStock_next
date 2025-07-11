"use client";

import { useState } from "react";
import { useSmoothScroll } from "@/contexts/SmoothScrollContext";
import Image from "next/image";

export default function Header() {
  const { lenis, isReady } = useSmoothScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    // Try Lenis first if ready, fallback to native smooth scroll
    if (lenis && isReady) {
      try {
        lenis.scrollTo(element, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } catch (error) {
        console.warn("Lenis scroll failed, using fallback:", error);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Fallback to native smooth scrolling
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-start justify-center gap-2">
            <Image src="/icon.png" alt="BitStock" width={48} height={48} />
           
          </div>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button 
              onClick={() => smoothScrollTo('about')}
              className="font-body text-white hover:text-silver-light transition-colors duration-200 hover:cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => smoothScrollTo('features')}
              className="font-body text-white hover:text-silver-light transition-colors duration-200 hover:cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => smoothScrollTo('how-it-works')}
              className="font-body text-white hover:text-silver-light transition-colors duration-200 hover:cursor-pointer"
            >
              Tokenized Mechanism
            </button>
            <button 
              onClick={() => smoothScrollTo('why-bitstock')}
              className="font-body text-white hover:text-silver-light transition-colors duration-200 hover:cursor-pointer"
            >
              Why BitStock
            </button>
            <button 
              onClick={() => smoothScrollTo('tokenomics')}
              className="font-body text-white hover:text-silver-light transition-colors duration-200 hover:cursor-pointer"
            >
              Tokenomics
            </button>
            <button 
              onClick={() => smoothScrollTo('roadmap')}
              className="font-body text-white hover:text-silver-light transition-colors duration-200 hover:cursor-pointer"
            >
              Roadmap
            </button>
            <button 
              onClick={() => smoothScrollTo('faq')}
              className="font-body text-white hover:text-silver-light transition-colors duration-200 hover:cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              type="button"
              onClick={toggleMobileMenu}
              className="text-white hover:text-silver-light transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/20">
            <nav className="px-4 py-6 space-y-4">
              <button 
                onClick={() => smoothScrollTo('about')}
                className="block w-full text-left font-body text-white hover:text-silver-light transition-colors duration-200 py-2"
              >
                About
              </button>
              <button 
                onClick={() => smoothScrollTo('features')}
                className="block w-full text-left font-body text-white hover:text-silver-light transition-colors duration-200 py-2"
              >
                Features
              </button>
              <button 
                onClick={() => smoothScrollTo('how-it-works')}
                className="block w-full text-left font-body text-white hover:text-silver-light transition-colors duration-200 py-2"
              >
                Tokenized Mechanism
              </button>
              <button 
                onClick={() => smoothScrollTo('why-bitstock')}
                className="block w-full text-left font-body text-white hover:text-silver-light transition-colors duration-200 py-2"
              >
                Why BitStock
              </button>
              <button 
                onClick={() => smoothScrollTo('tokenomics')}
                className="block w-full text-left font-body text-white hover:text-silver-light transition-colors duration-200 py-2"
              >
                Tokenomics
              </button>
              <button 
                onClick={() => smoothScrollTo('roadmap')}
                className="block w-full text-left font-body text-white hover:text-silver-light transition-colors duration-200 py-2"
              >
                Roadmap
              </button>
              <button 
                onClick={() => smoothScrollTo('faq')}
                className="block w-full text-left font-body text-white hover:text-silver-light transition-colors duration-200 py-2"
              >
                FAQ
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 
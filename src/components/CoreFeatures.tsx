"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CoreFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Timeline | null>(null);

  const features = [
    {
      title: "Real Asset Backing",
      description: "All stocks are 1:1 backed by licensed U.S. custodians—no synthetic tokens, no price manipulation risk.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Stock NFTs as Proof of Ownership",
      description: "Each user's position is issued as an on-chain NFT, transparently recording stock ticker, quantity, and custody reference.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 011-1h1m0 0h4m0 0a1 1 0 011 1v2M9 7h6" />
        </svg>
      )
    },
    {
      title: "Instant Settlement",
      description: "Trades settle in under 2 hours using USDC, eliminating traditional T+2 delays.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "On-Chain Dividends",
      description: "Dividends from U.S. equities are automatically converted to USDC and distributed to user wallets.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: "Zero Leverage, Zero Risk Stacking",
      description: "No margin, no lending, no rehypothecation—designed for long-term, stable exposure without DeFi risk loops.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2l-1.5 1.5" />
        </svg>
      )
    },
    {
      title: "Global Crypto Access",
      description: "Accessible to users worldwide, especially in emerging markets—no banks or broker accounts required.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    // Kill any existing ScrollTriggers for this component
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Clear any existing animations
    if (animationsRef.current) {
      animationsRef.current.kill();
    }

    if (sectionRef.current && headingRef.current && gridRef.current) {
      // Get all feature cards
      const featureCards = gridRef.current.children;

      // Create animation timeline
      animationsRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          refreshPriority: -1,
        }
      });

      // Set initial states
      gsap.set(headingRef.current, {
        y: 50,
        opacity: 0
      });

      gsap.set(featureCards, {
        y: 50,
        opacity: 0
      });

      // Animate heading first
      animationsRef.current.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });

      // Animate feature cards with stagger
      animationsRef.current.to(featureCards, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");
    }

    return () => {
      // Kill all ScrollTriggers associated with this section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
      
      // Kill the animations
      if (animationsRef.current) {
        animationsRef.current.kill();
        animationsRef.current = null;
      }
    };
  }, []);

  // Add a separate effect to refresh ScrollTrigger when the component mounts
  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(refreshTimeout);
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative bg-white py-20 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
          >
            Core Features
          </h2>
        </div>

        {/* Features grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group">
              {/* Icon */}
              <div className="w-16 h-16 mb-6 bg-silver-light rounded-2xl flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="font-body text-base text-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
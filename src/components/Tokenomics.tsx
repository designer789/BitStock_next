"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Tokenomics() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tokenOverviewRef = useRef<HTMLDivElement>(null);
  const utilityHeadingRef = useRef<HTMLHeadingElement>(null);
  const utilityGridRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Timeline | null>(null);

  const tokenUtilities = [
    {
      title: "Protocol Governance",
      description: "$STOCKX will enable holders to vote on key decisions such as asset listings, fee structures, and treasury allocations, forming the foundation of BitStock's future DAO.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Ecosystem Incentives",
      description: "Users will earn $STOCKX through real platform activity—like trading, holding stock NFTs, or participating in governance—aligning rewards with long-term contribution.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: "Fee Benefits & Trading Boosts",
      description: "Holding or staking $STOCKX will unlock fee discounts and potential access advantages during high-demand stock trades or future tokenized asset launches.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Loyalty & Dividend Boosts",
      description: "Long-term holders and stakers of $STOCKX may enjoy boosted dividend payouts and exclusive reinvestment benefits, reinforcing loyalty and platform engagement.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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

    if (sectionRef.current && headingRef.current) {
      // Get all utility cards
      const utilityCards = utilityGridRef.current?.children;

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

      // Set initial states for all elements
      const allElements = [
        headingRef.current,
        tokenOverviewRef.current,
        utilityHeadingRef.current,
        ...(utilityCards ? Array.from(utilityCards) : [])
      ].filter(Boolean);

      gsap.set(allElements, {
        y: 50,
        opacity: 0
      });

      // Animate main heading first
      animationsRef.current.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });

      // Animate token overview card
      if (tokenOverviewRef.current) {
        animationsRef.current.to(tokenOverviewRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4");
      }

      // Animate utility heading
      if (utilityHeadingRef.current) {
        animationsRef.current.to(utilityHeadingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");
      }

      // Animate utility cards with stagger
      if (utilityCards) {
        animationsRef.current.to(Array.from(utilityCards), {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out"
        }, "-=0.2");
      }
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
    <section id="tokenomics" ref={sectionRef} className="relative bg-white py-20 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
          >
            Tokenomics
          </h2>
        </div>

        {/* Token Overview */}
        <div 
          ref={tokenOverviewRef}
          className="bg-gradient-to-br from-foreground to-silver-dark rounded-3xl p-8 lg:p-12 mb-16 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Token Info */}
            <div>
              <div className="mb-8">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                  Token Name
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-foreground">$</span>
                  </div>
                  <span className="font-heading text-4xl sm:text-5xl font-bold">STOCKX</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                  Total Supply
                </h3>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-silver-light">
                  1,000,000,000
                </div>
                <div className="font-body text-lg text-silver-light mt-2">
                  $STOCKX tokens
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <Image src="/icon.png" alt="STOCKX" width={128} height={128} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Utility Section */}
        <div>
          <div className="text-center mb-12">
            <h3 
              ref={utilityHeadingRef}
              className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4"
            >
              Utility
            </h3>
          </div>

          {/* Utility Features Grid */}
          <div ref={utilityGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {tokenUtilities.map((utility, index) => (
              <div key={index} className="group bg-silver-light rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-foreground rounded-2xl flex items-center justify-center text-white group-hover:bg-silver-dark transition-all duration-300">
                  {utility.icon}
                </div>
                
                {/* Content */}
                <h4 className="font-heading text-xl font-semibold text-foreground mb-4 leading-tight">
                  {utility.title}
                </h4>
                <p className="font-body text-base text-foreground leading-relaxed">
                  {utility.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
} 
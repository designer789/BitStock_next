"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyBitStock() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const problemsHeadingRef = useRef<HTMLHeadingElement>(null);
  const problemsGridRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const solutionsHeadingRef = useRef<HTMLHeadingElement>(null);
  const solutionsGridRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Timeline | null>(null);

  const problems = [
    {
      title: "Traditional Brokers",
      description: "Require bank accounts, charge FX fees, delay settlement, and exclude much of the world.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: "DeFi Synthetics",
      description: "Mirror-style assets depend on oracles, are fragile, and often collapse.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Crypto Wealth Trap",
      description: "Holders of BTC/ETH/BNB often can't access stable equity growth—BitStock unlocks that door.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const differentiators = [
    {
      title: "Fully Compliant",
      description: "Licensed as a U.S. MSB and Broker-Dealer, operating under SEC and FinCEN compliance. Fund flows through New York trust entities.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "SIPC Insurance",
      description: "Up to $500,000 investor protection via SIPC-backed custodians.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Global Access, Local Simplicity",
      description: "No bank needed. No credit checks. Just connect your wallet and start investing.",
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

    if (sectionRef.current && mainHeadingRef.current) {
      // Get all problem and solution cards
      const problemCards = problemsGridRef.current?.children;
      const solutionCards = solutionsGridRef.current?.children;

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
        mainHeadingRef.current,
        problemsHeadingRef.current,
        ...(problemCards ? Array.from(problemCards) : []),
        dividerRef.current,
        solutionsHeadingRef.current,
        ...(solutionCards ? Array.from(solutionCards) : [])
      ].filter(Boolean);

      gsap.set(allElements, {
        y: 50,
        opacity: 0
      });

      // Animate main heading first
      animationsRef.current.to(mainHeadingRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });

      // Animate problems section
      if (problemsHeadingRef.current) {
        animationsRef.current.to(problemsHeadingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");
      }

      if (problemCards) {
        animationsRef.current.to(Array.from(problemCards), {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.2");
      }

      // Animate divider
      if (dividerRef.current) {
        animationsRef.current.to(dividerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.2");
      }

      // Animate solutions section
      if (solutionsHeadingRef.current) {
        animationsRef.current.to(solutionsHeadingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.2");
      }

      if (solutionCards) {
        animationsRef.current.to(Array.from(solutionCards), {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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
    <section id="why-bitstock" ref={sectionRef} className="relative bg-white py-12 sm:py-16 lg:py-20 xl:py-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 
            ref={mainHeadingRef}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight"
          >
            Why BitStock?
          </h2>
        </div>

        {/* Problems Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h3 
              ref={problemsHeadingRef}
              className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 sm:mb-4"
            >
              Resolving Core Market Issues
            </h3>
          </div>

          <div ref={problemsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {problems.map((problem, index) => (
              <div key={index} className="text-center group p-4 sm:p-6 lg:p-8">
                {/* Icon with warning styling */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center text-white group-hover:bg-silver-dark transition-all duration-300">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                    {problem.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h4 className="font-heading text-lg sm:text-xl lg:text-xl font-semibold text-foreground mb-3 sm:mb-4 leading-tight">
                  {problem.title}
                </h4>
                <p className="font-body text-sm sm:text-base lg:text-base text-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div ref={dividerRef} className="flex items-center mb-12 sm:mb-16">
          <div className="flex-1 h-px bg-border"></div>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-foreground rounded-full"></div>
          </div>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Solutions Section */}
        <div>
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h3 
              ref={solutionsHeadingRef}
              className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 sm:mb-4"
            >
              Differentiators
            </h3>
          </div>

          <div ref={solutionsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {differentiators.map((diff, index) => (
              <div key={index} className="text-center group p-4 sm:p-6 lg:p-8">
                {/* Icon with positive styling */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 bg-silver-light rounded-xl sm:rounded-2xl flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-white transition-all duration-300">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                    {diff.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h4 className="font-heading text-lg sm:text-xl lg:text-xl font-semibold text-foreground mb-3 sm:mb-4 leading-tight">
                  {diff.title}
                </h4>
                <p className="font-body text-sm sm:text-base lg:text-base text-foreground leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
} 
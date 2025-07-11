"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIsBitStock() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraph1Ref = useRef<HTMLParagraphElement>(null);
  const paragraph2Ref = useRef<HTMLParagraphElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const textAnimationsRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Kill any existing ScrollTriggers for this component
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Clear any existing animations
    if (animationRef.current) {
      animationRef.current.kill();
    }
    if (textAnimationsRef.current) {
      textAnimationsRef.current.kill();
    }

    if (backgroundRef.current && sectionRef.current) {
      // Scale up background image on scroll
      animationRef.current = gsap.fromTo(
        backgroundRef.current,
        {
          scale: 1,
        },
        {
          scale: 1.3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            refreshPriority: -1,
          },
        }
      );

      // Text slide-up animations
      textAnimationsRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          refreshPriority: -1,
        }
      });

      // Set initial states
      gsap.set([headingRef.current, paragraph1Ref.current, paragraph2Ref.current], {
        y: 50,
        opacity: 0
      });

      // Animate elements with stagger
      textAnimationsRef.current
        .to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        })
        .to(paragraph1Ref.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4")
        .to(paragraph2Ref.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      if (textAnimationsRef.current) {
        textAnimationsRef.current.kill();
        textAnimationsRef.current = null;
      }
      
      // Reset the background scale
      if (backgroundRef.current) {
        gsap.set(backgroundRef.current, { scale: 1 });
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
    
      <section id="about" ref={sectionRef} className="relative bg-white">
        {/* Sticky track */}
        <div className="w-full h-[200vh]">
            {/* Content */}
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <div className="max-w-[1440px] mx-auto h-full z-10 flex items-center px-4 sm:px-6 lg:px-8">
                    <div className="text-left w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 z-10 ml-auto">
                        {/* Section heading */}
                        <h2 
                          ref={headingRef}
                          className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight text-white"
                        >
                          What is BitStock?
                        </h2>
                        
                        {/* Main description */}
                        <p 
                          ref={paragraph1Ref}
                          className="font-body text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-white/90"
                        >
                          BitStock is a decentralized brokerage firm based on the BNB Chain, enabling global 
                          cryptocurrency users to directly invest in US stocks such as Apple, Tesla, or Nvidia—backed 
                          1:1 and held by licensed custodians. All positions are recorded on-chain via stock-backed NFTs.
                        </p>
                        
                        {/* Supporting description */}
                        <p 
                          ref={paragraph2Ref}
                          className="font-body text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 lg:mb-12 text-white/80"
                        >
                          With fast settlement, USDC dividends, and no leverage or synthetics, BitStock offers a 
                          secure and compliant bridge from crypto to traditional equities—accessible globally, no bank required.
                        </p>
                    
                    </div>
                </div>

                {/* Background image */}
                <div 
                  ref={backgroundRef}
                  className="absolute w-full h-full inset-0 bg-cover bg-center z-0" 
                  style={{ 
                      backgroundImage: "url('/about-bg.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "bottom center",
                      backgroundRepeat: "no-repeat",
                      transformOrigin: "center center"
                  }}>
                </div>


             </div>
        </div>
       
      </section>
        
  );
} 
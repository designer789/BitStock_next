"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Timeline | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "What is BitStock?",
      answer: "BitStock is a decentralized, compliant brokerage platform that allows users to invest in real U.S. stocks using cryptocurrencies like BTC, ETH, BNB. Each share is 1:1 backed by a licensed custodian and recorded on-chain as an NFT."
    },
    {
      question: "Are these real stocks or synthetic assets?",
      answer: "All stocks on BitStock are real, publicly listed U.S. equities held by SEC-registered custodians. BitStock does not use synthetic or derivative tokens."
    },
    {
      question: "How does BitStock ensure compliance and asset safety?",
      answer: "BitStock operates under U.S. MSB and Broker-Dealer licenses, with custody handled by regulated institutions (e.g. BNY Mellon). All user assets are covered by SIPC insurance up to $500,000, and transactions are recorded transparently on-chain."
    },
    {
      question: "How do I invest in stocks using crypto?",
      answer: "Users deposit BTC, ETH, or BNB, which is converted into USDC through a licensed trust partner. USDC is then used to purchase U.S. stocks, and the user receives an on-chain stock NFT as proof of ownership."
    },
    {
      question: "How are dividends paid?",
      answer: "Stock dividends are automatically collected, converted to USDC, and distributed to the user's wallet. Users may also choose to convert dividends into ETH/BNB to participate in DeFi staking externally."
    },
    {
      question: "Is there any leverage or borrowing involved?",
      answer: "No. BitStock enforces a zero-leverage policy. There is no lending, collateralization, or rehypothecation—ensuring a stable, non-speculative environment."
    },
    {
      question: "When will the $STOCKX token launch?",
      answer: "The $STOCKX token will be introduced in later stages of the roadmap to support governance and platform incentives. The early focus is on product security, user access, and real equity integration."
    },
    {
      question: "Who is BitStock for?",
      answer: "BitStock is designed for crypto-native users—especially in emerging markets—who want secure, compliant exposure to U.S. equities without relying on traditional banks or brokers."
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

    if (sectionRef.current && headingRef.current && faqContainerRef.current) {
      // Get all FAQ items
      const faqItems = faqContainerRef.current.children;

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
        ...(faqItems ? Array.from(faqItems) : [])
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

      // Animate FAQ items with stagger
      if (faqItems) {
        animationsRef.current.to(Array.from(faqItems), {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.4");
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="relative bg-white py-20 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-20">
          <h2 
            ref={headingRef}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            FAQ
          </h2>
          
        </div>

        {/* FAQ Items */}
        <div ref={faqContainerRef} className="max-w-4xl mx-auto">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b border-border last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-8 flex items-center justify-between text-left hover:bg-silver-light/30 transition-colors duration-200 px-4 rounded-lg"
              >
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground leading-tight pr-8">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-foreground transition-transform duration-200 ${
                      openIndex === index ? 'rotate-45' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100 pb-8' 
                    : 'max-h-0 opacity-0 pb-0'
                }`}
              >
                <div className="px-4">
                  <p className="font-body text-lg text-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
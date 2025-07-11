"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollItem {
  title: string;
  content: string;
  imageUrl?: string;
}

interface ScrollToggleSectionProps {
  items: ScrollItem[];
  minWidth?: number;
  scrollSnap?: boolean;
  className?: string;
}

export default function ScrollToggleSection({
  items,
  minWidth = 0,
  scrollSnap = false,
  className = ""
}: ScrollToggleSectionProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const matchMediaRef = useRef<gsap.MatchMedia | null>(null);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    if (!componentRef.current || items.length === 0) return;

    const component = componentRef.current;
    const triggers = triggersRef.current;

    // Kill any existing ScrollTriggers for this component
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === component || triggers.includes(trigger.trigger as HTMLDivElement)) {
        trigger.kill();
      }
    });

    // Kill existing timelines
    timelinesRef.current.forEach(tl => tl.kill());
    timelinesRef.current = [];

    // Revert existing match media
    if (matchMediaRef.current) {
      matchMediaRef.current.revert();
    }

    // Function to make item active
    const makeItemActive = (activeIndex: number) => {
      setCurrentIndex(activeIndex);
      
      // Transform content
      const transformY = component.querySelectorAll('[data-transform="y"]');
      const transformX = component.querySelectorAll('[data-transform="x"]');
      
      transformY.forEach(el => {
        (el as HTMLElement).style.transform = `translateY(${activeIndex * -100}%)`;
      });
      
      transformX.forEach(el => {
        (el as HTMLElement).style.transform = `translateX(${activeIndex * -100}%)`;
      });

      // Update active states
      const lists = component.querySelectorAll('[data-list]');
      lists.forEach(list => {
        const children = list.children;
        Array.from(children).forEach((child, index) => {
          if (index === activeIndex) {
            child.classList.add('is-active');
          } else {
            child.classList.remove('is-active');
          }
        });
      });
    };

    // Media query for responsive behavior
    const mm = gsap.matchMedia();
    matchMediaRef.current = mm;
    
    mm.add(`(min-width: ${minWidth}px)`, () => {
      setIsDesktop(true);

      // Initialize first item as active
      makeItemActive(0);

      // Create scroll triggers for each item
      triggers.forEach((trigger, index) => {
        if (trigger) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: trigger,
              start: "top top",
              end: "bottom top",
              scrub: true,
              refreshPriority: -1,
              onToggle: ({ isActive }) => {
                if (isActive) {
                  makeItemActive(index);
                }
              }
            },
            defaults: {
              ease: "none"
            }
          });

          timelinesRef.current.push(tl);
        }
      });

      // Component-wide animations
      const componentTl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          refreshPriority: -1,
          ...(scrollSnap && {
            snap: {
              snapTo: "labelsDirectional",
              duration: { min: 0.01, max: 0.2 },
              delay: 0.0001,
              ease: "power1.out"
            }
          })
        },
        defaults: {
          ease: "none"
        }
      });

      timelinesRef.current.push(componentTl);

      // Section-wide scale animations
      const sectionScaleToOne = component.querySelectorAll('[data-section-animation="scale-to-1"]');
      const sectionScaleFromOne = component.querySelectorAll('[data-section-animation="scale-from-1"]');
      
      sectionScaleToOne.forEach(el => {
        componentTl.to(el, { scale: 1 }, 0);
      });
      
      sectionScaleFromOne.forEach(el => {
        componentTl.from(el, { scale: 1 }, 0);
      });

      // Cleanup function for smaller screens
      return () => {
        setIsDesktop(false);
        const transformY = component.querySelectorAll('[data-transform="y"]');
        const transformX = component.querySelectorAll('[data-transform="x"]');
        
        transformY.forEach(el => {
          (el as HTMLElement).style.transform = 'translateY(0%)';
        });
        
        transformX.forEach(el => {
          (el as HTMLElement).style.transform = 'translateX(0%)';
        });

        const lists = component.querySelectorAll('[data-list]');
        lists.forEach(list => {
          Array.from(list.children).forEach(child => {
            child.classList.remove('is-active');
          });
        });
      };
    });

    return () => {
      // Kill all ScrollTriggers associated with this component
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === component || triggers.includes(trigger.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });

      // Kill all timelines
      timelinesRef.current.forEach(tl => tl.kill());
      timelinesRef.current = [];

      // Revert match media
      if (matchMediaRef.current) {
        matchMediaRef.current.revert();
        matchMediaRef.current = null;
      }

      // Reset transforms
      if (component) {
        const transformY = component.querySelectorAll('[data-transform="y"]');
        const transformX = component.querySelectorAll('[data-transform="x"]');
        
        transformY.forEach(el => {
          gsap.set(el, { transform: 'translateY(0%)' });
        });
        
        transformX.forEach(el => {
          gsap.set(el, { transform: 'translateX(0%)' });
        });

        const lists = component.querySelectorAll('[data-list]');
        lists.forEach(list => {
          Array.from(list.children).forEach(child => {
            child.classList.remove('is-active');
          });
        });
      }
    };
  }, [items, minWidth, scrollSnap]);

  // Add a separate effect to refresh ScrollTrigger when the component mounts
  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(refreshTimeout);
  }, []);

  return (
    <div ref={componentRef} className={`relative ${className}`}>




      {/* Content section */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="w-full h-full flex items-center">
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
            {/* Text content */}
            <div className="mx-auto w-full h-[50vh] lg:h-full flex items-center justify-center lg:justify-end bg-black p-4 sm:p-6 lg:p-12">
                <div data-list className="w-full max-w-lg sm:max-w-xl lg:w-[640px] min-h-[40vh] sm:h-full flex flex-col justify-center relative">
                {items.map((item, index) => (
                    <div
                    key={index}
                    className={`transition-opacity absolute duration-500 w-full ${
                        isDesktop ? (currentIndex === index ? 'opacity-100' : 'opacity-0') : 'opacity-100'
                    }`}
                    >
                    {/* Step indicator */}
                    <div className="flex items-center mb-4 sm:mb-6">
                        <div className="bg-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mr-3 sm:mr-4">
                            <span className="font-heading text-xs sm:text-sm font-semibold text-black">
                                Tokenized Mechanism
                            </span>
                        </div>
                        
                    </div>
                    
                    {/* Title */}
                    <h3 
                        className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight"
                    >
                        {item.title}
                    </h3>
                    
                    {/* Content */}
                    <div className="font-body text-sm sm:text-base lg:text-lg xl:text-xl text-white leading-relaxed space-y-2 sm:space-y-3">
                        {item.content.split('\n').map((line, lineIndex) => (
                            <div key={lineIndex} className="flex items-start">
                                <span className="text-white opacity-70 mr-2 sm:mr-3 mt-0.5 sm:mt-1 text-sm sm:text-base">•</span>
                                <span className="flex-1">{line.replace('• ', '')}</span>
                            </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Visual content */}
            <div className="relative h-[50vh] lg:h-full p-4 sm:p-6 lg:p-12 flex items-center justify-center lg:justify-start bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/geometric-line-metallic-background.jpg')" }}>
              {/* Background overlay for better content visibility */}
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div data-list className="w-full   h-full lg:w-[640px] lg:h-[640px]  relative z-10">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`w-full h-full  rounded-xl sm:rounded-2xl flex items-center justify-center absolute transition-opacity duration-500   ${
                      isDesktop ? (currentIndex === index ? 'opacity-100' : 'opacity-0') : 'opacity-100'
                    }`}
                  >
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
                      />
                    ) : (
                      <div className="text-center p-4 sm:p-6 lg:p-8">
                        <p className="font-body text-sm sm:text-base text-silver-dark">Visual Content {index + 1}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trigger elements (hidden) */}
      {items.map((_, index) => (
        <div
          key={index}
          ref={el => {
            if (el) triggersRef.current[index] = el;
          }}
          className="h-screen"
          style={{
            marginTop: index === 0 ? '-100vh' : '0'
          }}
        />
      ))}

      {/* Spacer */}
      {isDesktop && <div className="h-screen" />}
    </div>
  );
} 
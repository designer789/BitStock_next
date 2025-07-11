"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSmoothScroll } from "@/contexts/SmoothScrollContext";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function Hero() {
  const { lenis } = useSmoothScroll();

  const socialLinks: SocialLink[] = [
    {
      name: 'Twitter',
      href: 'https://x.com/BitStock_COIN_',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      href: 'https://t.me/BitStock_Portal',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 496 512">
          <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/>
        </svg>
      )
    },
    {
      name: 'Gitbook',
      href: 'https://docs.stockxtoken.xyz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10.802 17.77a.703.703 0 1 1-.002 1.406.703.703 0 0 1 .002-1.406m11.024-4.347a.703.703 0 1 1 .001-1.406.703.703 0 0 1-.001 1.406m0-2.876a2.176 2.176 0 0 0-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 0 0-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502.028-.533.212-.947.493-1.107.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474 0-.342-.354-.477-.355-.477-.658-.315-1.669-.788-2.655-1.25-2.108-.987-4.497-2.105-5.546-2.655-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 0 0 2.15 1.862 2.177 2.177 0 0 0 2.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0 0 24 12.72a2.176 2.176 0 0 0-2.174-2.174"/>
        </svg>
      )
    },
    {
      name: 'DexScreener',
      href: '',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 252 300">
          <path d="M151.818 106.866c9.177-4.576 20.854-11.312 32.545-20.541 2.465 5.119 2.735 9.586 1.465 13.193-.9 2.542-2.596 4.753-4.826 6.512-2.415 1.901-5.431 3.285-8.765 4.033-6.326 1.425-13.712.593-20.419-3.197m1.591 46.886l12.148 7.017c-24.804 13.902-31.547 39.716-39.557 64.859-8.009-25.143-14.753-50.957-39.556-64.859l12.148-7.017a5.95 5.95 0 003.84-5.845c-1.113-23.547 5.245-33.96 13.821-40.498 3.076-2.342 6.434-3.518 9.747-3.518s6.671 1.176 9.748 3.518c8.576 6.538 14.934 16.951 13.821 40.498a5.95 5.95 0 003.84 5.845zM126 0c14.042.377 28.119 3.103 40.336 8.406 8.46 3.677 16.354 8.534 23.502 14.342 3.228 2.622 5.886 5.155 8.814 8.071 7.897.273 19.438-8.5 24.796-16.709-9.221 30.23-51.299 65.929-80.43 79.589-.012-.005-.02-.012-.029-.018-5.228-3.992-11.108-5.988-16.989-5.988s-11.76 1.996-16.988 5.988c-.009.005-.017.014-.029.018-29.132-13.66-71.209-49.359-80.43-79.589 5.357 8.209 16.898 16.982 24.795 16.709 2.929-2.915 5.587-5.449 8.814-8.071C69.31 16.94 77.204 12.083 85.664 8.406 97.882 3.103 111.959.377 126 0m-25.818 106.866c-9.176-4.576-20.854-11.312-32.544-20.541-2.465 5.119-2.735 9.586-1.466 13.193.901 2.542 2.597 4.753 4.826 6.512 2.416 1.901 5.432 3.285 8.766 4.033 6.326 1.425 13.711.593 20.418-3.197"/>
          <path d="M197.167 75.016c6.436-6.495 12.107-13.684 16.667-20.099l2.316 4.359c7.456 14.917 11.33 29.774 11.33 46.494l-.016 26.532.14 13.754c.54 33.766 7.846 67.929 24.396 99.193l-34.627-27.922-24.501 39.759-25.74-24.231L126 299.604l-41.132-66.748-25.739 24.231-24.501-39.759L0 245.25c16.55-31.264 23.856-65.427 24.397-99.193l.14-13.754-.016-26.532c0-16.721 3.873-31.578 11.331-46.494l2.315-4.359c4.56 6.415 10.23 13.603 16.667 20.099l-2.01 4.175c-3.905 8.109-5.198 17.176-2.156 25.799 1.961 5.554 5.54 10.317 10.154 13.953 4.48 3.531 9.782 5.911 15.333 7.161 3.616.814 7.3 1.149 10.96 1.035-.854 4.841-1.227 9.862-1.251 14.978L53.2 160.984l25.206 14.129a41.926 41.926 0 015.734 3.869c20.781 18.658 33.275 73.855 41.861 100.816 8.587-26.961 21.08-82.158 41.862-100.816a41.865 41.865 0 015.734-3.869l25.206-14.129-32.665-18.866c-.024-5.116-.397-10.137-1.251-14.978 3.66.114 7.344-.221 10.96-1.035 5.551-1.25 10.854-3.63 15.333-7.161 4.613-3.636 8.193-8.399 10.153-13.953 3.043-8.623 1.749-17.689-2.155-25.799l-2.01-4.175z"/>
        </svg>
      )
    },
    {
      name: 'DexTools',
      href: '',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 -.058 754.779 867.058">
          <path clipRule="evenodd" d="m280.395 49.025c-51.649 26.905-93.905 49.672-93.896 50.598.023 2.39 123.959 65.156 128.358 65.003 2.001-.067 16.517-6.749 32.256-14.847l28.621-14.721 31.258 16.067 31.256 16.07 51.188-23.001c77.13-34.659 85.141-38.457 83.885-39.733-1.666-1.693-29.331-16.555-104.388-56.07-36.274-19.098-71.481-37.823-78.24-41.612-6.758-3.789-13.21-6.837-14.337-6.778s-44.311 22.12-95.961 49.024zm-226.532 117.306-53.766 27.772v121.886c0 67.038.706 121.885 1.572 121.885.863 0 27.316-11.467 58.783-25.482l57.213-25.482v-128.476l27.958 15.232a33224.294 33224.294 0 0 0 64.671 35.109l36.712 19.877 16.336-7.387a3822.03 3822.03 0 0 0 30.674-14.056c7.885-3.672 27.241-12.39 43.012-19.377 15.771-6.99 30.37-14.019 32.44-15.621 2.75-2.128-30.782-20.658-124.025-68.54-70.285-36.093-130.046-65.509-132.802-65.368s-29.206 12.752-58.778 28.028zm529.148 7.799c-36.618 16.531-66.604 30.717-66.638 31.526-.032.808 19.926 12.675 44.354 26.367 24.426 13.695 44.412 25.632 44.412 26.531 0 .897-21.615 11.37-48.03 23.278-26.419 11.905-93.194 42.061-148.393 67.014l-184.954 83.602c-46.525 21.032-88.462 39.989-93.193 42.132-95.03 43.019-121.15 54.956-124.737 57.005-3.607 2.063-4.424 14.048-5.066 74.201l-.766 71.744 48.08 24.498 48.079 24.497 66.669-30.088c36.669-16.547 66.669-30.953 66.669-32.014 0-1.058-6.776-5.473-15.054-9.815-8.282-4.342-25.378-13.954-37.995-21.364-12.616-7.411-25.196-14.21-27.958-15.112-2.761-.899-4.98-2.472-4.935-3.498.046-1.023 29.404-14.968 65.236-30.991 69.597-31.117 122.858-55.1 237.202-106.809a305577.39 305577.39 0 0 1 153.411-69.31c44.948-20.288 97.208-43.983 116.134-52.655l34.41-15.767.765-72.561.769-72.558-48.765-25.03c-26.822-13.765-49.748-24.994-50.95-24.953-1.201.038-32.141 13.595-68.756 30.13zm153.872 261.772c-7.186 3.51-21.38 10.082-31.542 14.603s-29.446 13.222-42.852 19.339l-24.374 11.117-.556 63.702c-.307 35.035-1.597 63.545-2.867 63.36-2.885-.429-48.567-23.857-94.487-48.463-33.143-17.757-35.225-18.463-43.013-14.606-4.502 2.231-31.413 14.3-59.801 26.825-28.389 12.523-52.541 23.587-53.677 24.589-1.133 1 56.002 31.967 126.97 68.819l129.029 67.003 55.119-28.513c30.312-15.68 56.088-29.983 57.275-31.782 2.672-4.045 2.443-242.93-.232-242.607-1.058.127-7.806 3.104-14.992 6.614zm-305.227 280.391a25013.26 25013.26 0 0 0 -28.675 12.349c-28.856 12.484-23.201 12.898-57.531-4.192-22.865-11.382-32.721-14.894-36.999-13.189-3.209 1.278-30.826 13.703-61.376 27.61-30.548 13.907-56.602 25.285-57.898 25.285-12.817 0 8.491 12.731 90.714 54.207l96.428 48.637 40.572-20.03c22.315-11.017 67.323-33.078 100.021-49.024 32.695-15.95 59.042-29.413 58.549-29.921-.497-.506-27.893-14.574-60.883-31.262l-59.982-30.338z"/>
        </svg>
      )
    }
  ];
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element && lenis) {
      lenis.scrollTo(element, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate heading with stagger effect
      if (headingRef.current) {
        const words = headingRef.current.textContent?.split(' ') || [];
        headingRef.current.innerHTML = words
          .map(word => `<span class="inline-block">${word}</span>`)
          .join(' ');
        
        tl.fromTo(
          headingRef.current.querySelectorAll('span'),
          { 
            y: 100, 
            opacity: 0,
            rotationX: -90
          },
          { 
            y: 0, 
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
          }
        );
      }

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Animate description paragraphs
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.out" },
          "-=0.2"
        );
      }

      // Animate buttons
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          {  opacity: 0,  },
          { opacity: 1,  duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.1"
        );
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative overflow-hidden">
      {/* Enhanced Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/bg2.mp4" type="video/mp4" />
        </video>
        {/* Enhanced gradient overlay */}
     
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32 flex items-end">
        <div className="w-full flex flex-col justify-end gap-8 sm:gap-10 lg:gap-12 xl:gap-16 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
          
          {/* Enhanced content */}
          <div ref={contentRef} className="w-full lg:w-[90%] xl:w-[85%] text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-body text-xs sm:text-sm text-white font-medium">BitStock</span>
            </div>

            {/* Enhanced main heading */}
            <h1 
              ref={headingRef}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-bold text-white mb-4 sm:mb-6 lg:mb-8   tracking-tighter"
            >
              Your Crypto Key to{" "}
              <span className="relative block sm:inline">
                <span className="bg-gradient-to-r from-silver-light via-white to-silver-light bg-clip-text text-transparent animate-pulse">
                  Wall Street
                </span>
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-silver-dark to-white rounded-full opacity-60"></div>
              </span>
            </h1>
            
            {/* Enhanced subtitle */}
            <p 
              ref={subtitleRef}
              className="font-body text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 leading-relaxed font-semibold max-w-none sm:max-w-4xl mx-auto lg:mx-0"
            >
              BitStock brings real U.S. stocks on-chain—directly tradable with your crypto.
            </p>
            
            {/* Enhanced description */}
            <div ref={descriptionRef} className="mb-8 sm:mb-10 max-w-none sm:max-w-3xl mx-auto lg:mx-0 space-y-2 sm:space-y-3 lg:space-y-4">
              <p className="font-body text-sm sm:text-base lg:text-lg text-silver-light leading-relaxed">
                Each stock is physically held by SEC-registered custodians and transparently 
                represented on-chain as a non-transferable equity certificate (NFT).
              </p>
              <p className="font-body text-sm sm:text-base lg:text-lg text-silver-light leading-relaxed">
                By eliminating synthetic products and leverage, BitStock offers a secure, 
                auditable, and institution-grade pathway to real-world asset allocation via 
                blockchain infrastructure.
              </p>
            </div>
            
            {/* Social Icons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href ? "_blank" : undefined}
                  rel={social.href ? "noopener noreferrer" : undefined}
                  className={`group relative bg-white/10 backdrop-blur-sm p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 ${
                    !social.href ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                  }`}
                  title={social.name}
                  aria-label={`Visit our ${social.name} page`}
                >
                  <div className="text-white group-hover:text-silver-light transition-colors duration-300">
                    <div className="w-4 h-4 sm:w-5 sm:h-5">
                      {social.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button 
          onClick={() => smoothScrollTo('about')}
          className="flex flex-col items-center gap-1 sm:gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
        >
          <span className="font-body text-xs sm:text-sm font-medium hidden sm:block">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
          </div>
        </button>
      </div>
    </section>
  );
} 
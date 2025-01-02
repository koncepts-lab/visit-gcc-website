"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import ScrollToTop from "@/components/common/scrollToTop";
import MouseMove from "@/components/common/MouseMove";

const Wrapper = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Dynamically import and register ScrollSmoother
    const initializeGSAP = async () => {
      try {
        const ScrollSmoother = (await import("gsap/ScrollSmoother")).ScrollSmoother;
        gsap.registerPlugin(ScrollSmoother);

        // Initialize ScrollSmoother
        const smoother = ScrollSmoother.create({
          smooth: 1.35,
          effects: true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });

        // Initialize button animations
        const buttons = document.querySelectorAll('.animated-button');
        buttons.forEach(button => {
          button.addEventListener('mouseenter', (e) => {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          button.addEventListener('mouseleave', (e) => {
            gsap.to(button, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });

        // Cleanup function
        return () => {
          if (smoother) {
            smoother.kill();
          }
          buttons.forEach(button => {
            button.removeEventListener('mouseenter', null);
            button.removeEventListener('mouseleave', null);
          });
        };
      } catch (error) {
        console.warn("ScrollSmoother initialization failed:", error);
      }
    };

    initializeGSAP();
  }, [isClient]);

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <>
      <MouseMove />
      <div id="smooth-wrapper">
        <div id="smooth-content" data-scroll-wrap>
          {children}
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Wrapper;
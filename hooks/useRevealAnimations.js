import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const useRevealAnimations = (containerRef) => {
  const router = useRouter();

  useGSAP(
    () => {
      let split;

      const revealOnView = (elements, fromVars, toVars, options = {}) => {
        const { delay = 0, stagger = 0.06 } = options;

        elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const isInitiallyVisible =
            rect.top < window.innerHeight && rect.bottom > 0;

          gsap.fromTo(element, fromVars, {
            ...toVars,
            delay: isInitiallyVisible ? delay + index * stagger : 0,
            scrollTrigger: isInitiallyVisible
              ? null
              : {
                  trigger: element,
                  start: 'top bottom-=50px',
                  once: true,
                },
          });
        });
      };

      const textEls = gsap.utils.toArray('.reveal-text');

      if (textEls.length) {
        split = SplitText.create(textEls, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            self.lines.forEach((line, index) => {
              const rect = line.getBoundingClientRect();
              const isInitiallyVisible =
                rect.top < window.innerHeight && rect.bottom > 0;

              gsap.fromTo(
                line,
                { yPercent: 100 },
                {
                  yPercent: 0,
                  duration: 0.8,
                  delay: isInitiallyVisible ? index * 0.08 : 0,
                  ease: 'power3.out',
                  scrollTrigger: isInitiallyVisible
                    ? null
                    : {
                        trigger: line,
                        start: 'top bottom-=50px',
                        once: true,
                      },
                },
              );
            });
          },
        });
      }

      const afterTextItems = gsap.utils.toArray('.reveal-after-text');

      if (afterTextItems.length) {
        revealOnView(
          afterTextItems,
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          {
            delay: 1.4,
            stagger: 0.1,
          },
        );
      }

      const items = gsap.utils.toArray('.reveal-item');

      if (items.length) {
        revealOnView(
          items,
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
        );
      }

      const images = gsap.utils.toArray('.reveal-image');

      if (images.length) {
        revealOnView(
          images,
          { autoAlpha: 0, scale: 0.97 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
        );
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        split?.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [router.asPath],
    },
  );
};

export default useRevealAnimations;

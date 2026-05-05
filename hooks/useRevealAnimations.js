import { useRouter } from 'next/router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const TEXT_REVEAL_READY_CLASS = 'reveal-text-ready';

const useRevealAnimations = (containerRef, dependency) => {
  const router = useRouter();
  const animationDependency = dependency ?? router.asPath;

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
        const setTextReady = () => {
          textEls.forEach((element) => {
            element.classList.add(TEXT_REVEAL_READY_CLASS);
          });
        };

        split = SplitText.create(textEls, {
          type: 'words, chars',
          wordsClass: 'split-word',
          charsClass: 'split-char',
          autoSplit: true,
          onSplit(self) {
            if (!self.chars.length) {
              setTextReady();
              return;
            }

            gsap.set(self.chars, {
              autoAlpha: 0,
              filter: 'blur(0.6rem)',
            });
            setTextReady();

            const isInitiallyVisible = self.elements.some((element) => {
              const rect = element.getBoundingClientRect();
              return rect.top < window.innerHeight && rect.bottom > 0;
            });

            const timeline = gsap.timeline({
              scrollTrigger: isInitiallyVisible
                ? null
                : {
                    trigger: self.elements[0],
                    start: 'top bottom-=50px',
                    once: true,
                  },
            });

            self.chars.forEach((char, index) => {
              const start = index * 0.04;

              timeline
                .to(
                  char,
                  {
                    autoAlpha: 1,
                    duration: 0.35,
                    ease: 'power2.out',
                  },
                  start,
                )
                .to(
                  char,
                  {
                    filter: 'blur(0rem)',
                    duration: 0.55,
                    ease: 'power3.out',
                  },
                  start + 0.35,
                );
            });

            return timeline;
          },
        });
      }

      const afterTextItems = gsap.utils.toArray('.reveal-after-text');

      if (afterTextItems.length) {
        revealOnView(
          afterTextItems,
          { autoAlpha: 0, y: 4 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          {
            delay: 1.2,
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
          {
            delay: 0.5,
          },
        );
      }

      const images = gsap.utils.toArray('.reveal-image');

      if (images.length) {
        revealOnView(
          images,
          { autoAlpha: 0, scale: 0.98 },
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
        textEls.forEach((element) => {
          element.classList.remove(TEXT_REVEAL_READY_CLASS);
        });

        split?.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [animationDependency],
      revertOnUpdate: true,
    },
  );
};

export default useRevealAnimations;

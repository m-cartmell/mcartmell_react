import { useCallback, useRef } from 'react';

export default function useRevealItems() {
  const observerRef = useRef(null);

  const revealItems = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const elements = document.querySelectorAll('main .reveal-item');
    if (!elements.length) return;

    elements.forEach((element) => {
      element.classList.remove('is-visible');
      element.style.transitionDelay = '';
    });

    let visibleIndex = 0;

    observerRef.current = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = '0s';
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isInitiallyVisible =
        rect.top < window.innerHeight && rect.bottom > 0;

      if (isInitiallyVisible) {
        element.style.transitionDelay = `${visibleIndex * 0.06}s`;
        visibleIndex += 1;

        requestAnimationFrame(() => {
          element.classList.add('is-visible');
        });
      } else {
        observerRef.current.observe(element);
      }
    });
  }, []);

  return revealItems;
}

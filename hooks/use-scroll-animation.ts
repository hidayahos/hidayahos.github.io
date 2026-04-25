import { useEffect, useRef } from 'react';

export function useScrollAnimation(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add('fade-in-up');
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

export function useScrollAnimationVariant(variant: 'up' | 'left' | 'right' | 'scale', delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animationClass = {
      up: 'fade-in-up',
      left: 'fade-in-left',
      right: 'fade-in-right',
      scale: 'scale-in',
    }[variant];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add(animationClass);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [variant, delay]);

  return ref;
}

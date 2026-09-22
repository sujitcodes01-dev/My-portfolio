"use client";

import { LazyMotion, domAnimation, m } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DancingLettersProps {
  text?: string;
  className?: string;
  letterClassName?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  initialWaveDelay?: number;
}

// Sleek, physics-based animations (matching keyframe counts & GPU-accelerated)
const letterAnimations = [
  // 1. Rubber Band (Snap)
  {
    active: {
      scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
      scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    },
    transition: { duration: 0.8, ease: "easeInOut" },
    transformOrigin: "center center",
  },
  // 2. Playful Twist / Wiggle
  {
    active: {
      rotate: [0, -18, 18, -12, 10, -5, 0],
      y: [0, -6, -14, -8, -2, 0],
      scale: [1, 1.12, 1.1, 1.06, 1.02, 1],
    },
    transition: { duration: 0.85, ease: "easeInOut" },
    transformOrigin: "bottom center",
  },
  // 3. Squash and Jump
  {
    active: {
      scaleY: [1, 0.65, 1.25, 0.9, 1.05, 1],
      scaleX: [1, 1.25, 0.85, 1.1, 0.98, 1],
      y: [0, 8, -30, -8, 2, 0],
    },
    transition: { duration: 0.75, ease: "easeOut" },
    transformOrigin: "bottom center",
  },
  // 4. 3D Tumbler / Flip
  {
    active: {
      rotateY: [0, 180, 360],
      scale: [1, 1.2, 1],
      y: [0, -16, 0],
    },
    transition: { duration: 0.8, ease: "easeInOut" },
    transformOrigin: "center center",
  },
  // 5. Elastic Slide
  {
    active: {
      x: [0, -16, 14, -8, 4, 0],
      y: [0, -8, 0],
      scale: [1, 1.12, 1],
    },
    transition: { duration: 0.8, ease: "easeInOut" },
    transformOrigin: "center center",
  },
  // 6. Impact Shake
  {
    active: {
      x: [0, -5, 5, -4, 4, -2, 2, 0],
      y: [0, -3, 3, -2, 2, -1, 1, 0],
      rotate: [0, -3, 3, -2, 2, 0],
    },
    transition: { duration: 0.55, ease: "linear" },
    transformOrigin: "center center",
  },
  // 7. Pop & Bounce
  {
    active: {
      scale: [1, 1.35, 0.92, 1.08, 1],
      y: [0, -18, 4, -2, 0],
    },
    transition: { duration: 0.65, ease: "easeInOut" },
    transformOrigin: "center center",
  },
  // 8. Levitate Float
  {
    active: {
      y: [0, -26, 0],
      scale: [1, 1.12, 1],
    },
    transition: { duration: 0.9, ease: "easeInOut" },
    transformOrigin: "center center",
  },
];

export const DancingLetters = ({
  text = "ANIMATE",
  className = "",
  letterClassName = "",
  autoPlay = true,
  autoPlayInterval = 3000,
  initialWaveDelay = 400,
}: DancingLettersProps) => {
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const letters = text.split("");
  const [isLoaded, setIsLoaded] = useState(false);
  const lastSwipeIndexRef = useRef<number | null>(null);

  const triggerDance = useCallback((index: number) => {
    setActiveIndices((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const handleAnimationComplete = useCallback((index: number) => {
    setActiveIndices((prev) => {
      if (!prev.has(index)) return prev;
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  }, []);

  // Ripple wave across all letters
  const triggerFullWave = useCallback(() => {
    letters.forEach((letter, i) => {
      if (letter !== " ") {
        setTimeout(() => {
          triggerDance(i);
        }, i * 85);
      }
    });
  }, [letters, triggerDance]);

  // Initial wave dance ripple on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      triggerFullWave();
    }, initialWaveDelay);

    return () => clearTimeout(timer);
  }, [initialWaveDelay, triggerFullWave]);

  // Periodic playful dances
  useEffect(() => {
    if (!autoPlay || letters.length === 0) return;
    const interval = setInterval(() => {
      const validIndices = letters
        .map((l, i) => (l !== " " ? i : -1))
        .filter((i) => i !== -1);
      if (validIndices.length > 0) {
        const pick = validIndices[Math.floor(Math.random() * validIndices.length)];
        triggerDance(pick);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, letters, triggerDance]);

  // Mobile swipe-to-dance handler
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const letterIndexAttr = target?.getAttribute("data-letter-index");
      if (letterIndexAttr !== null && letterIndexAttr !== undefined) {
        const idx = Number(letterIndexAttr);
        if (!isNaN(idx) && idx !== lastSwipeIndexRef.current) {
          lastSwipeIndexRef.current = idx;
          triggerDance(idx);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    lastSwipeIndexRef.current = null;
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={cn(
          "flex items-center justify-center select-none cursor-pointer touch-manipulation",
          className
        )}
        style={{ perspective: "1000px" }}
        initial="hidden"
        animate="visible"
        onClick={triggerFullWave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {letters.map((letter, id) => {
          if (letter === " ") {
            return (
              <span key={`space-${id}`} className="inline-block w-[0.28em] select-none">
                &nbsp;
              </span>
            );
          }
          const animIndex = id % letterAnimations.length;
          const anim = letterAnimations[animIndex];
          const isActive = activeIndices.has(id);

          return (
            <m.span
              key={`${letter}-${id}`}
              data-letter-index={id}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  rotateX: 0,
                  rotateY: 0,
                  scaleX: 1,
                  scaleY: 1,
                  textShadow: "0px 0px 0px rgba(0,0,0,0)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                },
                active: {
                  ...anim.active,
                  opacity: 1,
                  // @ts-expect-error transition type mismatch
                  transition: anim.transition,
                },
              }}
              animate={isActive ? "active" : isLoaded ? "visible" : undefined}
              onHoverStart={() => {
                if (!isActive) triggerDance(id);
              }}
              onClick={(e) => {
                e.stopPropagation();
                triggerDance(id);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                triggerDance(id);
              }}
              onAnimationComplete={(definition) => {
                if (definition === "active") handleAnimationComplete(id);
              }}
              className={cn(
                "relative inline-block text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 dark:text-neutral-100 cursor-pointer select-none touch-manipulation",
                letterClassName,
                isActive ? "z-10" : "z-0"
              )}
              style={{
                transformOrigin: anim.transformOrigin,
                transformStyle: "preserve-3d",
                touchAction: "manipulation",
              }}
            >
              {letter}
            </m.span>
          );
        })}
      </m.div>
    </LazyMotion>
  );
};

export default DancingLetters;

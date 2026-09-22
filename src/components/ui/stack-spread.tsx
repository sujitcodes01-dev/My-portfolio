// Built using Hyperiux Vault: https://vault.hyperiux.com - Adapted for Sujit Gorai Portfolio

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Card imagery for Sujit's portfolio: skills, journey, three projects, achievement, education, code profile.

const IMG = {
  skills: "/images/cards/skills.jpg",
  journey: "/images/cards/journey.jpg",
  smartstock: "/images/cards/smartstock.jpg",
  codedrop: "/images/cards/codedrop.jpg",
  certifications: "/images/cards/certifications.jpg",
  achievement: "/images/cards/achievement.jpg",
  education: "/images/cards/education.jpg",
  workstation: "/images/cards/workstation.jpg",
} as const;

// per-image rest scale, keyed by img index (1-8). default 1, drop below to shrink.
const SCALE: Partial<Record<number, number>> = {
  1: 0.9,
  2: 0.8,
  3: 0.9,
  4: 0.8,
  5: 0.8,
  6: 0.9,
  7: 0.9,
  8: 0.7,
};
const s = (i: number) => SCALE[i] ?? 1;

export interface StackSpreadItem {
  src: string;
  alt?: string;
  label?: string;
  href?: string;
}

export interface StackSpreadTarget {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  w: number;
  h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  /** final x/y (vw/vh) for tablet + mobile; falls back to `target` */
  targetSm?: { x: number; y: number };
  /** angle while clustered */
  stackRotate?: number;
  /** offset while clustered (vw/vh) */
  stackOffset?: { x: number; y: number };
  /** paint order, higher on top */
  z?: number;
}

// array order = stack order, back (z 2) -> front (z 9)
export const DEFAULT_THEME_CARDS: StackSpreadCard[] = [
  // top-left: Skills & Technologies (img08) — sm row 1 left -> #skills
  {
    item: {
      src: IMG.skills,
      alt: "Skills & Technologies",
      label: "02 // SKILLS & TECH",
      href: "#skills",
    },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -22, y: -34, rotate: -1.5, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -22, y: -38 },
    z: 2,
  },
  // top-right: Engineering Journey & Evolution (img07) — sm row 1 right -> #journey
  {
    item: {
      src: IMG.journey,
      alt: "Project Journey & Evolution",
      label: "03 // HOW I GOT HERE",
      href: "#journey",
    },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 1.8, scale: s(7), w: 19, h: 30 },
    targetSm: { x: 22, y: -38 },
    z: 3,
  },
  // mid-left: SmartStock (img06) — sm row 2 left -> #project-smartstock
  {
    item: {
      src: IMG.smartstock,
      alt: "SmartStock Inventory & Warehouse Management",
      label: "04 // SMARTSTOCK INVENTORY",
      href: "#project-smartstock",
    },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -35, y: -2, rotate: -2.0, scale: s(6), w: 16, h: 30 },
    targetSm: { x: -22, y: -18 },
    z: 4,
  },
  // top-centre: CodeDrop (img05) — sm row 2 right -> #project-codedrop
  {
    item: {
      src: IMG.codedrop,
      alt: "CodeDrop Time-Bound Snippet Sharing",
      label: "05 // CODEDROP SNIPPETS",
      href: "#project-codedrop",
    },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -33, rotate: 1.2, scale: s(5), w: 24, h: 28 },
    targetSm: { x: 22, y: -18 },
    z: 5,
  },
  // mid-right: Certifications & Training (img04) — sm row 3 left -> #education
  {
    item: {
      src: IMG.certifications,
      alt: "Certifications & Training",
      label: "06 // CERTIFICATIONS",
      href: "#education",
    },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 36, y: 6, rotate: 2.0, scale: s(4), w: 18, h: 30 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // bottom-left: SIH 2024 Achievement (img03) — sm row 3 right -> #education
  {
    item: {
      src: IMG.achievement,
      alt: "Smart India Hackathon 2024 - 4th Place",
      label: "07 // SIH 2024 · 4TH PLACE",
      href: "#education",
    },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: -1.8, scale: s(3), w: 21, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  // bottom-centre: Academic Education & B.Tech Degree (img02) — sm row 4 left -> #education
  {
    item: {
      src: IMG.education,
      alt: "Asansol Engineering College Education",
      label: "08 // EDUCATION",
      href: "#education",
    },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 1.0, scale: s(2), w: 19, h: 25 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  // bottom-right: Developer Workstation & Repositories (img01) — sm row 4 right -> #footprint
  {
    item: {
      src: IMG.workstation,
      alt: "Developer Tools & Setup",
      label: "09 // CODE & PROFILES",
      href: "#footprint",
    },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: -1.2, scale: s(1), w: 17, h: 22 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

// ---------------------------------------------------------------------------
// Mechanism
// ---------------------------------------------------------------------------

const SCATTER_START = 0.0;
const SCATTER_END = 0.52;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX: null as number | null,
    card: null as { w: number; h: number } | null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 40, h: 20 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;

    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

function Card({
  card,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  stackScale: number;
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const { item, target } = card;

  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale = scaleMul ?? target.scale ?? 1;

  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform pointer-events-auto"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      <CardFace item={item} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({
  item,
  cardRadius,
}: {
  item: StackSpreadItem;
  cardRadius: number;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (item.href) {
      e.preventDefault();
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', item.href);
      }
    }
  };

  return (
    <a
      href={item.href ?? "#"}
      onClick={handleClick}
      aria-label={item.label || item.alt || "Jump to section"}
      className="group relative block h-full w-full overflow-hidden border border-white/15 bg-[#141517] shadow-2xl transition-all duration-300 hover:border-[#e65c24] hover:shadow-[0_0_30px_rgba(230,92,36,0.35)] cursor-pointer max-md:rounded-[3vw]"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      {/* Subtle vignette shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/85 via-black/10 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-50" />

      {/* Top right jump indicator badge on hover */}
      <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#0c0d0e]/85 border border-white/10 font-mono text-[9px] text-[#9da0a8] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:border-[#e65c24]/50 group-hover:text-[#e65c24] pointer-events-none">
        <span>EXPLORE</span>
        <ArrowUpRight className="w-2.5 h-2.5" />
      </div>

      {item.label && (
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 bg-[#0c0d0e]/90 border border-white/10 rounded font-mono text-[9px] text-[#9da0a8] group-hover:border-[#e65c24]/40 group-hover:text-[#f4f3ef] transition-colors pointer-events-none">
          <span className="truncate font-medium">{item.label}</span>
          <span className="text-[#e65c24] text-[10px] ml-1 font-bold">↗</span>
        </div>
      )}
    </a>
  );
}

export interface StackSpreadProps {
  /** custom card array; falls back to DEFAULT_THEME_CARDS */
  cards?: StackSpreadCard[];
  /** scatter scroll distance, in vh */
  scrollLength?: number;
  bgColor?: string;
  /** fan the clustered stack (default) or start flat */
  clusterRotation?: boolean;
  /** scale of the cards while clustered, before the scatter */
  stackScale?: number;
  /** corner radius on each card, in px */
  cardRadius?: number;
  /** color of the centre headline and subtitle */
  textColor?: string;
  /** scroll progress (0-1) where the centre text starts fading in */
  textFadeStart?: number;
  /** show the scroll to spread hint */
  showScrollHint?: boolean;
  /** custom headline component or string */
  headline?: ReactNode;
  /** custom subtitle text */
  subtitle?: string;
  /** optional class name */
  className?: string;
}

export function StackSpread({
  cards = DEFAULT_THEME_CARDS,
  scrollLength = 175,
  bgColor = "#0c0d0e",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 6,
  textColor = "#f4f3ef",
  textFadeStart = 0.0,
  showScrollHint = true,
  headline,
  subtitle,
  className = "",
}: StackSpreadProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } =
    useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(
    scrollYProgress,
    [SCATTER_START, SCATTER_END, 1],
    [0, 1, 1],
  );

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.9 : p >= 0.95));
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(
    progress,
    [textFadeStart, 0.4],
    [isSmall ? 0.85 : 0.25, 1]
  );
  const copyScale = useTransform(progress, [textFadeStart, 0.5], [0.92, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const effectiveScrollLength = isSmall ? Math.min(scrollLength, 125) : scrollLength;

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full overflow-visible", className)}
      style={{ height: `${effectiveScrollLength}vh`, backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Architectural subtle background grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between">
          <div className="w-[1px] h-full bg-white" />
          <div className="w-[1px] h-full bg-white hidden sm:block" />
          <div className="w-[1px] h-full bg-white" />
          <div className="w-[1px] h-full bg-white hidden lg:block" />
        </div>

        {/* Centre manifesto reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8 select-none"
          style={{
            opacity: copyOpacity,
            scale: noScale ? 1 : copyScale,
          }}
        >
          {headline ?? (
            <>
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#e65c24] mb-3">
                01 // PHILOSOPHY
              </div>
              <h2
                className="w-full max-w-5xl font-display text-[3.8vw] font-black leading-[1.06] tracking-tight text-[#f4f3ef] max-md:text-[7.8vw]"
                style={{ color: textColor }}
              >
                I like turning <span className="text-[#e65c24]">ideas</span> into things people can{" "}
                <span className="text-[#e65c24]">actually use</span>.
              </h2>
            </>
          )}

          <p
            className="mt-4 w-full max-w-xl font-mono text-[1.05vw] tracking-wider uppercase text-[#9da0a8] max-md:mt-3 max-md:text-[3.2vw]"
            style={{ color: textColor, opacity: 0.75 }}
          >
            {subtitle ??
              "Exploring software, data, AI, and everything in between."}
          </p>
        </motion.div>

        {/* Scattering cards */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* Scroll to spread hint */}
        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[4vh] z-20 flex flex-col items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#9da0a8] max-md:bottom-6 max-md:text-[10px]"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-[#f4f3ef] font-medium">SCROLL TO SPREAD</span>
            <ChevronDown className="w-4 h-4 text-[#e65c24] animate-bounce" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default StackSpread;



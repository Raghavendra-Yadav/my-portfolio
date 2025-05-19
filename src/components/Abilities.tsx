import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Gradient star style using inline SVG gradient for visibility
const gradientStarClass = 'w-5 h-5 drop-shadow-sm';

// Helper to wrap icon in a span with gradient background and mask, with animation support
const GradientStar = ({
  animate,
  delay = 0,
  half = false,
}: {
  icon: React.ReactElement;
  animate?: boolean;
  delay?: number;
  half?: boolean;
}) => {
  const starMask =
    "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z'/%3E%3C/svg%3E\")";

  let background;
  if (half) {
    background =
      'linear-gradient(to right, ' +
      'rgba(139,92,246,0.7) 0%, rgba(236,72,153,0.7) 100%) 0 0/50% 100% no-repeat,' + // left half gradient
      '#e5e7eb 50% 0/50% 100% no-repeat'; // right half gray
  } else {
    background =
      'linear-gradient(to top right, rgba(139,92,246,0.7), rgba(236,72,153,0.7))';
  }

  return (
    <motion.span
      className="w-5 h-5 inline-block align-middle"
      style={{
        background,
        WebkitMaskImage: starMask,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: 'cover',
        maskImage: starMask,
        maskRepeat: 'no-repeat',
        maskSize: 'cover',
        display: 'inline-block',
      }}
      initial={false}
      animate={animate ? { scale: [1, 1.4, 1] } : { scale: 1 }}
      transition={
        animate
          ? { duration: 0.5, delay, type: 'tween', ease: 'easeInOut' }
          : { duration: 0 }
      }
      whileHover={{ scale: 1.25 }}
    />
  );
};

// Custom star renderer with visible gradient and animation support
const stars = (
  filledCount: number,
  half: boolean = false,
  animateAll = false,
  animateDelayBase = 0
) => {
  const total = 5;
  const fullStars = Array.from({ length: filledCount }, (_, i) => (
    <GradientStar
      key={`full-${i}`}
      icon={<FaStar className={gradientStarClass} />}
      animate={animateAll}
      delay={animateAll ? animateDelayBase + i * 0.08 : 0}
    />
  ));
  const halfStar = half
    ? [
        <GradientStar
          key="half"
          icon={<FaStar className={gradientStarClass} />}
          animate={animateAll}
          delay={animateAll ? animateDelayBase + filledCount * 0.08 : 0}
          half={true}
        />,
      ]
    : [];
  const emptyStars = Array.from(
    { length: total - filledCount - (half ? 1 : 0) },
    (_, i) => (
      <motion.span
        key={`empty-${i}`}
        className="w-5 h-5 inline-block align-middle"
        whileHover={{ scale: 1.25, rotate: -12 }}
        animate={
          animateAll
            ? { scale: [1, 1.4, 1], rotate: [0, -15, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={
          animateAll
            ? {
                duration: 0.5,
                delay:
                  animateDelayBase + (filledCount + (half ? 1 : 0) + i) * 0.08,
                type: 'tween',
                ease: 'easeInOut',
              }
            : { duration: 0 }
        }
      >
        <FaRegStar className="w-5 h-5 text-gray-300 dark:text-gray-600" />
      </motion.span>
    )
  );
  return [...fullStars, ...halfStar, ...emptyStars];
};

const AbilityItem = ({
  title,
  level,
  half = false,
  animateStars = false,
  animateDelayBase = 0,
  onHover,
  onLeave,
  highlight = false,
}: {
  title: string;
  level: number;
  half?: boolean;
  animateStars?: boolean;
  animateDelayBase?: number;
  onHover?: () => void;
  onLeave?: () => void;
  highlight?: boolean;
}) => (
  <li
    className={`flex justify-between py-1 cursor-pointer rounded-lg px-2 transition-colors ${
      highlight ? 'bg-purple-100/60 dark:bg-purple-900/40 shadow' : ''
    }`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <span>{title}</span>
    <span className="flex gap-1">
      {stars(level, half, animateStars, animateDelayBase)}
    </span>
  </li>
);

const Section = ({
  title,
  items,
  animateStars = false,
  onItemHover,
  onItemLeave,
  highlightedIdx,
}: {
  title: string;
  items: { title: string; level: number; half?: boolean }[];
  animateStars?: boolean;
  onItemHover?: (idx: number) => void;
  onItemLeave?: () => void;
  highlightedIdx?: number | null;
}) => (
  <div className="mb-6 rounded-xl transition-colors">
    <h3
      className="text-xl font-semibold mb-2"
      style={{ fontFamily: "'Roboto Slab', serif" }}
    >
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ul className="space-y-2">
        {items.slice(0, Math.ceil(items.length / 2)).map((item, i) => (
          <AbilityItem
            key={i}
            {...item}
            animateStars={animateStars && highlightedIdx === i}
            animateDelayBase={0}
            onHover={onItemHover ? () => onItemHover(i) : undefined}
            onLeave={onItemLeave}
            highlight={highlightedIdx === i}
          />
        ))}
      </ul>
      <ul className="space-y-2">
        {items.slice(Math.ceil(items.length / 2)).map((item, i) => {
          const idx = i + Math.ceil(items.length / 2);
          return (
            <AbilityItem
              key={idx}
              {...item}
              animateStars={animateStars && highlightedIdx === idx}
              animateDelayBase={0}
              onHover={onItemHover ? () => onItemHover(idx) : undefined}
              onLeave={onItemLeave}
              highlight={highlightedIdx === idx}
            />
          );
        })}
      </ul>
    </div>
  </div>
);

const Abilities = () => {
  const [highlightedSkill, setHighlightedSkill] = useState<number | null>(null);
  const [highlightedLang, setHighlightedLang] = useState<number | null>(null);
  const [highlightedTool, setHighlightedTool] = useState<number | null>(null);

  const skills = [
    { title: 'HTML(5)', level: 5 },
    { title: 'CSS(3)', level: 5 },
    { title: 'Bootstrap Framework', level: 5 },
    { title: 'Javascript', level: 4 },
    { title: 'Next.js', level: 4 },
    { title: 'React', level: 4 },
    { title: 'Node.js', level: 3, half: true }, // 3 full, 1 half, 1 empty
    { title: 'Framer Motion', level: 3, half: true },
    { title: 'Tailwind CSS', level: 3 },
    { title: 'MySQL', level: 3 },
    { title: 'PHP', level: 3 },
    { title: 'Command Line Interface', level: 3 },
    { title: 'C Programming', level: 3 },
    { title: 'C++', level: 3 },
    { title: 'Python', level: 2, half: true }, // 2 full, 1 half, 2 empty
    { title: 'Java', level: 2 },
  ];

  const languages = [
    { title: 'Telugu (Mother tongue)', level: 5 },
    { title: 'English (Daily use)', level: 4 },
    { title: 'Hindi (National language)', level: 3 },
  ];

  const tools = [
    { title: 'Webkit browsers (8 years)', level: 5 },
    { title: 'Atom IDE (5 years)', level: 5 },
    { title: 'Visual Studio Code (2 years)', level: 5 },
    { title: 'MS Office (8 years)', level: 4 },
    { title: 'Windows (10 years)', level: 4 },
    { title: 'Adobe Illustrator (5 years)', level: 4 },
    { title: 'Adobe Photoshop (7 years)', level: 4 },
    { title: 'Adobe After Effects (5 years)', level: 3 },
    { title: 'Adobe Premier Pro (3 years)', level: 3 },
    { title: 'ESLint & Prettier', level: 4 },
    { title: 'Git & GitHub', level: 3 },
    { title: 'Chrome DevTools', level: 3 },
    { title: 'NPM', level: 3 },
    { title: 'Vercel', level: 3 },
    { title: 'Figma (1 year)', level: 2 },
  ];

  return (
    <motion.section
      id="Abilities"
      className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8 relative">
          {/* Gradient behind heading */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-24 rounded-full blur-2xl opacity-60 z-0"
            style={{
              background: 'linear-gradient(90deg, #ff80b5 0%, #9089fc 100%)',
            }}
          />
          <motion.h2
            className="text-4xl font-bold relative z-10"
            style={{ fontFamily: "'Roboto Slab', serif" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Abilities
          </motion.h2>
          <motion.p
            className="text-lg italic mt-2 mb-6 text-gray-600 dark:text-gray-400 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            “Life without knowledge is death in disguise.”
            <br />– Talib Kweli
          </motion.p>
          <motion.hr
            className="mt-4 border-t-2 border-gray-300 dark:border-gray-600 w-24 mx-auto relative z-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transformOrigin: 'center' }}
          />
        </div>
        <Section
          title="Skills"
          items={skills}
          animateStars={true}
          highlightedIdx={highlightedSkill}
          onItemHover={setHighlightedSkill}
          onItemLeave={() => setHighlightedSkill(null)}
        />
        <hr className="mb-6 border-gray-300 dark:border-gray-600" />
        <Section
          title="Languages"
          items={languages}
          animateStars={true}
          highlightedIdx={highlightedLang}
          onItemHover={setHighlightedLang}
          onItemLeave={() => setHighlightedLang(null)}
        />
        <hr className="mb-6 border-gray-300 dark:border-gray-600" />
        <Section
          title="Tools"
          items={tools}
          animateStars={true}
          highlightedIdx={highlightedTool}
          onItemHover={setHighlightedTool}
          onItemLeave={() => setHighlightedTool(null)}
        />
      </div>
    </motion.section>
  );
};

export default Abilities;

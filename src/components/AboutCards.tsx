"use client";
import React, { useEffect, useRef, useState } from "react";
import { aboutData } from "@/data/Foreground";
import { useId } from "react";

type Feature = {
  title: string;
  description: string;
};

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up-visible");
          } else {
            entry.target.classList.remove("fade-in-up-visible");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    );

    const elements = ref.current?.querySelectorAll(".fade-in-up");
    elements?.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-20 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-8 mx-auto">
        {aboutData.map((feature: Feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 to-background p-6 rounded-3xl overflow-hidden fade-in-up"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;

type GridProps = {
  size?: number;
};

const Grid: React.FC<GridProps> = ({ size }) => {
  const [squares, setSquares] = useState<number[][]>([]);

  useEffect(() => {
    const uniqueSquares = new Set<string>();
    const newSquares: number[][] = [];

    while (newSquares.length < 5) {
      const x = Math.floor(Math.random() * 4) + 7;
      const y = Math.floor(Math.random() * 6) + 1;
      const key = `${x}-${y}`;

      if (!uniqueSquares.has(key)) {
        uniqueSquares.add(key);
        newSquares.push([x, y]);
      }
    }

    setSquares(newSquares);
  }, []);

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          squares={squares}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-primary"
        />
      </div>
    </div>
  );
};

type GridPatternProps = {
  width: number;
  height: number;
  squares: number[][];
  className?: string;
};

export function GridPattern({
  width,
  height,
  squares,
  ...props
}: GridPatternProps) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      {squares && (
        <svg className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

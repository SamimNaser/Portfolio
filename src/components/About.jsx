import React from "react";
import { getTechIcon } from "../data/techIcons";

const techGroups = [
  {
    category: "FRONTEND",
    items: [
      { topic: "html5", label: "HTML" },
      { topic: "css3", label: "CSS" },
      { topic: "javascript" },
      { topic: "typescript" },
      { topic: "react" },
      { topic: "tailwind" },
      { topic: "shadcnui" },
    ],
  },
  {
    category: "LANGUAGES",
    items: [
      { topic: "java" },
      { topic: "python" },
      { topic: "c", label: "C" },
      { topic: "dart" },
    ],
  },
  {
    category: "BACKEND & DATA",
    items: [
      { topic: "fastapi" },
      { topic: "flask", label: "Flask API" },
      { topic: "nodejs" },
      { topic: "mysql" },
    ],
  },
  {
    category: "TOOLS",
    items: [
      { topic: "git" },
      { topic: "docker" },
      { topic: "n8n" },
      { topic: "vite" },
    ],
  },
];

const buildTechStackGroups = () => {
  let delayIndex = 0;

  return techGroups.map((group) => ({
    ...group,
    items: group.items
      .map(({ topic, label }) => {
        const icon = getTechIcon(topic);
        if (!icon) return null;
        return {
          icon,
          name: label || icon.title,
          color: `#${icon.hex}`,
          delay: delayIndex++ * 50,
          iconClassName: topic === "c" ? "w-6 h-6" : "w-7 h-7",
        };
      })
      .filter(Boolean),
  }));
};

const techStackGroups = buildTechStackGroups();

const About = ({ hasAnimated }) => {
  const animated = hasAnimated?.about;

  return (
    <section
      id="about"
      className="relative scroll-mt-24 py-14 md:py-20 px-6 surface"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 delay-200 ${animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-primary">
            ABOUT ME
          </h2>

          {/* Bio Card */}
          <div className="mb-10">
            <div className="surface-elevated rounded-2xl p-8 md:p-10 border border-primary/10 hover:border-primary/25 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="relative">
                    <img
                      src="/profile.jpeg"
                      alt="Sk Samim Naser"
                      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover ring-2 ring-primary/10"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-1">
                      Hi, I'm Samim -<br className="md:hidden" /> Software
                      Developer
                    </h3>
                  </div>

                  <p className="text-primary/75 leading-relaxed">
                    I build modern software with a focus on clean interfaces,
                    thoughtful architecture, and practical solutions. My current
                    work is centered around the React ecosystem and modern web
                    development.
                  </p>
                  <p className="text-primary/75 leading-relaxed">
                    I'm also expanding into backend development with Python,
                    Flask API, and databases, with the goal of building complete
                    and reliable applications rather than focusing only on the
                    frontend.
                  </p>
                  <p className="text-primary/75 leading-relaxed">
                    Alongside software development, I'm exploring AI and
                    workflow automation, experimenting with LLMs, local AI
                    tools, and automation workflows to build practical
                    solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-8">
            {techStackGroups.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-primary/45">
                  {group.category}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 auto-rows-fr gap-3">
                  {group.items.map(({ icon, name, color, delay, iconClassName }) => (
                    <TechCard
                      key={name}
                      icon={icon}
                      name={name}
                      color={color}
                      delay={delay}
                      animated={animated}
                      iconClassName={iconClassName}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TechCard = ({ icon, name, color, delay, animated, iconClassName }) => {
  return (
    <div
      className="h-full"
      style={{
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "ease-out",
        transitionDelay: animated ? `${200 + delay}ms` : "0ms",
        transitionDuration: "500ms",
        opacity: animated ? 1 : 0,
        transform: animated ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Inner div: handles all hover interactions with a fast, independent transition */}
      <div className="h-full group flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border border-primary/10 surface-elevated hover:border-primary/30 hover:scale-105 transition-[transform,border-color,filter] duration-200 ease-out cursor-default select-none">
        {/* Icon — full color on mobile, grayscale by default on desktop, full color on card hover */}
        <div className="w-8 h-8 flex items-center justify-center grayscale-0 brightness-100 md:grayscale md:brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-[filter] duration-150">
          <svg
            role="img"
            viewBox={icon.viewBox || "0 0 24 24"}
            xmlns="http://www.w3.org/2000/svg"
            className={iconClassName}
            fill={color}
          >
            {icon.paths ? (
              icon.paths.map((p, i) => (
                <path key={i} d={p.d} fill={p.fill || color} />
              ))
            ) : (
              <path d={icon.path} />
            )}
          </svg>
        </div>

        {/* Label */}
        <span className="text-[11px] font-mono text-primary/90 md:text-primary/55 group-hover:text-primary/90 transition-colors duration-150 text-center leading-tight">
          {name}
        </span>
      </div>
    </div>
  );
};

export default About;

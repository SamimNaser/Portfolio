import React from "react";
import { getTechIcon } from "../data/techIcons";

const techNames = [
  "html5",
  "css3",
  "tailwind",
  "javascript",
  "typescript",
  "react",
  "nodejs",
  "git",
  "vite",
  "npm",
  "pnpm",
  "flutter",
  "dart",
  "python",
  "mysql",
  "docker",
  "n8n",
  "java",
];

const techStack = techNames
  .map((name) => {
    const icon = getTechIcon(name);
    if (!icon) return null;
    return {
      icon,
      name: icon.title,
      color: `#${icon.hex}`,
    };
  })
  .filter(Boolean);

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
                      Hi, I'm Samim —<br className="md:hidden" /> Full Stack
                      Developer
                    </h3>
                  </div>

                  <p className="text-primary/75 leading-relaxed">
                    I craft modern, performant web and mobile applications with
                    a sharp eye for UX and clean architecture. My journey
                    started with{" "}
                    <span className="text-primary font-medium">Java</span>,
                    evolved through{" "}
                    <span className="text-primary font-medium">Flutter</span>{" "}
                    for cross-platform mobile apps, and landed in the{" "}
                    <span className="text-primary font-medium">React</span>{" "}
                    ecosystem for building scalable frontends.
                  </p>
                  <p className="text-primary/75 leading-relaxed">
                    Currently, I'm expanding my backend capabilities using{" "}
                    <span className="text-primary font-medium">Python</span> and{" "}
                    <span className="text-primary font-medium">MySQL</span>. I'm
                    focused on building a stronger foundation in server-side
                    architecture, from designing structured queries to
                    developing efficient, data-driven systems.
                  </p>
                  <p className="text-primary/75 leading-relaxed">
                    I'm also deeply curious about{" "}
                    <span className="text-primary font-medium">
                      AI-powered tools
                    </span>{" "}
                    and workflow automation exploring how smart integrations can
                    turn complex problems into elegant, human-friendly
                    experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 auto-rows-fr gap-3">
              {techStack.map(({ icon, name, color }, i) => (
                <TechCard
                  key={name}
                  icon={icon}
                  name={name}
                  color={color}
                  delay={i * 50}
                  animated={animated}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechCard = ({ icon, name, color, delay, animated }) => {
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
            className="w-7 h-7"
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

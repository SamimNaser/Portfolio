import React from "react";

import { OrbitingCircles } from "./ui/orbiting-circles";
import {
  siJavascript,
  siReact,
  siFlutter,
  siPython,
  siHtml5,
  siDart,
  siTailwindcss,
  siDocker,
  siN8n,
  siGit,
  siVite,
} from "simple-icons";

const Icon = ({ icon, size = 40 }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={`#${icon.hex}`}
  >
    <path d={icon.path} />
  </svg>
);

const About = ({ hasAnimated }) => {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 py-14 md:py-20 px-6 surface"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 delay-200 ${hasAnimated.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-primary ">
            ABOUT ME
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {/* Intro Section */}
            <div className="md:col-span-2 lg:col-span-2 min-h-105 md:min-h-112.5 text-primary surface-elevated rounded-2xl p-8 flex flex-col gap-6 border border-primary/15 hover:border-primary/40 transition-all duration-300">
              {/* Avatar */}
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
              />

              {/* Description */}
              <p className="text-lg leading-relaxed text-primary/80 mt-6 md:mt-10">
                My name is{" "}
                <span className="text-primary font-semibold">
                  Sk Samim Naser
                </span>
                , a developer passionate about building modern web and mobile
                applications. I started my journey with Java which helped me
                build a strong programming foundation, and later expanded into
                app development and modern web technologies.
                <br />
                <br />
                Currently, I enjoy exploring AI, automation, and new tools that
                help create intelligent, efficient, and user‑focused digital
                experiences.
              </p>
            </div>

            {/* Placeholder Section (content to be decided later) */}
            <div className="md:col-span-2 lg:col-span-1 relative min-h-105 md:min-h-112.5 w-full overflow-hidden surface-elevated rounded-2xl px-10 border border-primary/15 hover:border-primary/40 transition-all duration-300">
              {/* Center Glow */}
              {/* Blurred glow layer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cyan-400/50 blur-2xl"></div>
              {/* Solid core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-400 "></div>
              <OrbitingCircles
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                radius={150}
                iconSize={34}
                speed={2}
              >
                <Icon icon={siDocker} />
                <Icon icon={siGit} />
                <Icon icon={siN8n} />
                <Icon icon={siVite} />
              </OrbitingCircles>
              <OrbitingCircles
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                radius={105}
                reverse
                iconSize={32}
                speed={1.5}
              >
                <Icon icon={siHtml5} />
                <Icon icon={siTailwindcss} />
                <Icon icon={siReact} />
                <Icon icon={siFlutter} />
              </OrbitingCircles>

              <OrbitingCircles
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                radius={60}
                iconSize={30}
                speed={2}
              >
                <Icon icon={siPython} />
                <Icon icon={siJavascript} />
                <img
                  src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/java.svg"
                  alt="java"
                  width={32}
                  height={32}
                />
                <Icon icon={siDart} />
              </OrbitingCircles>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

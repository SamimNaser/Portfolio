"use client";
import React, { useState, useEffect } from "react";
import { heroData } from "../data/hero";

import { Meteors } from "./ui/meteors";
import { NumberTicker } from "./ui/number-ticker";

import { ArrowDown, Github, Instagram, Mail } from "lucide-react";

const Hero = ({ hasAnimated }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const { roles, name, description } = heroData;

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 60;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const currentRole = roles[currentTextIndex];

    if (!isDeleting) {
      if (currentText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentRole.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(100);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % roles.length);
        setTypingSpeed(150);
      }
    }
  }, [currentText, currentTextIndex, isDeleting, typingSpeed, roles]);

  return (
    <section className="relative h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
      <Meteors />
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${hasAnimated?.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        id="hero"
      >
        {/* Name */}
        <h1 className="relative z-10 mb-6 mt-15 text-4xl md:text-7xl  bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-400  text-center font-sans font-bold">
          {name}
        </h1>

        {/* Typewriter role */}
        <div className="mb-8 text-xl md:text-4xl text-blue-500 font-semibold h-8">
          {currentText}
          <span className="animate-pulse">|</span>
        </div>

        {/* Description */}
        <p className="mb-10 text-lg leading-relaxed max-w-5xl md:text-xl text-neutral-400">
          {description}
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8 animate-fade-in-up delay-400">
          {heroData.socialLinks.map((social, index) => {
            const IconComponent =
              social.icon === "Github"
                ? Github
                : social.icon === "Instagram"
                  ? Instagram
                  : Mail;
            return (
              <a
                key={index}
                href={social.url}
                className="group p-3 surface rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1.5"
              >
                <IconComponent className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </a>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 animate-fade-in-up delay-300">
          {heroData.ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className="group relative px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border border-black text-black dark:border-white dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(button.href);
              }}
            >
              {button.text}
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-15 grid grid-cols-3 gap-10 max-w-xl mx-auto justify-between animate-fade-in-up delay-500">
          {heroData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-primary mb-1 flex justify-center items-baseline gap-0.5">
                <NumberTicker value={stat.number} delay={0.5} />
                {stat.suffix}
              </div>
              <div className="text-xs text-primary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Top Right
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-linear-to-br dark:from-blue-400 dark:to-blue-700 opacity-10 blur-3xl animate-pulse delay-1000"></div> */}
    </section>
  );
};

export default Hero;

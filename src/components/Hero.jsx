"use client";
import React, { useState, useEffect } from "react";

import { Meteors } from "./ui/meteors";
import { heroData } from "../data/hero";

import { ArrowDown, Github, Instagram, Mail } from "lucide-react";

const Hero = ({ hasAnimated }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const { roles, name, description } = heroData;

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
        <h1 className="relative z-10 mb-4 text-4xl md:text-7xl  bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-500  text-center font-sans font-bold">
          {name}
        </h1>

        {/* Typewriter role */}
        <div className="mb-10 text-xl md:text-4xl text-blue-500 font-semibold h-8">
          {currentText}
          <span className="animate-pulse">|</span>
        </div>

        {/* Description */}
        <p className="mb-8 text-lg leading-relaxed max-w-5xl md:text-xl text-neutral-400">
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
                className="group p-3 surface rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <IconComponent className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;

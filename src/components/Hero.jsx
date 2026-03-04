"use client";
import React, { useState, useEffect } from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { heroData } from "../data/hero";

const Hero = ({ hasAnimated }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const { roles, name, subtitle } = heroData;

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
    <section className="relative h-screen w-full flex items-center justify-center bg-neutral-950 overflow-hidden">
      <BackgroundBeams />

      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${hasAnimated?.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        id="hero"
      >
        <h1 className="relative z-10 text-lg md:text-8xl  bg-clip-text text-transparent bg-linear-to-r from-white to-neutral-500  text-center font-sans font-bold">
          {name}
        </h1>

        <p className="mt-4 text-lg md:text-xl text-neutral-400">{subtitle}</p>

        <div className="mt-6 text-xl md:text-4xl text-blue-500 font-semibold h-8">
          {currentText}
          <span className="animate-pulse">|</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

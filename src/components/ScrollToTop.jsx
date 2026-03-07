import React from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = ({ showScrollTop }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-4 bg-white text-black p-3 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;

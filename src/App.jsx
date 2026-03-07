import React from "react";
import { useIntersectionObserver } from "./hooks/userIntersectionObserver";
//import { useScrollToTop } from "./hooks/useScrollToTop";

import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { useScrollToTop } from "./hooks/useScrollToTop";

function App() {
  const hasAnimated = useIntersectionObserver();
  const showScrollTop = useScrollToTop();

  document.documentElement.classList.add("dark");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <NavBar />
      <Hero hasAnimated={hasAnimated} />
      <About hasAnimated={hasAnimated} />
      <Contact hasAnimated={hasAnimated} />
      <Footer />
      <ScrollToTop showScrollTop={showScrollTop} />
    </div>
  );
}

export default App;

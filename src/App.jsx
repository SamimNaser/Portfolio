import React from "react";
import { useIntersectionObserver } from "./hooks/userIntersectionObserver";
//import { useScrollToTop } from "./hooks/useScrollToTop";

import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";

function App() {
  const hasAnimated = useIntersectionObserver();
  //const showScrollTop = useScrollToTop();

  document.documentElement.classList.add("dark");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <NavBar />
      <Hero hasAnimated={hasAnimated} />
      <About hasAnimated={hasAnimated} />
    </div>
  );
}

export default App;

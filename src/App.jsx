import React from "react";
import { useIntersectionObserver } from "./hooks/userIntersectionObserver";
//import { useScrollToTop } from "./hooks/useScrollToTop";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";

function App() {
  const hasAnimated = useIntersectionObserver();
  //const showScrollTop = useScrollToTop();

  document.documentElement.classList.add("dark");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <NavBar />
      <Hero hasAnimated={hasAnimated} />
    </div>
  );
}

export default App;

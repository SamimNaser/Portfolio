import React, { useEffect, useState } from "react";
import { useIntersectionObserver } from "./hooks/userIntersectionObserver";
//import { useScrollToTop } from "./hooks/useScrollToTop";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";

function App() {
  const hasAnimated = useIntersectionObserver();
  //const showScrollTop = useScrollToTop();

  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <NavBar dark={dark} setDark={setDark} />
      <Hero hasAnimated={hasAnimated} />
    </div>
  );
}

export default App;

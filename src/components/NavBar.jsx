import React, { useState, useEffect } from "react";
import { Menu, X, Cloud } from "lucide-react";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState(() => {
    const CACHE_KEY = "portfolio_weather_cache";
    const CACHE_DURATION = 10 * 60 * 1000;
    const cached = localStorage.getItem(CACHE_KEY);

    if (!cached) return null;

    try {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        return parsed.temperature;
      }
    } catch (err) {
      print(err); // ignore invalid cache data
    }

    return null;
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
    closeMobileMenu(); // Close mobile menu after clicking
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Using weather data from cache if last call <= 10mins and refreshing
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    const CACHE_KEY = "portfolio_weather_cache";
    const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

    const cached = localStorage.getItem(CACHE_KEY);

    // cache already used during initial state load

    const shouldFetch =
      !cached || Date.now() - JSON.parse(cached).timestamp >= CACHE_DURATION;

    if (shouldFetch) {
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=22.57&longitude=88.36&current_weather=true",
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.current_weather?.temperature !== undefined) {
            const temp = Math.round(data.current_weather.temperature);
            setTemperature(temp);

            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                temperature: temp,
                timestamp: Date.now(),
              }),
            );
          }
        })
        .catch(() => {});
    }

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { href: "#about", label: "ABOUT" },
    { href: "#projects", label: "PROJECTS" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "surface/95 backdrop-blur-sm shadow-sm " : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Weather/Time/Location Info */}
          <div className="flex items-center gap-2 md:gap-4 text-lg font-bold text-primary weather">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span>KOLKATA</span>
            <span>{time}</span>
            <span className="flex items-center gap-1">
              <Cloud className="w-5 h-5" />
              {temperature !== null ? `${temperature}°C` : "--"}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors font-bold text-primary text-lg hover:opacity-70"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 transition-colors cursor-pointer text-primary"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100 mt-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="surface border border-default rounded-lg shadow-lg p-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="block font-bold text-primary transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ dark, setDark }) => {
  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
      className={`relative w-14 h-8 rounded-full transition-colors duration-300
      ${dark ? "bg-gray-700" : "bg-gray-300"}
      `}
    >
      {/* Thumb */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full 
        flex items-center justify-center
        transition-transform duration-300
        ${dark ? "translate-x-6 bg-gray-900" : "translate-x-0 bg-white"}`}
      >
        {dark ? (
          <Moon className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4 text-gray-600" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;

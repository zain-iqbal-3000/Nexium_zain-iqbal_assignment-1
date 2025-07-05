"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from document.documentElement on client-side
  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isCurrentlyDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Update the HTML class
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 bg-stone-800/50 border-stone-700 hover:bg-stone-700 transition-all duration-200 z-50"
      aria-label="Toggle theme"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 text-stone-300" />
      ) : (
        <MoonIcon className="h-5 w-5 text-stone-600" />
      )}
    </Button>
  );
}

function SunIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

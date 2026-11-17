import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggleBtn = ({ theme, setTheme }) => {

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    setTheme(theme || (prefersDarkMode ? "dark" : "light"));
  }, [theme, setTheme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("c_theme", theme);
  }, [theme]);

  return (
    <>
      {theme === "light" ? (
        <Moon
          className="cursor-pointer border rounded-full p-0.5 border-gray-500"
          size={26}
          strokeWidth={2.4}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <Sun
          className="cursor-pointer border rounded-full p-0.5 border-gray-200"
          color="white"
          size={26}
          strokeWidth={2.4}
          onClick={() => setTheme("light")}
        />
      )}
    </>
  );
};

export default ThemeToggleBtn;

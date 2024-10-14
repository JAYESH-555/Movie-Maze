import { useEffect, useState } from "react";
import { Page } from "./Page";
import { SearchTermContext, ThemeContext } from "./context/context";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode");

    if (isDarkMode === "false") {
      setDarkMode(false);
    }

    if (isDarkMode === "true") {
      setDarkMode(true);
    }

    if (isDarkMode === null) {
      localStorage.setItem("darkMode", true);
    }
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
          <Page />
        </SearchTermContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
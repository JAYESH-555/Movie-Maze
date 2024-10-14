import { useContext } from "react";
import Navbar from "./components/NavBar";
import { ThemeContext } from "./context/context";
import MainRoutes from "./routes/MainRoutes";

export function Page() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div className={darkMode ? "dark" : "light"}>
        <div className="bg-color4 text-color1 dark:bg-color1 dark:text-color4">
          <Navbar />
          <div className="px-4 py-28 min-h-[100vh]">
            <MainRoutes />
          </div>
        </div>
      </div>
    </>
  );
}
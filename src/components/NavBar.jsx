import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchTermContext, ThemeContext } from "../context/context";
import { useDebounce } from "../hooks/useDebounce";
import  logo  from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setSearchTerm } = useContext(SearchTermContext);

  function handleSetTheme() {
    if (darkMode) {
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
    } else {
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
    }
  }

  const getSearchResults = useDebounce(async (searchText) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${
        import.meta.env.VITE_API_KEY
      }&s=${searchText}&page=1`
    );
    if (response.data.Response === "False") {
      setSearchResults([]);
    } else {
      setSearchResults(response.data.Search);
    }
  }, 300);

  function handleChange(e) {
    setSearchText(e.target.value);
    if (e.target.value.length > 0) {
      setShowSearchModal(true);
      if (e.target.value.length > 3) {
        getSearchResults(e.target.value);
      }
    } else {
      setShowSearchModal(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.id !== "searchSuggestions") {
        setShowSearchModal(false);
      }
    });
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
      setShowSearchModal(false);
      setSearchText("");
      navigate("/");
    }
  }

  return (
    <nav className="bg-color1 text-color4 shadow-xl dark:bg-color4 dark:text-color1 fixed w-full flex justify-center items-center z-50">
      <div className="w-full p-4 max-w-7xl flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Link to={"/"}>
            <div className="flex justify-center items-center gap-4">
              <div className="flex justify-center items-center">
                <img src={logo} alt="MovieMaze" className="w-10 h-10" />
              </div>
              <div className="hidden sm:inline-flex">
                <h1 className="font-bold text-3xl ">MovieMaze</h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="">
            <button
              className="text-xl bg-color4 text-color1 dark:bg-color1 dark:text-color4 rounded-md px-4 py-2"
              onClick={handleSetTheme}
            >
              {darkMode ? (
                <i className="fa-regular fa-sun"></i>
              ) : (
                <i className="fa-regular fa-moon"></i>
              )}
            </button>
          </div>
          <div className="flex items-center h-full justify-center relative">
            <input
              type="text"
              placeholder="Search movies or TV shows..."
              className="px-4 py-2 rounded-md h-full focus:outline-color2 bg-color4 text-color1 dark:bg-color1 dark:text-color4 outline-none w-48 md:w-96"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={searchText}
            />
            {showSearchModal && (
              <ul id="searchSuggestions" className="absolute top-14 bg-color4 border-2 border-color1 rounded-lg w-48  md:w-96 px-4 py-2 max-h-48 overflow-auto text-color1 flex justify-start items-start flex-col gap-2 dark:bg-color1 dark:text-color4 dark:border-color4">
                {searchText.length <= 3 && (
                  <li className="w-full py-2 text-center">
                    Please enter more than 3 characters to search
                  </li>
                )}
                {searchText.length > 3 && searchResults.length === 0 && (
                  <li className="w-full py-2 text-center">No results found</li>
                )}
                {searchText.length > 3 &&
                  searchResults.length > 0 &&
                  searchResults.map((result) => (
                    <li
                      key={result.imdbID}
                      className="border-b border-color1 w-full py-2 dark:border-color4 cursor-pointer"
                      onClick={() => {
                        setShowSearchModal(false);
                        setSearchText("");
                        navigate(`/name/${result.imdbID}`);
                      }}
                    >
                      {result.Title}
                    </li>
                  ))}
                {/* <li className="border-b border-color1 w-full py-2 dark:border-color4 cursor-pointer">
                  Hello there
                </li> */}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { useContext, useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import axios from "axios";
import { searchMovieBySearchTerm } from "../apis/searchMovieBySearchTerm";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { SearchTermContext } from "../context/context";

export function Home() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const { searchTerm } = useContext(SearchTermContext);

  const [error, setError] = useState(null);

  const { pageNo } = useParams();

  let currentPage;

  if (pageNo === undefined || isNaN(parseInt(pageNo))) {
    currentPage = 1;
  } else {
    currentPage = pageNo;
  }

  const nextPage = parseInt(currentPage) + 1;
  const prevPage = parseInt(currentPage) - 1;

  useEffect(() => {
    document.title = "MovieMaze | Home";
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(
        searchMovieBySearchTerm(
          searchTerm !== "" ? searchTerm : "Avengers:",
          currentPage
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.Response === "False") {
        setError(response.data.Error);
        return;
      } else {
        setError(null);
        setMovies(response.data.Search);
        setPageCount(Math.ceil(response.data.totalResults / 10));
      }
    }
    fetchMovies();
  }, [currentPage, searchTerm]);

  if (error) {
    return <ErrorPage status={"404"} message={error} />;
  }

  if (movies.length > 0) {
    return (
      <>
        <div className="w-full flex justify-center items-start">
          <div className="w-full max-w-7xl flex flex-col justify-center items-center gap-8">
            <div className="flex justify-center items-center text-center gap-4 flex-col w-full py-8">
              <h1 className="text-4xl text-center font-bold">
                Welcome to MovieMaze
              </h1>
              <p className="text-center mt-4">
              Unveil the secrets of your favorite movies and TV shows—search now and let the reel roll!
              </p>
            </div>
            <div className="w-full flex justify-center items-center gap-8 flex-wrap">
              {movies.map((movie) => {
                return <MovieCard key={movie.imdbID} movie={movie} />;
              })}
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              {prevPage > 0 && (
                <Link to={`/page/${prevPage}`}>
                  <button className="bg-color1 text-color4 dark:bg-color4 dark:text-color1 px-4 py-2 rounded-md w-[7rem]">
                    Previous
                  </button>
                </Link>
              )}
              {nextPage <= pageCount && (
                <Link to={`/page/${nextPage}`}>
                  <button className="bg-color1 text-color4 dark:bg-color4 dark:text-color1 px-4 py-2 rounded-md w-[7rem]">
                    Next
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export function MovieDetails() {
  const [movieData, setMovieSata] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { imdbid } = useParams();

  useEffect(() => {
    async function fetchMovieData() {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbid}&apikey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (response.data.Response === "False") {
        setError(response.data.Error);
        setLoading(false);
        return;
      } else {
        setMovieSata(response.data);
        setLoading(false);
      }
    }
    fetchMovieData();
  }, [imdbid]);

  useEffect(() => {
    if (!loading && error === null && movieData.Title) {
      document.title = `${movieData.Title}`;
    } else if (loading) {
      document.title = "Loading...";
    } else if (error) {
      document.title = "Error";
    }
  }, [error, loading, movieData.Title]);

  if (error) {
    return <ErrorPage status={"404"} message={error} />;
  }

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  if (error === null && Object.keys(movieData).length !== 0) {
    return (
      <>
        <div className="w-full flex justify-center items-start">
          <div className="w-full max-w-7xl flex justify-center items-center p-4">
            <div className="w-full flex justify-center items-center flex-col gap-8">
              <div className="w-full flex justify-center items-center flex-col gap-4 md:gap-8 md:flex-row text-center">
                <div className="flex justify-center items-center rounded-lg">
                  <img
                    className="rounded-lg w-64 h-96 object-cover object-center shadow-black shadow-lg transform transition-transform hover:scale-105 hover:rotate-3 hover:shadow-color2 hover:shadow-lg dark:hover:shadow-color2 cursor-pointer"
                    src={
                      movieData.Poster === "N/A"
                        ? "https://via.placeholder.com/300"
                        : movieData.Poster
                    }
                    alt=""
                  />
                </div>

                <div className="flex justify-center items-center flex-col gap-4 max-w-96  p-4 shadow-[5px_5px_0px_0px] rounded-lg bg-color1 text-color4 dark:bg-color4 dark:text-color1 shadow-color2">
                  <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-4xl font-bold">{movieData.Title}</h1>
                    <p className="text-xl">{movieData.Genre}</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-xl">
                      <span className="font-bold">Released:</span>{" "}
                      {movieData.Released}
                    </p>
                    <p className="text-xl">
                      <span className="font-bold">Rated:</span>{" "}
                      {movieData.Rated}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center flex-col gap-4">
                {/* director, writer, actors  */}
                <div className="flex flex-col gap-2 w-full p-4 shadow-[5px_5px_0px_0px] rounded-lg bg-color1 text-color4 dark:bg-color4 dark:text-color1 shadow-color2">
                  <p className="text-xl">
                    <span className="font-bold">Director:</span>{" "}
                    {movieData.Director}
                  </p>
                  <p className="text-xl">
                    <span className="font-bold">Writer:</span>{" "}
                    {movieData.Writer}
                  </p>
                  <p className="text-xl">
                    <span className="font-bold">Actors:</span>{" "}
                    {movieData.Actors}
                  </p>
                </div>
                {/* plot */}
                <div className="flex flex-col gap-2 w-full p-4 shadow-[5px_5px_0px_0px] rounded-lg bg-color1 text-color4 dark:bg-color4 dark:text-color1 shadow-color2">
                  <p className="text-xl">
                    <span className="font-bold">Plot:</span> {movieData.Plot}
                  </p>
                </div>
                {/* lan country */}
                <div className="flex flex-col gap-2 w-full p-4 shadow-[5px_5px_0px_0px] rounded-lg bg-color1 text-color4 dark:bg-color4 dark:text-color1 shadow-color2">
                  <p className="text-xl">
                    <span className="font-bold">Language:</span>{" "}
                    {movieData.Language}
                  </p>
                  <p className="text-xl">
                    <span className="font-bold">Country:</span>{" "}
                    {movieData.Country}
                  </p>
                </div>
                {/* awards */}
                <div className="flex flex-col gap-2 w-full p-4 shadow-[5px_5px_0px_0px] rounded-lg bg-color1 text-color4 dark:bg-color4 dark:text-color1 shadow-color2">
                  <p className="text-xl">
                    <span className="font-bold">Awards:</span>{" "}
                    {movieData.Awards}
                  </p>
                </div>
                {/* ratings */}
                <div className="flex flex-col gap-2 w-full p-4 shadow-[5px_5px_0px_0px] rounded-lg bg-color1 text-color4 dark:bg-color4 dark:text-color1 shadow-color2">
                  <p className="text-xl">
                    <span className="font-bold">Ratings:</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    {movieData.Ratings &&
                      movieData.Ratings.map((rating, index) => {
                        return (
                          <p key={index} className="text-xl">
                            <span className="font-bold">{rating.Source}:</span>{" "}
                            {rating.Value}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
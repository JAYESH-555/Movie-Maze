import { Link } from "react-router-dom";

export function MovieCard({ movie }) {
  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength - 3) + "...";
    }
  }

  return (
    <>
      <Link to={`/name/${movie.imdbID}`}>
        <div className="bg-color1 text-color4 dark:bg-color4 dark:text-color1 p-4 rounded-lg max-w-72 h-[32rem] shadow-black shadow-lg cursor-pointer 
          transform transition-transform hover:scale-105 hover:shadow-2xl hover:shadow-color2 hover:-translate-y-2 duration-300">

          <div className="flex justify-center items-center w-full h-full">

            <div className="flex flex-col gap-4 w-full h-full justify-center items-center">

              <div className="flex w-full flex-1 justify-center items-center rounded-lg overflow-hidden 
                transform transition-transform hover:skew-y-1 hover:shadow-color2 hover:shadow-lg dark:hover:shadow-color2">
                <img
                  src={
                    movie.Poster === "N/A"
                      ? "https://via.placeholder.com/300"
                      : movie.Poster
                  }
                  alt="movie"
                  className="rounded-lg w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-2xl font-bold">
                  {truncateString(movie.Title, 47)}
                </h1>
                <p className="text-sm font-bold opacity-80">{movie.Type}</p>
                <p className="font-bold text-xl">Year: {movie.Year}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
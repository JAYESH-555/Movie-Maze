import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { MovieDetails } from "../pages/MovieDetails";
import ErrorPage from "../pages/ErrorPage";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/name/:imdbid" element={<MovieDetails />} />
      <Route path="/page/:pageNo" element={<Home />} />
      <Route
        path="*"
        element={<ErrorPage status={"404"} message={"Page Not Found"} />}
      />
    </Routes>
  );
}

export default MainRoutes;
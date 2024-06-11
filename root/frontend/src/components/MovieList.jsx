import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import MovieContext from "../context/MovieContext";


const MovieList = () => {
  const movies = useContext(MovieContext);

  return (
    <div className="grid-container mx-auto p-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.isArray(movies) &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default MovieList;

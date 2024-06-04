import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const MovieCard = ({ movie }) => {
  const [watchProviders, setWatchProviders] = useState([]);

  useEffect(() => {
    axios
      .get(`api/movie/${movie.id}/watch/providers`)
      .then((response) => {
        console.log(response.data);
        setWatchProviders(response.data.results || {});
      })
      .catch((error) => {
        console.error("Error fetching watch providers:", error);
        setWatchProviders({});
      });
  }, [movie.id]);

  const numberOfCountries = Object.keys(watchProviders).length;

  return (
    <div className="card-bordered bg-base-100 rounded-3xl min-w-0 text-neutral-500 hover:duration-100 hover:bg-neutral-200/40 transition-colors xl:aspect-[2/2.2] flex flex-col">
      <header className="flex gap-4 justify-center p-4">
        <h3 className="truncate">{movie.title}</h3>
        <time></time>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-h-64 h-full p-4 2xl:max-h-80">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
            className="block h-full mx-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
      <footer className="flex justify-between p-4">
        <span>
          Streaming in {numberOfCountries}{" "}
          {numberOfCountries === 1 ? "country" : "countries"}{" "}
        </span>
        <a
          href={`/movie/${movie.id}`}
          className="text-black flex transition-transform items-center mr-1"
          // onClick={(e) => {
          //   e.preventDefault();
          // }}
        >
          See where
        </a>
      </footer>
    </div>
  );
};

export default MovieCard;

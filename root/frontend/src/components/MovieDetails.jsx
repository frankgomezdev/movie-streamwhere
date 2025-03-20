/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import formatRuntime from "../utils/formatRuntime";
import { isoCountries, getCountryName } from "../utils/countryCodeConverter";
import { API_URL } from "../../config";

const MovieDetails = ({ id, movieId }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    console.log(id);
    axios
      .get(`${API_URL}/api/movie/${id}`)
      .then((response) => {
        console.log(response.data);
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });

    // Fetch watch providers
    axios
      .get(`http://localhost:5173/api/movie/${id}/watch/providers`)
      .then((response) => {
        setWatchProviders(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching watch providers:", error);
      });
  }, [id]);

  // Modified to get all unique providers regardless of type
  const getAllUniqueProviders = () => {
    if (!watchProviders) return [];
    const providers = new Map(); // Using Map to maintain insertion order

    Object.entries(watchProviders).forEach(([countryCode, country]) => {
      ["flatrate", "free", "ads", "rent", "buy"].forEach((type) => {
        if (country[type]) {
          country[type].forEach((provider) => {
            if (!providers.has(provider.provider_id)) {
              providers.set(provider.provider_id, {
                ...provider,
                countries: new Set([countryCode]),
                types: new Set([type]),
              });
            } else {
              const existingProvider = providers.get(provider.provider_id);
              existingProvider.countries.add(countryCode);
              existingProvider.types.add(type);
            }
          });
        }
      });
    });

    return Array.from(providers.values()).map((provider) => ({
      ...provider,
      countries: Array.from(provider.countries),
      types: Array.from(provider.types),
    }));
  };

  // Get countries and their availability types for a specific provider
  const getProviderAvailability = (providerId) => {
    if (!watchProviders) return [];

    const availability = [];
    Object.entries(watchProviders).forEach(([countryCode, country]) => {
      const types = [];
      ["flatrate", "free", "ads", "rent", "buy"].forEach((type) => {
        if (country[type]?.some((p) => p.provider_id === providerId)) {
          types.push(type);
        }
      });
      if (types.length > 0) {
        availability.push({
          countryCode,
          types,
        });
      }
    });
    return availability;
  };

  return (
    <div className="w-full px-3 md:px-6 flex-1 flex flex-col">
      <div className="bg-white flex flex-col rounded-3xl flex-1">
        <header className="grid gap-2 p-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="md:flex md:justify-between md:items-center">
            <h1 className="text-sm truncate text-center md:text-left">
              {movieDetails.title}
            </h1>
            <div className="hidden md:flex items-center gap-4">
              <ul className="flex gap-4 items-center">
                {movieDetails.genres &&
                  movieDetails.genres.map((genre) => (
                    <li
                      key={genre.id}
                      className="hidden md:block whitespace-nowrap first:block md:first:block"
                    >
                      {genre.name}
                    </li>
                  ))}
              </ul>
              <span className="whitespace-nowrap">
                {formatRuntime(movieDetails.runtime)}
              </span>
            </div>
          </div>
          <div className="flex flex-col md:hidden items-center gap-2">
            <ul className="flex gap-4 items-center">
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => (
                  <li key={genre.id} className="whitespace-nowrap">
                    {genre.name}
                  </li>
                ))}
            </ul>
            <span className="whitespace-nowrap">
              {formatRuntime(movieDetails.runtime)}
            </span>
          </div>
        </header>
        <div className="h-64 my-8 p-4 2xl:h-80">
          <img
            loading="lazy"
            alt=""
            className="block h-full mx-auto rounded-2xl shadow-2xl"
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          />
        </div>
        <p className="mx-auto px-4 text-balance max-w-md text-center text-neutral-600 dark:text-neutral-400">
          {movieDetails.overview}
        </p>
      </div>

      {/* Watch Providers Section */}
      <div className="mt-8 max-w-4xl mx-auto w-full px-4">
        {/* <h2 className="text-lg font-semibold mb-4">Where to Watch</h2> */}

        {/* Provider Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {getAllUniqueProviders().map((provider) => (
            <button
              key={provider.provider_id}
              onClick={() =>
                setSelectedProvider(
                  selectedProvider?.provider_id === provider.provider_id
                    ? null
                    : provider
                )
              }
              className={`bg-white rounded-xl p-4 shadow-sm flex flex-col items-center transition-all
                ${
                  selectedProvider?.provider_id === provider.provider_id
                    ? "ring-2 ring-blue-500"
                    : "hover:shadow-md"
                }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name}
                className="w-16 h-16 rounded-xl mb-2"
              />
              <h3 className="font-medium text-sm">{provider.provider_name}</h3>
              <p className="text-xs text-gray-600">
                {provider.countries.length}{" "}
                {provider.countries.length === 1 ? "country" : "countries"}
              </p>
            </button>
          ))}
        </div>

        {/* Countries List */}
        {selectedProvider && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Countries</span>
              <span>Availability</span>
            </div>
            <div className="space-y-3">
              {getProviderAvailability(selectedProvider.provider_id).map(
                ({ countryCode, types }) => (
                  <div
                    key={countryCode}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`}
                        alt={getCountryName(countryCode)}
                        className="w-6 h-4 object-cover rounded-sm"
                      />
                      <span>{getCountryName(countryCode)}</span>
                    </div>
                    <div className="flex gap-2">
                      {types.map((type) => (
                        <span key={type} className="text-sm capitalize">
                          {type === "flatrate" ? "Stream" : type}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import formatRuntime from '../utils/formatRuntime';


const MovieDetails = ({ id }) => {
    const [movieDetails, setMovieDetails] = useState([]);

    useEffect(() => {
        console.log(id);
        axios
          .get(`http://localhost:5173/api/movie/${id}`)
          .then((response) => {
            console.log(response.data);
            setMovieDetails(response.data);
          })
          .catch((error) => {
            console.error("Error fetching movie details:", error);
          });
      }, []);

  return (
    <div className='w-full px-3 md:px-6 flex-1 flex flex-col'>
        <div className='bg-white flex flex-col rounded-3xl flex-1'>
            <header className='grid gap-2 grid-cols-2 p-4 md:grid-cols-3 text-sm text-neutral-600 dark:text-neutral-400 justify-between'>
                <h1 className='text-sm truncate'>{movieDetails.title}</h1>
                <div className='hidden md:flex justify-center items-center gap-4'>
                    <ul className='flex gap-4 items-center'>
                        {movieDetails.genres && movieDetails.genres.map((genre) => (
                            <li key={genre.id} className='hidden md:block whitespace-nowrap first:block md:first:block'>{genre.name}</li>
                        ))}
                    </ul>
                    <span className='whitespace-nowrap'>{formatRuntime(movieDetails.runtime)}</span>
                </div>
            </header>
            <div className='h-64 my-8 p-4 2xl:h-80'>
                <img loading='lazy' alt='' className='block h-full mx-auto rounded-2xl shadow-2xl' src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} />
            </div>
            <p className='mx-auto px-4 text-balance max-w-md text-center text-neutral-600 dark:text-neutral-400'>{movieDetails.overview}</p>
            <div className='w-full sm:mb-8'>
                <div className='max-w-xl relative mx-auto w-full'>
                    <div className='relative my-8' role='region' aria-roledescription='carousel'>
                        <div className='overflow-hidden'>
                            <div className='flex justify-normal'>
                                {/* streaming providers should be mapped here. example of one div below*/}
                                <div role='group' aria-roledescription='slide' className='min-w-0 shrink-0 grow-0 basis-1/3 sm:basis-1/4 ml-1 first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieDetails
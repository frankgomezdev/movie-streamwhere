import React from 'react'

const MovieDetails = () => {
  return (
    <div className='w-full px-3 md:px-6 flex-1 flex flex-col'>
        <div className='bg-white flex flex-col rounded-3xl flex-1'>
            <header className='grid gap-2 grid-cols-2 p-4 md:grid-cols-3 text-sm text-neutral-600 dark:text-neutral-400 justify-between'>
                <h1 className='text-sm truncate'></h1>
                <div className='hidden md:flex justify-center items-center gap-4'>
                    <ul className='flex gap-4 items-center'>
                        {/* list of genres goes in here */}
                    </ul>
                    <span className='whitespace-nowrap'></span>
                </div>
            </header>
            <div className='h-64 my-8 p-4 2xl:h-80'>
                <img loading='lazy' alt='' className='block h-full mx-auto rounded-2xl shadow-2xl' src='' />
            </div>
            <p className='mx-auto px-4 text-balance max-w-md text-center text-neutral-600 dark:text-neutral-400'></p>
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
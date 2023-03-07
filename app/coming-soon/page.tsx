"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import useFetch from "@/app/hooks/useFetch";
import Movies from '../movies/Movies'

export default function ComingSoon() {
  const myKey = process.env.API_KEY;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, apiData, serverError } = useFetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${myKey}&language=en-US&page=${currentPage}`
  );

  console.log(isLoading, serverError);

  return (
    <div>
      <>
        <h1 className='flex  px-6 py-4 gap-4 items-center text-black text-sm  mt-[2em] font-semibold'>
          Upcoming Movies
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className='py-2 px-2 bg-slate-400 rounded-full'
          >
            <IconChevronLeft color='white' size={20} />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className='py-2 px-2 bg-slate-400 rounded-full'
          >
            <IconChevronRight color='white' size={20} />
          </button>
          <div className='py-2 px-3 bg-slate-400 rounded-full text-white'>
            Page {currentPage}
          </div>
        </h1>
        <div className='flex px-6 py-4 flex-row overflow-x-auto space-x-8 no-scrollbar h-[400px] w-screen'>
          {apiData?.results?.map((movie: any) => (
            <Movies
              title={movie?.title as string}
              movieId={movie?.id as number}
              poster_path={movie?.poster_path as string}
              release_date={movie?.release_date as string}
              key={movie?.id}
            />
          ))}
        </div>
      </>
    </div>
  );
}

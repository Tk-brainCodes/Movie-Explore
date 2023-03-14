"use client";
import { useState, useEffect } from "react";
import Movies from "../movies/Movies";
import { MovieDataProp } from "../types/movie-type";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CustomMovieCard({
  movies,
  setCurrentPage,
  currentPage,
  title,
}: any) {
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    if (movies?.results?.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

  return (
    <>
      <h1 className='flex  px-6 py-4 gap-4 items-center text-black text-sm  mt-[2em] font-semibold'>
        {title}
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

      <div className='flex px-6 py-4 snap-mandatory snap-x scroll-pr-6 touch-auto scroll-smooth flex-row overflow-x-auto space-x-8 no-scrollbar h-[400px] w-[940px]'>
        <>
          {movies?.results?.length === 0 ? (
            <div className='grid'>
              <h2 className='text-slate-300 text-2xl font-normal block'>
                <VideocamOffOutlinedIcon className='w-[100px] h-[100px] ml-[40px]' />
                <br />
                No {title}
              </h2>
            </div>
          ) : (
            movies?.results?.map((movie: MovieDataProp) => (
              <div className='snap-center flex-shrink-0'>
                <Movies
                  title={movie?.title as string}
                  movieId={movie?.id as number}
                  poster_path={movie?.poster_path as string}
                  backdrop_path={movie?.backdrop_path as string}
                  release_date={movie?.release_date as string}
                  key={movie?.id}
                />
              </div>
            )) || <Skeleton count={10} height={400} />
          )}
        </>
      </div>
    </>
  );
}

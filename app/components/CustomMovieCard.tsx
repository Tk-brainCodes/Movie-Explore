"use client";
import Movies from "../movies/Movies";
import { MovieDataProp } from "../types/movie-type";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import LoadingSpiner from "./LoadingSpinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

export default function CustomMovieCard({
  movies,
  setCurrentPage,
  currentPage,
  title,
  loading,
}: any) {
  return (
    <>
      <h1 className='flex  px-6 py-4 gap-4 items-center text-white text-sm  mt-[2em] font-semibold'>
        {title}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`py-2 px-2 bg-slate-400 rounded-full ${
            currentPage === 1 ? "bg-slate-200" : "bg-slate-400"
          }`}
          disabled={currentPage === 1 ? true : false}
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

      <div className='flex px-6 py-4 snap-mandatory snap-x scroll-pr-6 touch-auto scroll-smooth flex-row overflow-x-auto space-x-8 no-scrollbar h-[400px] w-[100vw]'>
        {loading ? (
          <>
            <div
              role='status'
              className='flex items-center w-[400px] h-[360px] justify-center  max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'
            >
              <svg
                className='w-12 h-12 text-gray-200 dark:text-gray-600'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 384 512'
              >
                <path d='M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z' />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>{" "}
          </>
        ) : (
          <>
            {movies?.length === 0 ? (
              <div className='grid'>
                <h2 className='text-slate-300 text-2xl font-normal block'>
                  <VideocamOffOutlinedIcon className='w-[100px] h-[100px] ml-[40px]' />
                  <br />
                  No {title}
                </h2>
              </div>
            ) : (
              movies?.results?.map((movie: MovieDataProp) => (
                <div key={movie?.id} className='snap-center flex-shrink-0'>
                  <Movies
                    title={movie?.title as string}
                    movieId={movie?.id as number}
                    poster_path={movie?.poster_path as string}
                    backdrop_path={movie?.backdrop_path as string}
                    release_date={movie?.release_date as string}
                    key={movie?.id}
                  />
                </div>
              )) || <Skeleton count={20} height={400} />
            )}
          </>
        )}
      </div>
    </>
  );
}

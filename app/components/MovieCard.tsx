"use client";
import { MovieDataProp } from "../../types/movie-type";
import { Element } from "react-scroll";
import Movies from "../movies/Movies";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieContainer({
  movie,
  text,
  loading,
}: {
  movie: any;
  text?: string;
  loading: boolean;
}) {
  return (
    <>
      <Element
        data-cy={`${
          text === "Trending Movies" ? "trending-movies" : "popular-movies"
        }`}
        name={text === "Trending Movies" ? "trending" : "popular"}
        className='w-auto max-sm:h-auto h-[82vh]'
      >
        <h1 className='text-white  px-6 py-4 text-sm font-semibold'>
          {text ? text : ""}
        </h1>
        <div className='flex px-6 py-4 snap-mandatory snap-x scroll-pr-6 touch-auto flex-row overflow-x-auto space-x-8 scroll-smooth no-scrollbar h-[400px] w-[100vw]'>
          {loading ? (
            <div
              role='status'
              className='flex w-[400px] h-[360px] items-center justify-center  max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'
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
            </div>
          ) : (
            <>
  {movie?.results?.map((movie: MovieDataProp) => (
  <div key={movie?.id} className='snap-center flex-shrink-0'>
    <Movies
      title={movie?.title as string}
      movieId={movie?.id as number}
      poster_path={movie?.poster_path as string}
      backdrop_path={movie?.backdrop_path as string}
      release_date={movie?.release_date as string}
      movieRating={movie?.vote_average as number}
    />
  </div>
)) || <Skeleton count={10} height={400} />}

            </>
          )}
        </div>
      </Element>
    </>
  );
}

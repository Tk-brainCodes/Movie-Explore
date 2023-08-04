"use client";
import { MovieDataProp } from "../../types/movie-type";
import { Element } from "react-scroll";
import Movies from "../movies/Movies";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonLoader from "./SkeletonLoader";

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
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
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

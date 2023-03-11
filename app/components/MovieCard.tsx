"use client";
import { MovieDataProp } from "../types/movie-type";
import Movies from "../movies/Movies";

export default function MovieContainer({
  movie,
  text,
}: {
  movie: any;
  text: string;
}) {
  return (
    <>
      <div className='w-auto'>
        <h1 className='text-black  px-6 py-4 text-sm font-semibold'>{text}</h1>
        <div className='flex px-6 py-4 snap-mandatory snap-x scroll-pr-6 touch-auto flex-row overflow-x-auto space-x-8 scroll-smooth no-scrollbar h-[400px] w-[940px]'>
          {movie?.results?.map((movie: MovieDataProp) => (
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
          ))}
        </div>
      </div>
    </>
  );
}

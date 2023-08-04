"use client";
import Movies from "../movies/Movies";
import { MovieDataProp } from "../../types/movie-type";
import { Element } from "react-scroll";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonLoader from "./SkeletonLoader";
import no_result from "../../public/image/no_image.jpg";
import Image from "next/image";

export default function CustomMovieCard({
  movies,
  setCurrentPage,
  currentPage,
  title,
  loading,
}: any) {
  return (
    <Element
      data-cy={`${
        title === "Showing in theatres" ? "showing-in-theatres" : ""
      }`}
      name='theatres'
      className='w-auto max-sm:h-auto h-[82vh]'
    >
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
      </h1>

      <div className='flex px-6 py-4 snap-mandatory snap-x scroll-pr-6 touch-auto scroll-smooth flex-row overflow-x-auto space-x-8 no-scrollbar h-[400px] w-[100vw]'>
        {loading ? (
          <>
            <SkeletonLoader />
          </>
        ) : (
          <>
            {movies?.results?.length === 0 ? (
              <div className='grid'>
                <h2 className='text-white text-2xl font-normal block'>
                  <Image
                    src={no_result}
                    alt='no recommendations'
                    width={500}
                    height={500}
                    className='w-[350px] height-[250px]'
                  />
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
                    movieRating={movie?.vote_average as number}
                    key={movie?.id}
                  />
                </div>
              )) || <Skeleton count={20} height={400} />
            )}
          </>
        )}
      </div>
    </Element>
  );
}

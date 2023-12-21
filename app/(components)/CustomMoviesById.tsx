"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomMovieCard from "./CustomMovieCard";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingSpiner from "./LoadingSpinner";

const CustomMovieById = ({ movie_id }: { movie_id: number }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const myKey = process.env.NEXT_PUBLIC_API_KEY;
  const similarMovies = useQuery({
    queryKey: ["similarMovies"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${myKey}&language=en-US&page=${currentPage}}`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
     typeof window !== 'undefined' ?  localStorage.setItem("similarMovies", JSON.stringify(similarMovies.data)) : "";
  });

  return (
    <div>
      {similarMovies.isLoading ? (
        <div
          role='status'
          className='flex items-center w-[400px] justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'
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
          <CustomMovieCard
            movies={similarMovies.data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            title={"Recommended for you"}
            loading={similarMovies.isLoading}
          />
        </>
      )}
    </div>
  );
};
export default CustomMovieById;

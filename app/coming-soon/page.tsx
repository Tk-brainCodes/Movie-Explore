"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../components/LoadingSpinner";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Movies from "../movies/Movies";
import AnimatedPage from "@/app/components/Animation";

export default function ComingSoon() {
  const myKey = process.env.API_KEY;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  const comingSoon = useQuery({
    queryKey: ["comingSoon"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${myKey}&language=en-US&page=${currentPage}`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
    localStorage.setItem("comingSoon", JSON.stringify(comingSoon.data));
  }, []);

  return (
    <div>
      <>
        <h1 className='flex  px-6 py-4 gap-4 items-center text-white text-sm  mt-[2em] font-semibold'>
          <button
            onClick={() => router.back()}
            className='w-[30px] h-[30px] px-2 py-2 flex items-center justify-center bg-orange-400 rounded-full cursor-pointer text-white'
          >
            <ArrowBackIosNewOutlinedIcon className='text-xs font-semibold' />
          </button>
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
        <AnimatedPage>
          <div className='flex px-6 py-4 flex-row overflow-x-auto space-x-8 no-scrollbar h-[400px] w-screen'>
            {comingSoon.isLoading ? (
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
              </div>
            ) : (
              <>
                {comingSoon?.data?.results?.map((movie: any) => (
                  <Movies
                    title={movie?.title as string}
                    movieId={movie?.id as number}
                    poster_path={movie?.poster_path as string}
                    backdrop_path={movie?.backdrop_path}
                    release_date={movie?.release_date as string}
                    key={movie?.id}
                  />
                ))}
              </>
            )}
          </div>
        </AnimatedPage>
      </>
    </div>
  );
}

"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Movies from "../movies/Movies";
import AnimatedPage from "@/app/(components)/Animation";
import SkeletonLoader from "../(components)/SkeletonLoader";

export default function ComingSoon() {
  const myKey = process.env.NEXT_PUBLIC_API_KEY;
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
    if (!comingSoon.isFetching && comingSoon.isSuccess) {
      typeof window !== "undefined"
        ? localStorage.setItem("comingSoon", JSON.stringify(comingSoon.data))
        : "";
    }
  }, []);

  return (
    <div>
      <>
        <h1 className='flex  px-6 py-4 gap-4 items-center text-white text-sm  mt-[2em] font-semibold'>
          <button
            onClick={() => router.back()}
            className='w-[30px] h-[30px] px-2 py-2 flex items-center justify-center bg-orange-400 rounded-full cursor-pointer text-white'
          >
            <ArrowBackIosNewOutlinedIcon
              style={{ fontSize: "16px" }}
              className='font-semibold'
            />
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
        </h1>
        <AnimatedPage>
          <div className='flex px-6 py-4 flex-row overflow-x-auto space-x-8 no-scrollbar h-[400px] w-screen'>
            {comingSoon.isLoading ? (
              <SkeletonLoader />
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

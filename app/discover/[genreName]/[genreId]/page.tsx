"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconPointFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MovieCardProps } from "@/types/movie-type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import axios from "axios";
import LoadingSpiner from "@/app/components/LoadingSpinner";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AnimatedPage from "@/app/components/Animation";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const MovieDetails = ({ params }: { params: string }) => {
  const { genreName, genreId }: any = params;
  let getGenreId = genreId === "%5Bmovies%5D" ? 28 : genreId;

  const genreMovies = useQuery({
    queryKey: ["genreMovies"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${getGenreId}`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (genreMovies.isLoading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
    if (!genreMovies.isFetching && genreMovies.isSuccess) {
      typeof window !== "undefined"
        ? localStorage.setItem("genreMovies", JSON.stringify(genreMovies.data))
        : "";
    }
  }, []);

  const imagePath = "https://image.tmdb.org/t/p/original";
  const router = useRouter();

  return (
    <>
      <h1 className='text-white text-sm font-semibold mb-[20px] flex items-center  gap-2'>
        <button
          onClick={() => router.back()}
          className='w-[30px] h-[30px] px-2 py-2 flex items-center justify-center bg-orange-400 rounded-full cursor-pointer text-white'
        >
          <ArrowBackIosNewOutlinedIcon className='text-sm font-semibold' />
        </button>
        Genre <IconPointFilled size={15} color='grey' />
        <p className='text-sm text-gray-500	'>{genreName}</p>
      </h1>
      <AnimatedPage>
        <div className='grid grid-cols-fluid gap-6 items-center'>
          {genreMovies?.isLoading ? (
            <LoadingSpiner text={"Movies"} />
          ) : (
            <>
              {genreMovies?.data?.results?.map((movie: MovieCardProps) => (
                <div className='w-[250px]'>
                  <Link href={`movies/${movie?.id}`}>
                    <Image
                      src={imagePath + movie.poster_path}
                      alt={movie?.title}
                      className={`h-[350px] w-[250px] max-sm:w-[350px] rounded-md  bg-gray-300 ${
                        movie?.poster_path === "" &&
                        "animate-pulse dark:bg-gray-700"
                      } transition ease-in-out cursor-pointer hover:brightness-50`}
                      loading='lazy'
                      width={500}
                      height={500}
                      blurDataURL={imagePath + movie.poster_path}
                      placeholder='blur'
                    />
                  </Link>
                  <h1 className='mt-3 text-slate-600 font-semibold tracking-tight'>
                    {movie.title || <Skeleton />}
                  </h1>
                  <p className='text-sm text-slate-400 font-normal mt-1'>
                    {movie.release_date?.substring(0, 4) || <Skeleton />}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </AnimatedPage>
    </>
  );
};

export default MovieDetails;

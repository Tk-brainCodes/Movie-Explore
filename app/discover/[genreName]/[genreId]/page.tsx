"use client";
import useFetch from "../../../hooks/useFetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieDetails = ({ params }: { params: string }) => {
  const { genreName, genreId }: any = params;
  const { isLoading, apiData, serverError } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}`
  );
  const imagePath = "https://image.tmdb.org/t/p/original";
  const router = useRouter();

  console.log(isLoading, serverError);

  return (
    <>
      <div className='grid grid-cols-4 gap-6'>
        {apiData?.results?.length === 0 ? (
          <Skeleton count={10} height={350} />
        ) : (
          apiData?.results?.map((movie: any) => (
            <div className='w-fit '>
              <Image
                src={imagePath + movie.poster_path}
                alt={movie.title}
                className='h-[350px] w-[250px] rounded-md bg-stone-300 cursor-pointer'
                // loading='lazy'
                width={500}
                height={500}
                blurDataURL={imagePath + movie.poster_path}
                placeholder='blur'
                priority
                onClick={() => router.push(`movies/${movie.id}`)}
              />
              <h1 className='mt-3 text-slate-600 font-semibold tracking-tight'>
                {movie.title || <Skeleton />}
              </h1>
              <p className='text-sm text-slate-400 font-normal mt-1'>
                {movie.release_date || <Skeleton />}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MovieDetails;

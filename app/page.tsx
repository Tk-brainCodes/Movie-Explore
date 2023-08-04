"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieContainer from "./components/MovieCard";
import ShowingInTheater from "./components/CustomMovieCard";
import { useQuery } from "@tanstack/react-query";
import { MovieDataProp } from "@/types/movie-type";
import { useRouter } from "next/navigation";
import 'nprogress/nprogress.css'; 
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";


const Home = () => {
  const myKey = process.env.NEXT_PUBLIC_API_KEY;
  const [currentPage, setCurrentPage] = useState<number>(2);
  const imagePath = "https://image.tmdb.org/t/p/original";
  const router = useRouter();


  const popularMoviesRecent = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () =>
      axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=${myKey}`)
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  const nowShowing = useQuery({
    queryKey: ["nowShowing"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${myKey}&language=en-US&page=${currentPage}`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  const trendingMovies = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () =>
      axios
        .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${myKey}`)
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
  function canCacheData(fetchStatus: any) {
    return !fetchStatus.isFetching && fetchStatus.isSuccess;
  }
  if (
    canCacheData(nowShowing) &&
    canCacheData(popularMoviesRecent) &&
    canCacheData(trendingMovies)
  ) {
    typeof window !== 'undefined' ? localStorage.setItem("nowShowing", JSON.stringify(nowShowing.data)) : "";
    typeof window !== 'undefined' ? localStorage.setItem("popular", JSON.stringify(popularMoviesRecent.data)) : "";
    typeof window !== 'undefined' ? localStorage.setItem("trending", JSON.stringify(trendingMovies.data)) : "";
  }
  }, [nowShowing, popularMoviesRecent, trendingMovies]);

  return (
    <main className=''>
      <div className='width-full mt-[20em] mr-[3em] mb-[30px]'>
        {trendingMovies?.data?.results
          ?.map((movie: MovieDataProp) => (
            <>
              <div className='relative  w-full  h-fit' key={movie?.id}>
                <Image
                  className={`bg-gray-300  ${
                    movie?.poster_path === "" &&
                    "animate-pulse dark:bg-gray-700"
                  }   w-full h-full absolute rounded-lg  cursor-pointer object-cover bg-no-repeat  mx-0 my-0 `}
                  src={imagePath + movie?.poster_path}
                  alt={movie?.title || "Trending Movie"}
                  loading='lazy'
                  width={500}
                  height={500}
                  blurDataURL={imagePath + movie?.poster_path}
                  placeholder='blur'
                  onClick={() => router.push(`movies/${movie?.id}`)}
                />
                <div className='px-4 py-4 rounded-lg bg-gradient-to-b from-transparent to-black bg-opacity-50  absolute h-auto w-full inset-x-0 bottom-0 text-white '>
                  <div className='mt-[3em]'>
                    <div className='w-[50vw]'>
                      <h1 className='font-semibold flex gap-3 text-xl'>
                        {movie?.title}
                        <p className=' text-slate-100 mt-[10px] w-[400px] font-normal text-sm'>
                          {movie?.release_date?.substring(0, 4)}
                        </p>
                      </h1>
                      <p className='text-sm mt-[10px] text-white font-light'>
                        {movie?.overview}
                      </p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <h3 className='flex gap-1 items-center text-sm'>
                        <StarIcon
                          style={{ fontSize: "16px" }}
                          className='text-orange-600'
                        />
                        {movie?.vote_average?.toFixed(1)} rating
                      </h3>
                      <section className='flex gap-2'>
                        <Link
                          href={`movies/${movie?.id}/watch`}
                          title='watch trailer'
                        >
                          <button className='px-2 py-2 text-sm bg-red-600 hover:bg-red-700  rounded-full text-white'>
                            Watch now
                          </button>
                        </Link>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
          .slice(0, 1)}
      </div>

      <MovieContainer
        text='Trending Movies'
        movie={trendingMovies.data}
        loading={trendingMovies.isLoading}
      />
      <ShowingInTheater
        movies={nowShowing.data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        title={"Showing in theatres"}
        loading={nowShowing.isLoading}
      />
      <MovieContainer
        text='Popular Movies'
        movie={popularMoviesRecent.data}
        loading={popularMoviesRecent.isLoading}
      />
    </main>
  );
};

export default Home;

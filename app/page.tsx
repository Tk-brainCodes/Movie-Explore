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

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieContainer from "./components/MovieCard";
import ShowingInTheater from "./components/CustomMovieCard";
import { useQuery } from "@tanstack/react-query";
import Footer from "./components/Footer";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'; 


const Home = () => {
  const myKey = process.env.NEXT_PUBLIC_API_KEY;
  const [currentPage, setCurrentPage] = useState<number>(2);

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
    // if(nowShowing.isLoading && popularMoviesRecent.isLoading && trendingMovies.isLoading){
    //   nprogress.start();
    // } else {
    //   nprogress.done()
    // }
  function canCacheData(fetchStatus: any) {
    return !fetchStatus.isFetching && fetchStatus.isSuccess;
  }
  if (
    canCacheData(nowShowing) &&
    canCacheData(popularMoviesRecent) &&
    canCacheData(trendingMovies)
  ) {
    localStorage.setItem("nowShowing", JSON.stringify(nowShowing.data));
    localStorage.setItem("popular", JSON.stringify(popularMoviesRecent.data));
    localStorage.setItem("trending", JSON.stringify(trendingMovies.data));
  }
  }, [nowShowing, popularMoviesRecent, trendingMovies]);

  return (
       <main>
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
      <Footer/>
    </main>
  );
};

export default Home;

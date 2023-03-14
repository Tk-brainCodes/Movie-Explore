"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieContainer from "./components/MovieCard";
import ShowingInTheater from "./components/CustomMovieCard";

const getData = async (fn: any, url: string, config: any) => {
  try {
    const resp = await axios.get(url, config);
    const data = await resp?.data;
    fn(data);
  } catch (error) {
    console.log(error);
  }
};

interface ApiDataProp<T> {
  page: number;
  results: Array<T>;
}

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [nowShowing, setNowShowing] = useState<ApiDataProp<any[]>>();
  const [currentPage, setCurrentPage] = useState<number>(2);

  const myKey = process.env.API_KEY;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getPopularMovies = getData(
    setPopularMovies,
    `https://api.themoviedb.org/3/movie/popular?api_key=${myKey}`,
    config
  );

  const getTrendingMovies = getData(
    setTrendingMovies,
    `https://api.themoviedb.org/3/trending/all/day?api_key=${myKey}`,
    config
  );

  const getMoviesInTheatres = getData(
    setNowShowing,
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${myKey}&language=en-US&page=${currentPage}`,
    config
  );

  useEffect(() => {
    getPopularMovies;
    getTrendingMovies;
    getMoviesInTheatres;
    localStorage.setItem("nowShowing", JSON.stringify(nowShowing));
    localStorage.setItem("popular", JSON.stringify(popularMovies));
    localStorage.setItem("trending", JSON.stringify(trendingMovies));
  }, [nowShowing, popularMovies, trendingMovies]);

  console.log({ showing: nowShowing });

  return (
    <main>
      <ShowingInTheater
        movies={nowShowing}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        title={"Showing in theatres"}
      />
      <MovieContainer text='Popular Movies' movie={popularMovies} />
      <MovieContainer text='Trending Movies' movie={trendingMovies} />
    </main>
  );
};

export default Home;

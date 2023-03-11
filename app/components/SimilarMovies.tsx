"use client";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import CustomMovieCard from "./CustomMovieCard";

const SimilarMovies = ({ movie_id }: { movie_id: number }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const myKey = process.env.API_KEY;
  const { isLoading, apiData, serverError } = useFetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${myKey}&language=en-US&page=${currentPage}}`
  );
  console.log({ loading: isLoading, error: serverError });

  return (
    <div>
      <CustomMovieCard
        movies={apiData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        title={"Similar movies"}
      />
    </div>
  );
};

export default SimilarMovies;

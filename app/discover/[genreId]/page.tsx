"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const MovieDetails = ({ params }: { params: string }) => {
  const { genreId }: any = params;
  const [getGenreMovies, setGetGenreMovies] = useState<any[]>([]);
  const { isLoading, apiData, serverError } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}`
  );
  const imagePath = "https://image.tmdb.org/t/p/original";

  console.log(isLoading, serverError);

  return (
    <div>
      {apiData?.results?.map((movies: any) => (
        <div>
          <h1>Movie Details</h1>
          <h2 className='text-4xl'>{movies.title}</h2>
          <h2 className='text-lg'>{movies.release_date}</h2>
          <h2>Runtine: {movies.runtime} minutes</h2>
          <h2 className='text-sm bg-green-600 inline-block '>
            {movies.status}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default MovieDetails;

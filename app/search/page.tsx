"use client";
import { useState, useEffect } from "react";
import { MovieCardProps } from "../../types/movie-type";
import ResultCard from "../components/ResultCard"; 
import axios from "axios";
import AnimatedPage from "@/app/components/Animation";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const myKey = process.env.NEXT_PUBLIC_API_KEY;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuery(e.target.value);
 
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
      )
      .then((res) => res.data)
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };

  useEffect(() => {
    typeof window !== "undefined"
      ? localStorage.setItem("results", JSON.stringify(results))
      : "";
    typeof window !== "undefined"
      ? localStorage.setItem("query", JSON.stringify(query))
      : "";
  }, [query, results]);

  return (
    <div className='px-6 py-6'>
      <input
        type='text'
        placeholder='Search for a movie'
        value={query}
        onChange={onChange}
        className='bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer'
      />

      <AnimatedPage>
        {results.length > 0 ? (
          <div>
            <h1 className='text-white flex gap-4 mt-4 font-light'>
              Showing
              <span className='font-semibold text-orange-400'>
                {results?.length}
              </span>
              results
            </h1>
            <div className='grid grid-cols-fluid gap-3 items-center max-sm:flex max-sm:justify-center max-sm:flex-col'>
              {results.map((movie: MovieCardProps) => (
                <div key={movie?.id}>
                  <ResultCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='block mt-[20px]'>
            <h1 className='text-white font-light  text-sm'>
              Start search
            </h1>
          </div>
        )}
      </AnimatedPage>
    </div>
  );
}

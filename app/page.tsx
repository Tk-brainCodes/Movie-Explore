import axios from "axios";
import Movies from "./movies/Movies";

interface MovieDataProp {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: Array<string>;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  id?: number;
}

export default async function Home() {
   const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const popularMovies = await res.data;


  return (
    <main>
      <h1 className='text-black font-bold text-lg mb-1'>POPULAR MOVIES</h1>
      <div className='grid gap-16 grid-cols-fluid'>
        {popularMovies?.results?.map((movie: MovieDataProp) => (
          <Movies
            title={movie?.title as string}
            movieId={movie?.id as number}
            poster_path={movie?.poster_path as string}
            release_date={movie?.release_date as string}
            key={movie?.id}
          />
        ))}
      </div>
    </main>
  );
}



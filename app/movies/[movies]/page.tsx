import axios from "axios";

export default async function MovieDetails({ params }: { params: string }) {
  const { movies }: any = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movies}?api_key=${process.env.API_KEY}`
  );

  const movie = res.data;

  // https://www.imdb.com/title/${imdb_id}/?ref_=fn_al_tt_2

  return (
    <div>
      <h1>Movie Details</h1>
      <h2 className='text-4xl'>{movie.title}</h2>
      <h2 className='text-lg'>{movie.release_date}</h2>
      <h2>Runtine: {movie.runtime} minutes</h2>
      <h2 className='text-sm bg-green-600 inline-block '>{movie.status}</h2>
    </div>
  );
}

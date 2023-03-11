import axios from "axios";
import Image from "next/image";
import {
  IconPlayerPlay,
  IconPointFilled,
  IconChevronLeft,
  IconWorldWww,
} from "@tabler/icons-react";
import { Anchor } from "@/app/components/Anchor";
import { useRouter } from "next/navigation";
import SimilarMovies from "@/app/components/SimilarMovies";
import imdb_logo from "../../../public/image/imdb_logo.png";
import netflix_logo from "../../../public/image/netflix_logo.png";
import no_image from "../../../public/image/no_image.jpg";

export default async function MovieDetails({ params }: { params: string }) {
  const { movies }: any = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movies}?api_key=${process.env.API_KEY}`
  );
  const movie = await res.data;
  // const router = useRouter();
  const movieRating = movie.vote_average as number;
  const movieRatingToOneDecimalPlace = movieRating.toFixed(1);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className='w-fit'>
      <div className='px-6 flex gap-5 md:flex-wrap lg:flex-nowrap'>
        <Image
          src={imagePath + movie.poster_path}
          alt={movie.title}
          className='h-[420px] w-[420px] rounded-md'
          // loading='lazy'
          width={500}
          height={500}
          blurDataURL={imagePath + movie.poster_path}
          placeholder='blur'
          priority
        />
        <div className='  px-4 py-4  w-[620px]'>
          <div className='flex text-center justify-between '>
            <div className='flex gap-5'>
              <h2 className='text-xl items-center text-justify font-semibold text-slate-600'>
                {movie.title}
              </h2>
              <span className='px-2 flex h-fit text-justify justify-center py-1 text-xs bg-yellow-500 rounded text-white'>
                {movie.status as number}
              </span>
            </div>
            <h2 className='flex  flex-nowrap gap-1 font-normal'>
              <span className='text-cyan-600'>
                {movieRatingToOneDecimalPlace}
              </span>
              / 10
            </h2>
          </div>
          <div className='flex text-center gap-2 flex-wrap text-slate-400 font-normal mt-2'>
            {movie.adult === false && <h2>PG</h2>}{" "}
            <IconPointFilled size={10} color='grey' className='mt-[6px]' />
            <h2>{movie.runtime} min</h2>
            <IconPointFilled size={10} color='grey' className='mt-[6px]' />
            {movie?.genres.map((genre: any, index: any) => (
              <h2 key={index}>{genre.name as string}</h2>
            ))}
          </div>
          <h3 className='text-slate-600 text-justify font-medium text-base mt-4 leading-6'>
            {movie.overview as string}
          </h3>
          <div className='mt-3 grid grid-row-3 gap-2 divide-x'>
            <h2 className='flex gap-2'>
              <span className='text-slate-800 font-bold'>Release Date : </span>
              <span className='text-slate-400 font-normal'>
                {movie.release_date}
              </span>
            </h2>
            <h2 className='flex gap-2'>
              <span className='text-slate-800 font-bold'>Popularity :</span>{" "}
              <span className='text-slate-400 font-normal'>
                {movie.popularity}
              </span>
            </h2>
            {movie.budget === 0 ? (
              ""
            ) : (
              <h2 className='flex gap-2 '>
                <span className='text-slate-800 font-bold'>Budget :</span>{" "}
                <span className='text-slate-400 font-normal'>
                  {formatter.format(movie.budget)}
                </span>
              </h2>
            )}
            {movie.revenue == 0 ? (
              ""
            ) : (
              <h2 className='flex gap-2'>
                <span className='text-slate-800 font-bold'>Box Office :</span>{" "}
                <span className='text-slate-400 font-normal'>
                  {formatter.format(movie?.revenue)}
                </span>
              </h2>
            )}
            <h2 className='flex gap-2'>
              <span className='text-slate-800 font-bold'>Language :</span>
              <span className='text-slate-400 font-normal'>
                {movie.original_language}
              </span>
            </h2>
          </div>
          <div className='flex gap-3 mt-4 items-center justify-start'>
            <button
              title='watch trailer'
              className='px-4 py-4  rounded-full bg-green-500 transition ease-in-out hover:scale-110'
            >
              <IconPlayerPlay size={20} color='white' />
            </button>
            <Anchor
              href={`https://www.imdb.com/title/${movie.imdb_id}/?ref_=fn_al_tt_2`}
              target='_blank'
            >
              <Image
                className='w-[50px] h-[50px] rounded-full transition ease-in-out hover:scale-110 cursor-pointer'
                src={imdb_logo}
                alt='imdb_logo'
                title='watch on imdb'
              />
            </Anchor>
            <Anchor
              href={`https://www.netflix.com/search?q=${movie.title}`}
              target='_blank'
            >
              <Image
                className='w-[50px] h-[50px] rounded-full transition ease-in-out hover:scale-110 cursor-pointer'
                src={netflix_logo}
                alt='netflix_logo'
                title='watch on netflix'
              />
            </Anchor>
            {movie?.homepage && (
              <Anchor href={`${movie?.homepage}`} target='_blank'>
                <button
                  title='view site'
                  className='px-4 py-4  rounded-full bg-slate-600 transition ease-in-out hover:scale-110'
                >
                  <IconWorldWww size={20} color='white' />
                </button>
              </Anchor>
            )}
          </div>
        </div>
      </div>
      <div className='w-fit px-6 py-4'>
        <h1 className='items-center mb-6 text-black text-sm  mt-[2em] font-semibold'>
          Production Compaines
        </h1>
        <div className='flex gap-7 flex-wrap'>
          {movie?.production_companies.map((company: any) => (
            <div className='flex gap-4'>
              <Image
                src={
                  company.logo_path === null
                    ? no_image
                    : imagePath + company?.logo_path
                }
                alt={movie.title}
                width={500}
                height={500}
                key={company.id}
                className='w-[100px] h-[100px] bg-stone-300 rounded-full border'
              />
              <div className='block mt-4'>
                <h2 className='text-sm text-slate-700 font-semibold'>
                  {company.name}
                </h2>
                <h3 className='mt-2 flex gap-2 text-slate-400 font-normal'>
                  <span> {company.origin_country && "Country:"}</span>
                  <span> {company.origin_country}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-fit'>
        <SimilarMovies movie_id={movie.id} />
      </div>
    </div>
  );
}

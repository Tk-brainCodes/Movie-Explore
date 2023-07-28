import axios from "axios";
import Image from "next/image";
import {
  IconPlayerPlayFilled,
  IconPointFilled,
  IconWorldWww,
  IconStarFilled,
} from "@tabler/icons-react";
import { Anchor } from "@/app/components/Anchor";
import { CountryProp } from "@/app/types/movie-type";
import CustomMoviesById from "@/app/components/CustomMoviesById";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import imdb_logo from "../../../public/image/imdb_logo.png";
import netflix_logo from "../../../public/image/netflix_logo.png";
import no_image from "../../../public/image/no_image.jpg";
import Link from "next/link";

export default async function MovieDetails({ params }: { params: string }) {
  const { movies }: any = params;
  let movieId = movies === "%5Bmovies%5D" ? 447277 : movies;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const movie = await res.data;
  const movieRating = movie.vote_average as number;
  const movieRatingToOneDecimalPlace = movieRating.toFixed(1);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className='w-fit'>
      <div className='grid grid-cols-fluid lg:px-6 lg:flex gap-6 md:block'>
        <div className='w-fit h-fit'>
          <Image
            src={imagePath + movie.poster_path}
            alt={movie.title}
            className='h-[420px] w-[300px] mb-[10px] max-sm:w-[420px]'
            // loading='lazy'
            width={500}
            height={500}
            blurDataURL={imagePath + movie.poster_path}
            placeholder='blur'
            priority
          />
          <div className='flex gap-2'>
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
            {(movie?.homepage as string).includes("netflix.com") ? (
              <Anchor href={`${movie?.homepage}`} target='_blank'>
                <Image
                  className='w-[50px] h-[50px] rounded-full transition ease-in-out hover:scale-110 cursor-pointer'
                  src={netflix_logo}
                  alt='netflix_logo'
                  title='watch on netflix'
                />
              </Anchor>
            ) : <Anchor href={`${movie?.homepage}`} target='_blank'>
                <button
                  title='view site'
                  className='px-4 py-4  rounded-full bg-slate-600 transition ease-in-out hover:scale-110'
                >
                  <IconWorldWww size={20} color='white' />
                </button>
              </Anchor> ? (
              movie?.homepage === ""
            ) : (
              ""
            )}
          </div>
        </div>
        <div className='px-2 lg:w-[750px] w-fit'>
          <div className='block lg:flex md:flex md:flex-wrap text-center justify-between '>
            <div className='flex gap-5'>
              <h2 className='tracking-tighter text-xl flex items-center text-justify font-semibold text-white'>
                {movie.title || <Skeleton />}
              </h2>
              <span className='px-2 flex h-fit text-justify justify-center py-1 text-xs bg-green-600 rounded text-white'>
                {(movie.status as number) || <Skeleton />}
              </span>
            </div>
            <h2 className='flex text-white flex-nowrap gap-1 font-normal'>
              <span className='text-cyan-600 flex gap-1'>
                <IconStarFilled size={20} className='text-orange-500' />
                {movieRatingToOneDecimalPlace || <Skeleton />}
              </span>
              / 10
            </h2>
          </div>
          <div className='flex text-center gap-2 flex-wrap text-sm text-slate-400 font-normal mt-2'>
            {(movie.adult === false && <h2>PG</h2>) || <Skeleton />}{" "}
            <IconPointFilled size={10} color='grey' className='mt-[6px]' />
            <h2>{movie.runtime || <Skeleton />} min</h2>
            <IconPointFilled size={10} color='grey' className='mt-[6px]' />
            {movie?.genres.map((genre: any, index: any) => (
              <h2 key={index}>{(genre.name as string) || <Skeleton />}</h2>
            ))}
          </div>
          <h3 className='text-white text-justify font-medium text-sm mt-4 leading-6'>
            {(movie.overview as string) || <Skeleton />}
          </h3>
          <div className='mt-3 grid grid-row-3 gap-2'>
            <h2 className='flex gap-2'>
              <span className='text-slate-600 font-bold'>Release Date : </span>
              <span className='text-slate-400 font-normal'>
                {movie.release_date.substring(0, 4) || <Skeleton />}
              </span>
            </h2>
            <h2 className='flex gap-2'>
              <span className='text-slate-600 font-bold'>Popularity :</span>{" "}
              <span className='text-slate-400 font-normal'>
                {movie.popularity || <Skeleton />}
              </span>
            </h2>
            {movie.budget === 0 ? (
              ""
            ) : (
              <h2 className='flex gap-2 '>
                <span className='text-slate-600 font-bold'>Budget :</span>{" "}
                <span className='text-slate-400 font-normal'>
                  {formatter.format(movie.budget) || <Skeleton />}
                </span>
              </h2>
            )}
            {movie.revenue == 0 ? (
              ""
            ) : (
              <h2 className='flex gap-2'>
                <span className='text-slate-600 font-bold'>Box Office :</span>{" "}
                <span className='text-slate-400 font-normal'>
                  {formatter.format(movie?.revenue) || <Skeleton />}
                </span>
              </h2>
            )}
            <h2 className='flex gap-2'>
              <span className='text-slate-600 font-bold'>Language :</span>
              <span className='text-slate-400 font-normal'>
                {movie.original_language || <Skeleton />}
              </span>
            </h2>
            <Link href={`movies/${movie?.id}/reviews`}>
              <button className='p-1 w-[100px] flex h-fit text-justify justify-center text-xs bg-slate-500 rounded-full text-white'>
                reviews
              </button>
            </Link>
          </div>
          <div className='flex gap-3 mt-6 items-center justify-start'>
            <Link
              href={`movies/${movie?.id}/watch`}
              title='watch trailer'
              className='px-2 py-2 font-semibold text-sm  flex items-center justify-around gap-3 bg-orange-500 transition ease-in-out hover:bg-orange-600 rounded-md'
            >
              <IconPlayerPlayFilled size={20} /> Play Trailer(s)
            </Link>
          </div>
        </div>
      </div>
      <div className='w-fit px-6'>
        <h1 className='items-center mb-6 text-white text-sm  mt-[2em] font-semibold'>
          Production Compaines
        </h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
          {movie?.production_companies.map(
            (company: CountryProp, key: number) => (
              <div key={key} className='flex gap-4'>
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
                    {company.name || <Skeleton />}
                  </h2>
                  <h3 className='mt-2 flex gap-2 text-slate-400 font-normal'>
                    <span> {company.origin_country && "Country:"}</span>
                    <span> {company.origin_country || <Skeleton />}</span>
                  </h3>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className='w-fit'>
        <CustomMoviesById movie_id={movie.id} />
      </div>
    </div>
  );
}

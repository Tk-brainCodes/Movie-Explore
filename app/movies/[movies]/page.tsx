import axios from "axios";
import Image from "next/image";
import {
  IconPlayerPlayFilled,
  IconWorldWww,
  IconStarFilled,
  IconLink,
  IconPointFilled,
} from "@tabler/icons-react";
import { Watch } from "@/app/(assets)";
import { Anchor } from "@/app/components/Anchor";
import { CountryProp } from "@/types/movie-type";
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

  const cast = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const movie = await res.data;
  const movieCast = await cast.data;
  const movieRating = movie.vote_average as number;
  const movieRatingToOneDecimalPlace = movieRating.toFixed(1);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div style={{backgroundImage: `url(${imagePath + movie?.poster_path})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", position: "relative", 
  overflow: "hidden",}} className='w-[100vw] -ml-[2em]'>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>

      <div className='relative h-auto  w-[100vw]  duration-300'>
        <div className='px-6 py-6 h-fit w-full  block lg:flex justify-center items-center max-md:flex-wrap max-sm:flex-wrap inset-x-0 bottom-0 text-white '>
          <div className='details lg:w-[50vw] max-sm:w-full max-md:w-full px-4 py-4'>
            <h1 className='text-2xl font-semibold flex gap-3 items-center'>
              {movie?.title}
              <span className='px-2 flex h-fit text-justify justify-center py-1 text-xs bg-green-600 rounded text-white'>
                {(movie.status as number) || <Skeleton />}
              </span>
            </h1>
            <p className='text-light mt-[10px] text-white font-sm'>
              {movie?.release_date.substring(0, 4)}
            </p>
            <div className='text-white mt-[10px] flex items-center gap-2'>
              <span className='text-xs text-white font-semibold'>
                {movieRatingToOneDecimalPlace} rating
              </span>
              <IconPointFilled size={10} />
              <Link
                href={`movies/${movie?.id}/reviews`}
                title='revies'
                className='gap-1'
              >
                <span className='text-xs flex hover:underline text-white font-semibold'>
                  reviews <IconLink size={15} />
                </span>
              </Link>
            </div>
            <div className='flex mt-[20px] gap-4'>
              <Link href={`movies/${movie?.id}`}>
                <div className='px-4 py-1.5 w-auto bg-rose-700 cursor-pointer hover:bg-rose-600 rounded-md justify-start items-center gap-2 inline-flex'>
                  <Image
                    src={Watch}
                    width={50}
                    height={50}
                    alt='watch icon'
                    className='w-5 h-5 relative'
                  />
                  <div className='text-white text-xs font-bold uppercase leading-normal'>
                    Watch trailer
                  </div>
                </div>
              </Link>
              <Anchor
                href={`https://www.imdb.com/title/${movie.imdb_id}/?ref_=fn_al_tt_2`}
                target='_blank'
              >
                <Image
                  className='w-[40px] h-[40px] rounded-full transition ease-in-out hover:scale-110 cursor-pointer'
                  src={imdb_logo}
                  alt='imdb_logo'
                  title='watch on imdb'
                />
              </Anchor>
              {(movie?.homepage as string).includes("netflix.com") ? (
                <Anchor href={`${movie?.homepage}`} target='_blank'>
                  <Image
                    className='w-[40px] h-[40px] rounded-full transition ease-in-out hover:scale-110 cursor-pointer'
                    src={netflix_logo}
                    alt='netflix_logo'
                    title='watch on netflix'
                  />
                </Anchor>
              ) : <Anchor href={`${movie?.homepage}`} target='_blank'>
                  <button
                    title='view site'
                    className='px-4 py-4 bg-none border-white rounded-full bg-slate-600 transition ease-in-out hover:scale-110'
                  >
                    <IconWorldWww size={20} color='white' />
                  </button>
                </Anchor> ? (
                movie?.homepage === ""
              ) : (
                ""
              )}
            </div>
            <h3 className='text-white w-full text-justify font-light text-xs mt-[20px] leading-6'>
              {movie?.overview}
            </h3>

            <div className='details  mt-[30px]'>
              <h3 className='text-white text-xl font-semibold'>Details</h3>

              <div className='genres max-md:flex-wrap mt-[20px] max-sm:flex-wrap border-b-2 border-slate-800 flex items-center justify-between'>
                <span className='text-xs font-semibold mb-[10px]'>Genres</span>
                <span className='flex gap-3'>
                  {movie?.genres.map((genre: any, index: any) => (
                    <h2
                      className='text-xs font-normal mb-[20px] flex items-center justify-center px-2 bg-slate-400 rounded-full w-auto h-[20px]'
                      key={index}
                    >
                      {(genre.name as string) || <Skeleton />}
                    </h2>
                  ))}
                </span>
              </div>

              <div className=' mt-[10px] max-md:flex-wrap max-sm:flex-wrap px-2 py-2 border-b-2 border-slate-800 flex items-center justify-between'>
                <span className='text-xs font-semibold mb-[10px]'>Runtime</span>
                <span className='font-normal text-xs mb-[10px]'>
                  {movie?.runtime} min
                </span>
              </div>

               <div className=' mt-[10px] max-md:flex-wrap max-sm:flex-wrap px-2 py-2 border-b-2 border-slate-800 flex items-center justify-between'>
                <span className='text-xs font-semibold mb-[10px]'>Popularity</span>
                <span className='font-normal text-xs mb-[10px]'>
                {movie.popularity || <Skeleton />}
                </span>
              </div>

                <div className=' mt-[10px] max-md:flex-wrap max-sm:flex-wrap px-2 py-2 border-b-2 border-slate-800 flex items-center justify-between'>
                <span className='text-xs font-semibold mb-[10px]'>Budget</span>
                <span className='font-normal text-xs mb-[10px]'>
                  {formatter.format(movie.budget) || <Skeleton />}
                </span>
              </div>

               <div className=' mt-[10px] max-md:flex-wrap max-sm:flex-wrap px-2 py-2 border-b-2 border-slate-800 flex items-center justify-between'>
                <span className='text-xs font-semibold mb-[10px]'>Box Office</span>
                <span className='font-normal text-xs mb-[10px]'>
                  {formatter.format(movie?.revenue) || <Skeleton />}
                </span>
              </div>
            </div>
            
          </div>

          <div className='cast w-fi px-4 py-4'>
            <h3 className='text-white mb-[20px] text-xl font-semibold'>
              Cast & Crew
            </h3>
            {movieCast.cast
              .map((cast: any) => (
                <div className='flex flex-row gap-4'>
                  <Image
                    className='w-[40px] h-[40px] rounded-full mb-[10px]'
                    src={imagePath + cast?.profile_path}
                    alt={movie?.title || "Movie"}
                    loading='lazy'
                    width={500}
                    height={500}
                    blurDataURL={imagePath + cast?.profile_path}
                    placeholder='blur'
                  />
                  <span className='block'>
                    <p className='text-sm font-bold text-white'>{cast?.name}</p>
                    <p className='font-light text-white text-xs	'>
                      as {cast?.character}
                    </p>
                  </span>
                </div>
              ))
              .slice(0, 4)}
          </div>
        </div>
      </div>
      <div className='w-fit mt-[20px]'>
        <CustomMoviesById movie_id={movie.id} />
      </div>
    </div>
  );
}

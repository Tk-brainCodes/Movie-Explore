"use client";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MovieCardProps } from "../../types/movie-type";
import StarIcon from "@mui/icons-material/Star";

export default function ResultCard({ movie }: { movie: MovieCardProps }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className='w-fit mt-[20px]'>
      <div className='w-[250px]'>
        <Link href={`movies/${movie?.id}`}>
          <Image
            src={imagePath + movie.poster_path}
            alt={movie?.title}
            className='h-[350px] w-[250px] max-sm:w-[350px] bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
            loading='lazy'
            width={500}
            height={500}
            blurDataURL={imagePath + movie.poster_path}
            placeholder='blur'
          />
        </Link>
        <h1 className='mt-3 text-sm text-white font-semibold tracking-tight'>
          {movie?.title}
        </h1>
        <p className='text-sm flex gap-3 text-slate-400 font-normal mt-1'>
          <span>
            <StarIcon
              style={{ fontSize: "16px" }}
              className='text-orange-600'
            />{" "}
            {movie?.vote_average?.toFixed(1)}
          </span>
          <span>|</span>
          <span> {movie?.release_date?.substring(0, 4) || <Skeleton />}</span>
        </p>
      </div>
    </div>
  );
}

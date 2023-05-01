"use client";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/Globalcontext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
import Image from "next/image";

export default function RecentVisit() {
  const [myRecentMovies, setRecentMovies] = useState([]);
  const { recentMovies } = useContext(GlobalContext);
  const imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    setRecentMovies(recentMovies);
  }, [myRecentMovies, recentMovies]);

  return (
    <div className='w-fit'>
      <h1 className='font-semibold mb-4'>Recent Movie Visits</h1>
      <div className='grid grid-cols-4 gap-6'>
        {myRecentMovies.map((movie: any) => (
          <div className='w-fit '>
            <Link href={`movies/${movie.id}`}>
              <Image
                src={imagePath + movie.poster_path}
                alt={`${movie.title}`}
                className='h-[350px] w-[250px] rounded-md bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
                loading='lazy'
                width={500}
                height={500}
                blurDataURL={imagePath + movie.poster_path}
                placeholder='blur'
              />
            </Link>
            <div className='flex gap-2 relative -mt-[20em] float-right px-2'>
              <button
                title='bookmark movie'
                className={`text-xs bg-white text-slate-500 px-3 py-3 hover:scale-110 transition ease-in-out rounded-full`}
                // onClick={() => handleRemoveBookmarked(movie.id)}
              >
                <DeleteOutlineIcon className='text-green-500' />
              </button>
            </div>
            {/* <h1 className='mt-3 text-slate-600 font-semibold tracking-tight'>
              {movie.title}
            </h1> */}
          </div>
        ))}
      </div>
    </div>
  );
}

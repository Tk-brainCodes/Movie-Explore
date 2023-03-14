import Link from "next/link";
import { useRouter } from "next/navigation";
import { MovieCardProps } from "../types/movie-type";
import { IconBookmark, IconPlayerPlay } from "@tabler/icons-react";
import Image from "next/image";

export default function Movies({
  title,
  movieId,
  poster_path,
  release_date,
  backdrop_path,
}: MovieCardProps) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const router = useRouter();

  return (
    <div className=' h-1/3'>
      <>
        <Image
          className=' bg-stone-300 transition ease-in-out hover:translate-y-1 hover:scale-110 duration-300 bg-no-repeat w-[400px] h-[350px] rounded-lg mx-0 my-0 cursor-pointer'
          src={imagePath + poster_path}
          alt={title}
          // loading='lazy'
          width={500}
          height={500}
          blurDataURL={imagePath + poster_path}
          placeholder='blur'
          priority
          // style={{ backgroundImage: `url(${imagePath + poster_path})` }}
          onClick={() => router.push(`movies/${movieId}`)}
        />

        <div className='py-2 px-2 -mt-[3.5em] flex relative  items-center justify-between h-auto w-[400px]  bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 text-white'>
          <div className='block'>
            <p className='font-semibold'> {title}</p>
            <p className='text-xs text-slate-100'> {release_date}</p>
          </div>
          <div className='flex gap-2'>
            <button
              title='bookmark movie'
              className='text-xs bg-slate-500 text-white px-2 py-2 hover:scale-110 transition ease-in-out rounded-full'
            >
              <IconBookmark size={15} color='white' />
            </button>
            <button
              title='watch trailer'
              className='text-xs bg-slate-500 text-white px-2 py-2 hover:scale-110 transition ease-in-out rounded-full'
            >
              <IconPlayerPlay size={15} color='white' />
            </button>
          </div>
        </div>
      </>
    </div>
  );
}

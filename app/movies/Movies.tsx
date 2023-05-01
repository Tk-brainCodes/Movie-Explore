"use client";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { MovieCardProps } from "../types/movie-type";
import { usePathname } from "next/navigation";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Image from "next/image";
import AnimatedPage from "@/app/components/Animation";

const Movies = ({
  title,
  movieId,
  poster_path,
  release_date,
  backdrop_path,
}: MovieCardProps) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const pathnanme = usePathname();

  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    addRecentMovieVisit,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    addMovieToBookmarked,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    removeMovieFromBookmarked,
    bookmarked,
  } = useContext(GlobalContext);
  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setBookmarked] = useState<boolean>(() => {
    const doesMovieExist = savedBookmarks.find(
      (movie: any) => movie?.id === movieId
    );
    return !!doesMovieExist;
  });

  const movieData = {
    title: title,
    id: movieId,
    poster_path: poster_path,
    date: release_date,
    background: backdrop_path,
  };

  const handleAddBookmarked = async () => {
    if (isBookmarked) {
      removeMovieFromBookmarked(movieId);
      setBookmarked((prev) => !prev);
    } else {
      addMovieToBookmarked(movieData);
      setBookmarked((prev) => !prev);
    }
  };

  const handleSeenMovie = () => {
    addRecentMovieVisit(movieData);
  };

  useEffect(() => {
    setSavedBookmarks(bookmarked);
  }, [bookmarked]);

  return (
    <div className=' h-1/3'>
      <AnimatedPage>
        <>
          <Link href={`movies/${movieId}`}>
            <Image
              className={`bg-gray-300  ${poster_path === "" && "animate-pulse dark:bg-gray-700"} transition ease-in-out hover:brightness-50 hover:translate-y-1 hover:scale-110 duration-300 bg-no-repeat w-[350px] h-[350px] rounded-lg mx-0 my-0 cursor-pointer`}
              src={imagePath + poster_path}
              alt={title}
              loading='lazy'
              width={500}
              height={500}
              blurDataURL={imagePath + poster_path}
              placeholder='blur'
              onClick={handleSeenMovie}
            />
          </Link>
          <div className='flex gap-2 relative -mt-[20em] float-right px-2'>
            <button
              title='bookmark movie'
              className={`text-xs bg-white text-slate-500 px-3 py-3 hover:scale-110 transition ease-in-out rounded-full`}
              onClick={handleAddBookmarked}
            >
              {isBookmarked ? (
                <BookmarkAddedIcon className='text-green-500' />
              ) : (
                <BookmarkBorderOutlinedIcon />
              )}
            </button>
            <Link
              href={`movies/${movieId}/watch`}
              title='watch trailer'
              className='text-xs bg-white text-slate-500 px-3 py-3 hover:scale-110 transition ease-in-out rounded-full'
            >
              <PlayArrowOutlinedIcon />
            </Link>
          </div>
          <div className=' ml-1 -mt-[2.5em] flex relative  items-center justify-between h-auto w-[340px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-white px-2 py-2 rounded-lg'>
            <p className='font-normal text-xs'> {title}</p>
            <p className=' text-slate-100 text-sm'>
              {" "}
              {release_date?.substring(0, 4)}
            </p>
          </div>
        </>
      </AnimatedPage>
    </div>
  );
};

export default Movies;

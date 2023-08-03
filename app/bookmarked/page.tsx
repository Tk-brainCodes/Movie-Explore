"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "../../context/Globalcontext";
import Image from "next/image";
import Link from "next/link";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LoadingSpiner from "../components/LoadingSpinner";
import StarIcon from "@mui/icons-material/Star";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Bookmarked = () => {
  const [myBookmarked, setBookmarked] = useState([]);
  const [localStorageBookMarks, setLocalStorageBookmarks] = useState([]);
  const imagePath = "https://image.tmdb.org/t/p/original";



  // @ts-ignore
  const {
    bookmarked,
    // @ts-ignore
    removeMovieFromBookmarked,
    // @ts-ignore
    getBookmarksFromFirebaseDB,
    // @ts-ignore
    loading,
    // @ts-ignore
  } = useContext(GlobalContext);

  const prevLocalStorageBookmarks = useRef(localStorageBookMarks);

  //TODO: Check if item exists in db, then map through the items

  useEffect(() => {
    getBookmarksFromFirebaseDB();
    const storedItem =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("myBookmarks") || "[]")
        : "";
    if (prevLocalStorageBookmarks.current !== storedItem) {
      setLocalStorageBookmarks(storedItem);
    }
    prevLocalStorageBookmarks.current = storedItem;
  }, [localStorageBookMarks]);

  const handleRemoveBookmarks = (id: number) => {
    removeMovieFromBookmarked(id);
  };

 
  useEffect(() => {
    setBookmarked(bookmarked);
  }, [bookmarked]);

 

  return (
    <div className='px-6 py-6 w-fit'>
      <h1 className='font-semibold mb-4 text-white'>My Bookmarks</h1>
      <div>
        {loading ? (
          <LoadingSpiner text={"bookmarks"} />
        ) : (
          <div className='grid grid-cols-fluid gap-6 items-center'>
            {myBookmarked?.length === 0 ? (
              <div>
                <h3 className='text-white text-sm'>No Bookmarks</h3>
              </div>
            ) : (
              <div className='grid grid-cols-fluid gap-3 items-center'>
                {localStorageBookMarks?.map((movie: any) => (
                  <div className='w-[250px] '>
                    <Link href={`movies/${movie?.id}`}>
                      <Image
                        src={imagePath + movie?.poster_path}
                        alt={`${movie?.title || ""}`}
                        className='h-[350px] w-[250px] bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
                        loading='lazy'
                        width={500}
                        height={500}
                        blurDataURL={imagePath + movie?.poster_path}
                        placeholder='blur'
                      />
                    </Link>
                    <div className='flex gap-2 relative -mt-[20em] float-right px-2'>
                      <button
                        title='bookmark movie'
                        className={`text-xs bg-white text-slate-500 px-3 py-3 hover:scale-110 transition ease-in-out rounded-full`}
                        onClick={() => handleRemoveBookmarks(movie?.id)}
                      >
                        <BookmarkAddedIcon className='text-green-500' />
                      </button>
                    </div>
                    <h1 className='mt-3 text-sm text-white font-semibold tracking-tight'>
                      {movie?.title}
                    </h1>
                    <p className='text-sm flex gap-3 text-slate-400 font-normal mt-1'>
                      <span>
                        <StarIcon
                          style={{ fontSize: "16px" }}
                          className='text-orange-600'
                        />
                        {movie?.vote_average?.toFixed(1)}
                      </span>
                      <span>|</span>
                      <span>
                        {movie?.release_date?.substring(0, 4) || <Skeleton />}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarked;

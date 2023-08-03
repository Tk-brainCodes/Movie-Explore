"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "../../context/Globalcontext";
import Image from "next/image";
import Link from "next/link";
import LoadingSpiner from "../components/LoadingSpinner";
import DeleteIcon from '@mui/icons-material/Delete';
import "react-loading-skeleton/dist/skeleton.css";
import EmptyBookmark from "../components/EmptyBookmark";

const Bookmarked = () => {
  const [myBookmarked, setBookmarked] = useState([]);
  const [localStorageBookMarks, setLocalStorageBookmarks] = useState([]);
  const imagePath = "https://image.tmdb.org/t/p/original";



  const {
    // @ts-ignore
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
    <div className='px-6 py-6 w-[100vw]'>
      <h1 className='font-semibold mb-[20px] text-white'>My Bookmarks</h1>
      {loading ? (
        <LoadingSpiner text={"bookmarks"} />
      ) : (
        <div>
          {localStorageBookMarks?.length === 0 ? (
              <EmptyBookmark/>
          ) : (
            <div className="grid grid-cols-fluid gap-3 items-center">
              {localStorageBookMarks?.map((movie: any) => (
                <div className='w-[250px]'>
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
                      <DeleteIcon className='text-red-500' />
                    </button>
                  </div>
                  <h1 className='mt-3 text-sm text-white font-semibold tracking-tight'>
                    {movie?.title}
                  </h1>
                  <p className='text-slate-400 font-normal mt-1'>
                    <span>{movie?.date?.substring(0, 4)}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarked;

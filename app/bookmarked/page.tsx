"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "../../context/Globalcontext";
import Image from "next/image";
import Link from "next/link";
import CustomModal from "../components/CustomModal";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LoadingSpiner from "../components/LoadingSpinner";

const Bookmarked = () => {
  const [myBookmarked, setBookmarked] = useState([]);
  const [localStorageBookMarks, setLocalStorageBookmarks] = useState([]);
  const imagePath = "https://image.tmdb.org/t/p/original";

    const [isModalOpen, setModalOpen] = useState<boolean>(false);


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
    user
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

   if(!user) {
    setModalOpen(true);
   } else {
    setModalOpen(false)
   }

  useEffect(() => {
    setBookmarked(bookmarked);
  }, [bookmarked, user]);

   const handleCloseModal = () => {
     setModalOpen(false);
   };

  return (
    <div className='w-fit'>
      {!user && <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} />}
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
              <div className='grid lg:grid-cols-4 md:grid-cols-2 max-sm:grid-cols-1  gap-6 items-center'>
                {localStorageBookMarks?.map((movie: any) => (
                  <div className='w-[250px] '>
                    <Link href={`movies/${movie?.id}`}>
                      <Image
                        src={imagePath + movie?.poster_path}
                        alt={`${movie?.title || ""}`}
                        className='h-[350px] w-[250px] rounded-md bg-stone-300 transition ease-in-out cursor-pointer hover:brightness-50'
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
                    <h1 className='mt-3 text-slate-600 font-semibold tracking-tight'>
                      {movie?.title}
                    </h1>
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

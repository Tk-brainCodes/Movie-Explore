"use client";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/Globalcontext";
import { MovieCardProps } from "../../types/movie-type";
import { db } from "@/firebase.config";
import { getDocs, collection } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ModalComponent from "../components/Modal";
import Image from "next/image";
import AnimatedPage from "@/app/components/Animation";
import imdb_small from "../../public/image/imdb-small.png";

const Movies = ({
  title,
  movieId,
  poster_path,
  release_date,
  backdrop_path,
  movieRating,
}: MovieCardProps) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  const {
    // @ts-ignore
    addMovieToBookmarked,
    // @ts-ignore
    removeMovieFromBookmarked,
    bookmarked,
    // @ts-ignore
    user,
  } = useContext(GlobalContext);

  const [savedBookmarks, setSavedBookmarks] = useState([]);
  const [isBookmarked, setBookmarked] = useState<boolean>(() => {
    const doesMovieExist = savedBookmarks.find(
      (movie: any) => movie?.id === movieId
    );
    return !!doesMovieExist;
  });
  const [exists, setExists] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onCloseModal = () => setOpen(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const movieData = {
    title: title,
    id: movieId,
    poster_path: poster_path,
    date: release_date,
    background: backdrop_path,
  };

  const checkIfItemExists = async () => {
    const bookmarkCol = collection(db, `${user?.uid as string}`);
    const bookmarkSnapshot = await getDocs(bookmarkCol);
    const bookmarkList = bookmarkSnapshot.docs.map((doc) => doc.data());
    const itemExists = bookmarkList.some((item) => item.id === movieId);
    setExists(itemExists);
  };

  const handleBookmarksIfExists = () => {
    if (user) {
      removeMovieFromBookmarked(movieId);
      setBookmarked((prev) => !prev);
    } else {
      onOpenModal();
    }
  };

  const handleBookmarksIfNotExists = () => {
    if (user) {
      addMovieToBookmarked(movieData);
      setBookmarked((prev) => !prev);
    } else {
      onOpenModal();
    }
  };

  useEffect(() => {
    setSavedBookmarks(bookmarked);
    checkIfItemExists();
  }, [exists, bookmarked, movieId, bookmarked]);

  return (
    <div className='h-1/5'>
      <Toaster />
      <AnimatedPage>
        <div onClick={() => router.push(`movies/${movieId}`)} className='relative hover:translate-y-1 w-[480px] transition ease-in-out  cursor-pointer hover:scale-110 duration-300 h-[280px]'>
            <Image
              className={`bg-gray-300  ${
                poster_path === "" && "animate-pulse dark:bg-gray-700"
              }   w-full h-full absolute rounded-lg object-cover bg-no-repeat  mx-0 my-0 `}
              src={imagePath + poster_path}
              alt={title}
              loading='lazy'
              width={500}
              height={500}
              blurDataURL={imagePath + poster_path}
              placeholder='blur'
            />
          <div className='px-4 py-4 rounded-lg bg-gradient-to-b from-transparent to-black bg-opacity-50  absolute h-[200px] w-full inset-x-0 bottom-0 text-white '>
            <div className="mt-[3em]">
              <h1 className='font-semibold text-xl'> {title}</h1>
            <p className=' text-slate-100 mt-[10px]  font-normal text-sm'>
              {release_date?.substring(0, 4)}
            </p>
            <div className='flex items-center justify-between'>
              <h3 className='flex gap-2 items-center text-sm'>
                <Image
                  src={imdb_small}
                  alt='imdb icon'
                  width={100}
                  height={50}
                  className='w-[50px] h-[40px]'
                />
                {movieRating?.toFixed(1)} rating
              </h3>
              <section className='flex gap-2'>
            <Link href={`movies/${movieId}/watch`} title="watch trailer">
                <button className='px-2 py-2 text-sm bg-red-600 hover:bg-red-700  rounded-full text-white'>
                  Watch now
                </button>
                </Link>
                <button className='rounded-full bg-slate-400 hover-bg-white hover:text-green-400 w-10 h-10  text-white flex items-center justify-center shadow-lg'>
                {exists && user !== undefined ? (
                  <svg
                    className='w-4 h-4 text-green-600 pointer-events-none'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                   <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  ): (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg> 
                   )}
                </button>
              </section>
            </div>
            </div>
          </div>
        </div>
      </AnimatedPage>
      <ModalComponent open={open} onCloseModal={onCloseModal} />
    </div>
  );
};

export default Movies;

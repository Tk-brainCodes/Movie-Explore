"use client";
import axios from "axios";
import { IconMovie, IconPointFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ListProp } from "../../types/movie-type";
import Link from "next/link";
import LoadingSpiner from "../(components)/LoadingSpinner";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AnimatedPage from "@/app/(components)/Animation";
import AddIcon from "@mui/icons-material/Add";

export default function Discover() {
  const router = useRouter();
  const getGenre = useQuery({
    queryKey: ["genre"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  return (
    <div className='px-6 py-6 mb-[20px]'>
      <h1 className='text-white gap-3 text-lg tracking-tight flex items-center  text-center  mt-[1em] mb-[1em] font-semibold'>
        <button
          onClick={() => router.back()}
          className='w-[30px] h-[30px] px-2 py-2 flex items-center justify-center bg-orange-400 rounded-full cursor-pointer text-white'
        >
          <ArrowBackIosNewOutlinedIcon
            style={{ fontSize: "16px" }}
            className='font-semibold'
          />
        </button>
        Genres <IconPointFilled size={15} color='grey' />
        <p className='text-sm text-gray-500	'>Browse by genres</p>
      </h1>
      <AnimatedPage>
        <div className='grid gap-6 grid-cols-fluid'>
          {getGenre.isLoading ? (
            <LoadingSpiner text={"Genres"} />
          ) : (
            <>
              {getGenre?.data?.genres?.map((list: ListProp) => (
                <Link href={`/discover/${list.name}/${list.id}`}>
                  <div className='text-slate-800 hover:text-white  transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300bg-gray-600 rounded-full'>
                    <div className=' rounded-full hover:bg-red-600 cursor-pointer tracking-widest font-semibold text-xs flex px-6 py-6 h-[60px] bg-white items-center justify-between'>
                      <h1>{list?.name}</h1>
                      <AddIcon />
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </AnimatedPage>
    </div>
  );
}

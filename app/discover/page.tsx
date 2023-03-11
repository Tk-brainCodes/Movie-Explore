"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { IconMovie, IconPointFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import useFetch from "../hooks/useFetch";

export default function Discover() {
  const router = useRouter();
  const { isLoading, apiData, serverError } = useFetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
  );
  console.log(isLoading, serverError);

  return (
    <div>
      <h1 className='text-black text-lg tracking-tight flex items-center gap-1 text-center  mt-[1em] mb-[1em] font-semibold'>
        Genre <IconPointFilled size={15} color='grey' />
        <p className='text-sm text-gray-500	'>
          Discover movies from different genres
        </p>
      </h1>
      <div className='grid gap-6 grid-cols-fluid'>
        {apiData?.genres?.map((list: any) => (
          <div
            className='text-slate-400 hover:text-white transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300bg-gray-600 rounded-full'
            onClick={() => router.push(`/discover/${list.id}`)}
          >
            <div className=' rounded-full cursor-pointer tracking-widest font-semibold text-xs flex px-6 py-6 h-[60px] bg-gray-800 items-center justify-between'>
              <h1>{list?.name}</h1>
              <IconMovie size={20} color='white' />
            </div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
}

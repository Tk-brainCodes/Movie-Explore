"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 
import { VideoProp } from "@/app/types/movie-type";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AnimatedPage from "@/app/components/Animation";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'; 

export default function WatchVideo({ params }: { params: string }) {
  const mykey = process.env.NEXT_PUBLIC_API_KEY;
  const { movies }: any = params;
  const router = useRouter();

  const movieVideo = useQuery({
    queryKey: ["video"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movies}/videos?api_key=${mykey}&language=en-US`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
    if(movieVideo.isLoading){
      nprogress.start();
    } else {
      nprogress.done();
    }
  if (!movieVideo.isFetching && movieVideo.isSuccess) {
      typeof window !== 'undefined' ? localStorage.setItem("video", JSON.stringify(movieVideo.data)) : "";
  }
  });

  return (
    <>
      <AnimatedPage>
        <h1 className='text-white flex gap-2 items-center font-semibold mb-[30px]'>
          <button
            onClick={() => router.back()}
            className='w-[30px] h-[30px] px-2 py-2 flex items-center justify-center bg-orange-400 rounded-full cursor-pointer text-white'
          >
            <ArrowBackIosNewOutlinedIcon className='text-xs font-semibold' />
          </button>
          Videos
        </h1>
        <div className='w-fit px-2 py-2 '>
          {movieVideo.isLoading ? (
            <div
              role='status'
              className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700'
            >
              <svg
                className='w-12 h-12 text-gray-200 dark:text-gray-600'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 384 512'
              >
                <path d='M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z' />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <>
              <div className='flex  items-center flex-wrap justify-center max-md:flex-wrap max-sm:flex-wrap md:flex-wrap gap-2'>
                {movieVideo?.data?.results.map(
                  (video: VideoProp, i: number) => (
                    <div key={video?.key} className='w-[430px] h-fit'>
                      <h2 className='text-white text-sm flex gap-2 items-center'>
                        <span className='text-orange-400 text-lg font-semibold'>
                          0{`${i + 1}`}
                        </span>
                        {video?.name}
                      </h2>
                      <h3 className='text-slate-500 text-sm'>
                        {video?.published_at.substring(0, 4)}
                      </h3>
                      <ReactPlayer
                        width={400}
                        height={300}
                        url={`https://www.youtube.com/watch?v=${video?.key}`}
                        className='mt-[20px] rounded-lg'
                        pip={false}
                        controls
                      />
                    </div>
                  )
                ) || <Skeleton width={400} height={300} />}
              </div>
            </>
          )}
        </div>
      </AnimatedPage>
    </>
  );
}

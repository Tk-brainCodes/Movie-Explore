/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Imdb, Tomatoe, Watch } from "../(assets)/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Element } from "react-scroll";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Link from "next/link";

const Herosection = ({
  movie,
  loading,
  isError,
}: {
  movie: any;
  loading: boolean;
  isError: any;
}) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const swiperRef = useRef<typeof Swiper | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    if (swiperRef.current) {
      // @ts-ignore
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <>
      {isError ? (
        <div className='font-2xl items-center justify-center text-red-700'>
          An error occurred: {isError.message}
        </div>
      ) : (
        <Element
          name='hero'
          className={`w-[100vw] -mt-[1.5em] -ml-[1em] flex flex-col overflow-x-hidden h-[90vh] bg-cover bg-no-repeat relative`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
              imagePath + movie?.results[currentSlide]?.poster_path
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "600px",
          }}
          data-testid='movie-poster'
        >
          <div className=' flex items-center  justify-between'>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              slidesPerView={1}
              autoplay={true}
              onSlideChange={(swiper: any) => setCurrentSlide(swiper.realIndex)}
              onSwiper={(swiper: any) => console.log(swiper)}
              className='w-auto'
            >
              {movie?.results
                .map((movie: any) => {
                  return (
                    <SwiperSlide key={movie.id}>
                      <div
                        className='w-fit px-[4em] h-auto mt-[10em] mb-[2em] transition-all ease-in-out duration-300 whitespace-nowrap flex-col justify-start items-start gap-4 inline-flex'
                        style={{ zIndex: 2 }}
                      >
                        <div
                          className='w-[550px] h-auto text-white text-5xl font-bold leading-[56px]'
                          style={{ width: "404px", whiteSpace: "break-spaces" }}
                          data-testid='movie-title'
                        >
                          {movie?.title}
                        </div>
                        <div className='relative flex gap-5'>
                          <div className='w-auto h-[17px] top-0 justify-start items-center gap-2.5 inline-flex'>
                            <Image
                              className='w-[35px] h-[17px]'
                              src={Imdb}
                              width={500}
                              height={500}
                              alt='bg-image'
                            />
                            <div className='text-white text-xs font-normal leading-3'>
                              {movie?.vote_average.toFixed(1)} / 10
                            </div>
                          </div>
                          <div className='w-auto h-[17px] top-0 justify-start items-center gap-2.5 inline-flex'>
                            <Image
                              className='w-4 h-[17px]'
                              src={Tomatoe}
                              width={500}
                              height={500}
                              alt='bg-image'
                            />
                            <div className='text-white text-xs font-normal leading-3'>
                              {movie?.vote_average}
                            </div>
                          </div>
                        </div>
                        <div
                          className='w-[550px] text-white text-sm font-medium leading-[18px] overflow-hidden'
                          style={{
                            height: "auto !important",
                            whiteSpace: "break-spaces",
                          }}
                          data-testid='movie-overview'
                        >
                          {movie?.overview}
                        </div>

                        <Link href={`movies/${movie?.id}`}>
                          <div className='px-4 py-1.5 bg-rose-700 cursor-pointer hover:bg-rose-600 rounded-md justify-start items-center gap-2 inline-flex'>
                            <Image
                              src={Watch}
                              width={50}
                              height={50}
                              alt='watch icon'
                              className='w-5 h-5 relative'
                            />
                            <div className='text-white text-sm font-bold uppercase leading-normal'>
                              Watch trailer
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })
                .slice(0, 10)}
            </Swiper>

            {/*Carousel buttons*/}
            <div className='w-autoh-auto block mt-[1em]  z-10 mr-[2em]'>
              {movie?.results
                .map((_: any, index: number) => (
                  <>
                    <div className='w-2.5 h-auto  top-0 flex-col justify-start items-center gap-2.5 inline-flex'>
                      <div
                        key={index}
                        className={`${
                          currentSlide === index
                            ? "text-white mr-[2em]"
                            : "text-gray-400"
                        } text-xs font-bold leading-[14px] cursor-pointer flex items-center justify-center gap-2`}
                        onClick={() => handleSlideChange(index)}
                      >
                        {currentSlide === index ? (
                          <div className='w-5 h-[3px]  top-[53px]  bg-white rounded-md' />
                        ) : (
                          ""
                        )}
                        {index + 1}
                      </div>
                    </div>
                  </>
                ))
                .slice(0, 10)}
            </div>
          </div>
        </Element>
      )}
    </>
  );
};

export default Herosection;

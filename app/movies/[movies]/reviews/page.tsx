"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import no_image from "../../../../public/image/no_image.jpg";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { SelectedProp, ReviewProps } from "@/types/movie-type";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import LoadingSpiner from "@/app/components/LoadingSpinner";
import AnimatedPage from "@/app/components/Animation";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

export default function ReviewPage({ params }: { params: string }) {
  const mykey = process.env.NEXT_PUBLIC_API_KEY;
  const { movies }: any = params;
  let movieId = movies === "%5Bmovies%5D" ? 447277 : movies;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | SelectedProp>(null);
  const router = useRouter();

  const onOpenModal = (item: any) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  const movierReview = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${mykey}&language=en-US&page=1`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (movierReview.isLoading) {
      nprogress.start();
    } else {
      nprogress.done();
    }
    if (!movierReview.isFetching && movierReview.isSuccess) {
      typeof window !== "undefined"
        ? localStorage.setItem("reviews", JSON.stringify(movierReview.data))
        : "";
    }
  });

  return (
    <div className='px-6 py-6'>
      <h1 className='text-white flex gap-2 items-center px-2 py-2 font-semibold'>
        <button
          onClick={() => router.back()}
          className='w-[30px] h-[30px] px-2 py-2 flex items-center text-xs	 justify-center bg-orange-400 rounded-full cursor-pointer text-white'
        >
          <ArrowBackIosNewOutlinedIcon
            style={{fontSize: "16px"}}
            className='font-semibold'
          />
        </button>
        Reviews
      </h1>
      <AnimatedPage>
        <div className='grid grid-cols-fluid gap-6 mt-[20px] items-center'>
          <>
            {movierReview?.data?.length === 0 && (
              <h1 className='text-white text-sm font-semibold mt-[20px]'>
                No reviews
              </h1>
            )}
            {movierReview.isLoading ? (
              <LoadingSpiner text={"Reviews"} />
            ) : (
              <>
                {movierReview?.data?.results.map((review: ReviewProps) => (
                  <>
                    <div
                      className='w-fit md:w-[300px] lg:w-[300px] bg-slate-700 rounded-md cursor-pointer block px-2 py-2 hover:bg-slate-800'
                      onClick={() => onOpenModal(review)}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex gap-8'>
                          <div className='flex gap-2'>
                            <Image
                              alt={review?.author}
                              src={
                                !review?.author_details?.avatar_path
                                  ? no_image
                                  : imagePath +
                                    review?.author_details?.avatar_path
                              }
                              width={500}
                              height={500}
                              blurDataURL={
                                imagePath + review?.author_details?.avatar_path
                              }
                              placeholder='blur'
                              priority
                              className='bg-slate-400 w-[60px] h-[60px] rounded-full'
                            />
                            <div>
                              <h4 className='text-white font-bold text-sm'>
                                {review?.author}
                              </h4>
                              <h4 className='font-xs mt-2 text-gray-600 flex gap-3'>
                                {review?.updated_at.substring(0, 4)}
                                {!review?.author_details?.rating ? (
                                  ""
                                ) : (
                                  <h4 className='ml-[5em] bg-slate-700 h-[20px] flex items-center justify-center rounded-full px-3 py-3 text-white text-sm'>
                                    <StarOutlinedIcon className='text-yellow-500 w-[20px] h-[20px]' />
                                    {review?.author_details?.rating}.0
                                  </h4>
                                )}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className='text-sm text-white font-normal leading-6 mt-[20px]'>
                        {`${review?.content.substring(0, 350)}...`}
                      </h3>
                    </div>
                    {selectedItem && (
                      <Modal
                        open={open}
                        onClose={onCloseModal}
                        center
                        classNames={{
                          overlay: "customOverlay",
                          modal: "customModal",
                        }}
                      >
                        <>
                          <h2 className='font-semibold mb-[20px]'>
                            {selectedItem?.author}
                          </h2>
                          <p className='text-slate-600'>
                            {selectedItem?.content}
                          </p>
                        </>
                      </Modal>
                    )}
                  </>
                ))}
              </>
            )}
          </>
        </div>
      </AnimatedPage>
    </div>
  );
}

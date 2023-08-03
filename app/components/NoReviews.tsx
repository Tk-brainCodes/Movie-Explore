"use client";

import no_reviews from "../../public/image/no-reviews.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NoReviews = () => {
  const router = useRouter();
  return (
    <section className='flex items-center h-full sm:p-16 bg-[#121212]'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md'>
        <Image
          src={no_reviews}
          alt='empty-bookmark-mail'
          width={300}
          height={500}
          className='w-[300px] h-[400px]'
        />
        <p className='text-3xl text-white'>Sorry no reviews</p>
        <a
          rel='noopener noreferrer'
          onClick={() => router.back()}
          className='px-8 py-3 font-semibold rounded-full text-white bg-orange-500'
        >
          Go back
        </a>
      </div>
    </section>
  );
};

export default NoReviews;

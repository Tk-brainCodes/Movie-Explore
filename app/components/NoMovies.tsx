"use client";

import no_videos from "../../public/image/no-movies.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NoVideos = () => {
  const router = useRouter();
  return (
    <section className='flex items-center h-full sm:p-16 dark:bg-gray-900 dark:text-gray-100'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md'>
        <Image
          src={no_videos}
          alt='empty-bookmark-mail'
          width={300}
          height={500}
          className=''
        />
        <p className='text-3xl'>Sorry no videos</p>
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

export default NoVideos;

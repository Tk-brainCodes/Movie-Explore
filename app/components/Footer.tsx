import { Anchor } from "./Anchor"

const Footer = () => {
  return (
    <div className='w-full h-20 border-t border-zinc-800 bg-[#121212]	px-8 py-4'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023
          <Anchor href='https://movie-explore-seven.vercel.app/' target="_blank" >
            <span className='hover:underline  cursor-pointer'>Movie Explore™</span>
          </Anchor>
          . All Rights Reserved.
        </span>
        <div className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <p>
            Powered by{" "}
            <Anchor
              href='https://developer.themoviedb.org/docs'
              target='_blank'
            >
              <span className="hover:underline cursor-pointer">TMDB API</span>
            </Anchor>
            — Designed and developed by
            <Anchor
              href='https://www.linkedin.com/in/eboreime-thankgod-34864a1b1/'
              target='_blank'
            >
              <span className="hover:underline cursor-pointer ml-[3px]">
              Eboreime ThankGod
              </span>
            </Anchor>
          </p>
        </div>
    </div>
  );
}
export default Footer
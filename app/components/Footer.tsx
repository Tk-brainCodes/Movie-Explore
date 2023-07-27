import { Anchor } from "./Anchor"

const Footer = () => {
  return (
    <footer className='bg-white rounded-lg shadow m-4 dark:bg-gray-800'>
      <div className='w-[50vw] mx-auto max-w-screen-xl p-4 block'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023{" "}
          <a href='#' className='hover:underline  cursor-pointer'>
            Movie Explore™
          </a>
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
              <span className="hover:underline cursor-pointer">
              Eboreime ThankGod
              </span>
            </Anchor>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer
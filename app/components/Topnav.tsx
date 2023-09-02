"use client";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/Globalcontext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Link as LinkTo } from "react-scroll";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import ModalComponent from "./Modal";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Image from "next/image";

const TopNav = () => {
  // @ts-ignore
  const { toggleSidebar, user, logout } = useContext(GlobalContext);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [bookmarkLength, setBookmarkLength] = useState([]);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onCloseModal = () => setOpen(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const handleIsLoggedOut = () => {
    if (user) {
      handleLogout();
    } else {
      onOpenModal();
    }
  };

  useEffect(() => {
    const item =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("myBookmarks") as string)
        : "";
    setBookmarkLength(item);
  }, []);
  const length = bookmarkLength?.length as number;

  return (
    <div className='w-full h-20 firefox:bg-opacity-90 bg-opacity-30 backdrop-filter backdrop-blur-lg bg-[#121212] px-4 py-6 flex items-center justify-between fixed z-40'>
      <div className='text-white mb-6 flex items-center justify-center gap-2 h-4 mt-5'>
        <button
          data-cy='sidebar-toggle-button'
          data-drawer-target='default-sidebar'
          data-drawer-toggle='default-sidebar'
          aria-controls='default-sidebar'
          type='button'
          className={`hidden max-sm:inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
          onClick={toggleSidebar}
        >
          <span className='sr-only'>Open sidebar</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
            ></path>
          </svg>
        </button>
        <Link href='/'>
          <button className='ml-[2em] max-sm:ml[5px] flex item-center gap-1'>
            <SlideshowOutlinedIcon />
            Movie<span className='text-orange-400 font-semibold'>Explore</span>
          </button>
        </Link>
      </div>
      <div className='max-sm:hidden'>
        <ul className='flex max-sm:hidden text-white text-xs gap-6 items-center justify-between'>
          <li className='cursor-pointer hover:text-orange-400'>
            <LinkTo
              to='trending'
              offset={-110}
              spy={true}
              smooth={true}
              duration={500}
              activeClass='active'
            >
              Trending
            </LinkTo>
          </li>
          <li className='cursor-pointer hover:text-orange-400'>
            <LinkTo
              to='theatres'
              offset={-110}
              spy={true}
              smooth={true}
              duration={500}
              activeClass='active'
            >
              In theatres
            </LinkTo>
          </li>
          <li className='cursor-pointer hover:text-orange-400'>
            <LinkTo
              to='popular'
              offset={-110}
              spy={true}
              smooth={true}
              duration={500}
              activeClass='active'
            >
              Popular
            </LinkTo>
          </li>
          <Link href='/discover'>
            <li
              className={`${
                pathname === "/discover"
                  ? "text-orange-400 font-semibold"
                  : "text-white"
              } cursor-pointer hover:text-orange-400`}
            >
              Discover
            </li>
          </Link>
          <Link href='/coming-soon'>
            <li
              className={`${
                pathname === "/coming-soon"
                  ? "text-orange-400 font-semibold"
                  : "text-white"
              } cursor-pointer hover:text-orange-400`}
            >
              Coming Soon
            </li>
          </Link>
        </ul>
      </div>
      <div className='w-auto px-4 py-4'>
        <ul className='flex items-center justify-center gap-5 font-semibold text-sm text-slate-500'>
          <Link href="/bookmarked">
            <button
              className={`${
                pathname === "/bookmarked"
                  ? "text-orange-400 font-semibold"
                  : "text-white"
              } block max-sm:hidden relative`}
              data-cy='bookmark-icon'
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <BookmarkBorderIcon />
              </motion.span>
              {length && (
                <span className='absolute -top-[8px] -right-[10px] w-5 h-5 bg-red-600 rounded-full flex items-center font-normal justify-center text-white text-xs'>
                  {length}
                </span>
              )}
            </button>
          </Link>
          <Link href='/search'>
            <button
              className={`${
                pathname === "/search"
                  ? "text-orange-400 font-semibold"
                  : "text-white"
              }`}
              data-cy='search-icon'
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <SearchOutlinedIcon />
              </motion.span>
            </button>
          </Link>
          {user && (
            <Image
              src={user?.photoURL ? user?.photoURL : ""}
              alt={user?.email ? user?.email : ""}
              width={500}
              height={500}
              className='w-[40px] h-[40px] rounded-full text-white via-cyan-900 to-stone-500 bg-gradient-to-r max-sm:cursor-pointer'
              data-cy='user-profile-image'
              priority
              onClick={toggleDropdown}
            />
          )}

          {isDropdownOpen && (
            <div
              data-cy='user-dropdown'
              className='absolute mt-[13em] w-[200px] lg:hidden bg-blue-800 mr-[3em] rounded-md px-4 py-4'
            >
              <h2 className='text-white mb-[20px]'>{user?.displayName}</h2>
              <button
                className='flex gap-1 items-center justify-center hover:text-white hover:bg-orange-400 transition rounded-full ease-in-out text-xs bottom-0 text-slate-600 px-2 py-2 bg-white '
                onClick={handleIsLoggedOut}
                data-cy='login-logout-button'
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  {user ? "Log out" : "Log in"}
                </motion.span>
              </button>
            </div>
          )}

          <button
            data-cy='login-logout-button'
            className={`flex gap-1 items-center rounded-full justify-center hover:text-white hover:bg-orange-400 transition ease-in-out text-xs bottom-0 text-slate-600 px-2 py-2 bg-white max-sm:${
              !user ? "block" : "hidden"
            }`}
            onClick={handleIsLoggedOut}
          >
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              {user ? "Log out" : "Log in"}
            </motion.span>
          </button>
        </ul>
        <div>
          <ModalComponent open={open} onCloseModal={onCloseModal} />
        </div>
      </div>
    </div>
  );
};
export default TopNav;

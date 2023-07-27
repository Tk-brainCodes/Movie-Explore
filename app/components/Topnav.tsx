"use client";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Modal } from "react-responsive-modal";
import ModalComponent from "./Modal";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import no_image from "../../public/image/no_image.jpg";
import Link from "next/link";
import Image from "next/image";
import SuccessModal from "./SigninSuccess";


const TopNav = () => {
  // @ts-ignore
  const { toggleSidebar, user, logout } = useContext(GlobalContext);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  console.log("user:", user)

  localStorage.setItem("user", JSON.stringify(user))

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

  return (
    <div className='w-full h-20 border-b-2 border-slate-800	 px-4 py-6 flex items-center justify-between fixed bg-gray-900 z-40'>
      <div className='text-white mb-6 flex items-center justify-center gap-2 h-4 mt-5'>
        <button
          data-cy='sidebar-toggle-button'
          data-drawer-target='default-sidebar'
          data-drawer-toggle='default-sidebar'
          aria-controls='default-sidebar'
          type='button'
          className={`inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
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
              clip-rule='evenodd'
              fill-rule='evenodd'
              d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
            ></path>
          </svg>
        </button>
        <Link href='/'>
          <SlideshowOutlinedIcon />
          MovieExpore
        </Link>
      </div>
      <div className='w-auto px-4 py-4'>
        <ul className='flex items-center justify-center gap-5 font-semibold text-sm text-slate-500'>
          <Link
            className={`${
              pathname === "/search"
                ? "text-orange-400 font-semibold"
                : "text-white"
            }`}
            href='/search'
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
          </Link>
          {user && (
            <Image
              src={user.photoURL ? user.photoURL : ""}
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
              <h2 className='text-white mb-[20px]'>{user.displayName}</h2>
              <button
                className='flex gap-1 items-center justify-center hover:text-white hover:bg-orange-400 transition rounded-full ease-in-out text-xs bottom-0 text-slate-600 px-2 py-2 bg-white '
                onClick={handleIsLoggedOut}
                data-cy='login-logout-button'
              >
                <LogoutOutlinedIcon className='text-xs' />
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
            className={`flex gap-1 items-center rounded-full justify-center hover:text-white hover:bg-orange-400 transition ease-in-out text-xs bottom-0 text-slate-600 px-2 py-2 bg-white max-sm:hidden ${
              !user ? "max-md:block" : "max-md:hidden"
            }`}
            onClick={handleIsLoggedOut}
          >
            <LogoutOutlinedIcon className='text-xs' />
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

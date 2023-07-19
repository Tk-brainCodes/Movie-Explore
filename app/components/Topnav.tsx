"use client";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Modal } from "react-responsive-modal";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import no_image from "../../public/image/no_image.jpg";
import Link from "next/link";
import Image from "next/image";

const tabData = [
  {
    tab: "Log in",
    id: 1,
    tabName: "tab1",
    component: LoginForm,
  },
  {
    tab: "Sign up",
    id: 2,
    tabName: "tab2",
    component: SignupForm,
  },
];

export default function TopNav() {
  // @ts-ignore
  const { toggleSidebar, user, logout } = useContext(GlobalContext);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("tab1");
  console.log(user);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setActiveTab(activeTab);
  }, [activeTab]);

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
              src={user?.photoUR || no_image}
              alt={user?.email || ""}
              width={500}
              height={500}
              className='w-[40px] h-[40px] rounded-full  via-cyan-900 to-stone-500 bg-gradient-to-r'
              // loading='lazy'
              priority
            />
          )}
          <button
            className='flex gap-1 items-center justify-center hover:text-white hover:bg-orange-400 transition ease-in-out text-xs bottom-0 text-slate-600 px-2 py-2 bg-white rounded-full'
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
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              overlay: "customOverlayDark",
              modal: "customModal",
            }}
          >
            <>
              <div className='flex items-center justify-around mb-[20px]'>
                {tabData.map((tabs) => (
                  <button
                    key={tabs.id}
                    onClick={() => setActiveTab(tabs.tabName)}
                    className={
                      activeTab === `${tabs.tabName}`
                        ? "px-4 text-sm py-4 bg-blue-600 text-white rounded-full"
                        : "px-2 py-2 text-sm text-slate-600 rounded-full"
                    }
                  >
                    {tabs.tab}
                  </button>
                ))}
              </div>
              <div className=''>
                <>
                  {tabData.map((content) => (
                    <div key={content.id} className='px-2 py-2'>
                      {activeTab === content.tabName && (
                        <>
                          <content.component />
                        </>
                      )}
                    </div>
                  ))}
                </>
              </div>
            </>
          </Modal>
        </div>
      </div>
    </div>
  );
}

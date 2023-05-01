"use client";
import { sidebar_routes } from "../routes/route";
import { usePathname } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { motion } from "framer-motion";
import no_image from "../../../../public/image/no_image.jpg";
import "react-responsive-modal/styles.css";
import Link from "next/link";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export default function Sidenav() {
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { bookmarked, toggleSidebar, isSidebarOpen, sidebarRef } =
    useContext(GlobalContext);
  // const numItems = bookmarked?.length;

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  return (
    <>
      {isSidebarOpen && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          className={`w-64 top-0 left-0 bg-gray-900 z-10  h-screen border-r-2 border-slate-800 transition-transform border-grey-600 px-4 py-4 fixed ease-in-out duration-300 ${
            isSidebarOpen ? "block" : "max-sm:hidden"
          }`}
          aria-label='Sidebar'
          ref={sidebarRef}
        >
          <motion.ul
            initial='closed'
            animate='open'
            variants={sideVariants}
            className='mt-[5em]'
          >
            {sidebar_routes.map((route) => (
              <div key={route.id} className=' grid grid-cols-1'>
                <li className='text-white mt-4 mb-[10px]'>{route.name}</li>
                <li className='flex flex-col gap-4 text-sm'>
                  {route.paths.map(({ id, title, Icon, url }) => {
                    return (
                      <Link
                        href={`${url}`}
                        key={id}
                        className={`flex text-sm mt-2 items-center text-center gap-3 justify-start hover:text-orange-400 transition ease-in-out h-6 ${
                          pathname === url
                            ? "text-orange-400 font-semibold"
                            : "text-slate-400"
                        }`}
                      >
                        <span>{<Icon />}</span>
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                          variants={itemVariants}
                        >
                          {title}
                        </motion.span>
                        {/* {title === "Bookmarked" ? (
                      <>
                        {title}
                        {numItems ? (
                          <span className='w-[25px] h-[25px] flex px-2 items-center justify-center -ml-[6px] -mt-[15px] relative bg-red-500 rounded-full text-white'>
                            <p className='text-xs font-semibold'>
                              {numItems ? numItems : ""}
                            </p>
                          </span>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      title
                    )} */}
                      </Link>
                    );
                  })}
                </li>
              </div>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </>
  );
}

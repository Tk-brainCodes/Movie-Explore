"use client";
import { sidebar_routes } from "../routes/route";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function Sidenav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='w-64 bg-white h-screen border-r-2 border-grey-600 px-4 py-4 fixed'>
      <ul className='mt-[5em]'>
        {sidebar_routes.map((route) => (
          <div key={route.id} className=' grid grid-cols-1'>
            <li className='font-black mt-4'>{route.name}</li>
            <li className='flex flex-col gap-3 text-sm'>
              {route.paths.map(({ id, title, Icon, url }) => {
                return (
                  <button
                    key={id}
                    className={`flex text-sm mt-2 items-center text-center gap-3 justify-start hover:text-orange-400 transition ease-in-out h-6 ${
                      pathname === url
                        ? "text-orange-400 font-semibold"
                        : "text-slate-400"
                    }`}
                    onClick={() => router.push(`${url}`)}
                  >
                    <span>{<Icon />}</span>
                    {title}
                  </button>
                );
              })}
            </li>
          </div>
        ))}
        <br />
        <Link
          className='flex gap-3 hover:text-orange-400 text-sm mb-6 mt-2 transition ease-in-out text-slate-400'
          href='/settings'
        >
          <SettingsOutlinedIcon />
          Settings
        </Link>
        <Link
          className='flex gap-3 hover:text-orange-400 transition ease-in-out text-sm bottom-0 text-slate-400'
          href='/'
        >
          <LogoutOutlinedIcon />
          Log out
        </Link>
      </ul>
    </div>
  );
}

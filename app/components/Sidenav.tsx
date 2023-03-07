"use client";
import { sidebar_routes } from "../routes/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

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
              {route.paths.map((paths) => (
                <button
                  key={paths.id}
                  className={`flex text-sm mt-2 items-center justify-start h-6 ${
                    pathname === paths.url
                      ? "text-orange-400 font-medium"
                      : "text-slate-400"
                  }`}
                  onClick={() => router.push(`${paths.url}`)}
                >
                  {paths.title}
                </button>
              ))}
            </li>
          </div>
        ))}
        <br />
        <Link className='block text-sm mb-6 mt-2' href='/settings'>
          Settings
        </Link>
        <Link className='block text-sm bottom-0' href='/logout'>
          Log out
        </Link>
      </ul>
    </div>
  );
}

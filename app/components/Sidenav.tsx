import { sidebar_routes } from "../routes/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { IconHome } from "@tabler/icons-react";

import Link from "next/link";

export default function Sidenav() {
  return (
    <div className='w-64 h-screen border border-grey-600 px-4 py-4 fixed'>
      <div className='font-black mb-6 flex gap-2 h-4'>
        <FontAwesomeIcon
          icon={faVideoCamera}
          style={{ fontSize: 20, color: "black" }}
        />
        MovieDB
      </div>
      <ul>
        {sidebar_routes.map((route) => (
          <div key={route.id} className=' grid grid-cols-1'>
            <br />
            <li className='font-black mb-4'>{route.name}</li>
            <li className='flex flex-col gap-3 text-sm'>
              {route.paths.map((paths) => (
                <Link
                  key={paths.id}
                  className='flex mt-2 items-center justify-start h-6'
                  href={paths.url}
                >
                  {paths.title}
                </Link>
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

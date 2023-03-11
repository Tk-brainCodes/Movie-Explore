"use client"
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className='w-full h-20 border-b-2 px-4 py-6 flex items-center justify-between fixed bg-white z-10'>
      <div className='font-black mb-6 flex gap-2 h-4 mt-5'>
        <SlideshowOutlinedIcon />
        MovieExpore
      </div>
      <div className='w-auto px-4 py-4'>
        <ul className='flex gap-5 font-semibold text-sm text-slate-500'>
          <Link href='/movies'>Movie</Link>
          <Link href='/tvshows'>Tv Shows</Link>
          <Link href='/search'>Find Movies</Link>
        </ul>
      </div>
    </div>
  );
}

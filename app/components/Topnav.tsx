import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className='w-full h-20 border-b-2 px-4 py-6 flex items-center justify-between fixed bg-white z-10'>
      <div className='font-black mb-6 flex gap-2 h-4 mt-5'>
        <FontAwesomeIcon
          icon={faVideoCamera}
          style={{ fontSize: 20, color: "black" }}
        />
        MovieExpore
      </div>
      <div className="w-auto px-4 py-4">
        <ul className="flex gap-5 font-semibold text-sm text-slate-500">
          <Link href="/movies">Movie</Link>
          <Link href="/tvshows">Tv Shows</Link>
          <Link href="/search">Find Movies</Link>
        </ul>
      </div>
    </div>
  );
}

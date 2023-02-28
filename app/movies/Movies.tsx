import Link from "next/link";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  movieId: number;
  poster_path: string;
  release_date: string;
}

export default function Movies({
  title,
  movieId,
  poster_path,
  release_date,
}: MovieCardProps) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div>
      <Link href={`movies/${movieId}`}>
        <Image
          src={imagePath + poster_path}
          alt={title}
          width={500}
          height={500}
          blurDataURL={imagePath + poster_path}
          placeholder='blur'
          priority
        />
      </Link>
      <h1>{title}</h1>
      <h2>{release_date}</h2>
    </div>
  );
}

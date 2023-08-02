export interface MovieDataProp {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: Array<string>;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  id?: number;
  genres: Array<{ id: number; name: string }>;
}

export interface MovieCardProps {
  title: string;
  movieId: number;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  id?: number;
}

export interface CountryProp {
  logo_path: string;
  name: string;
  origin_country: string;
  id: number;
}

export interface VideoProp {
  name: string;
  published_at: string;
  key: string;
}

export interface SelectedProp {
  author: string;
  content: string;
}

export interface AuthorDetails {
  avatar_path: string;
  rating: string;
}

export interface ReviewProps {
  content: string;
  author: string;
  author_details: AuthorDetails;
  updated_at: string;
}

export interface ListProp {
  name: string;
  id: number;
}

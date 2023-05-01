import { PayloadAction } from "@reduxjs/toolkit";
import { MovieDataProp } from "../types/movie-type";

type Movie = Omit<
  MovieDataProp,
  "overview" | "vote_average" | "release_date" | "runtime" | "genres"
>;

export interface BookMarkState {
  movies: Movie[];
}

export default (state: any, action: any) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_BOOKMARKED":
      return {
        ...state,
        bookmarked: [action.payload, ...state.bookmarked],
      };
    case "REMOVE_FROM_BOOKMARKED":
      return {
        ...state,
        bookmarked: state.bookmarked.filter(
          (movie: Movie) => movie.id !== action.payload
        ),
      };
    case "ADD_RECENT_MOVIE":
      return {
        recentMovies: [...state.recentMovies, action.payload],
      };
    default:
      return state;
  }
};
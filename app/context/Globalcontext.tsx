"use client";
import { createContext, useEffect, useReducer, useState, useRef } from "react";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../../firebase.config";

import AppReducer from "./AppReducer";

const initialState = {
  bookmarked: JSON.parse(localStorage.getItem("bookmarked") as string)
    ? JSON.parse(localStorage.getItem("bookmarked") as string)
    : ([] as Array<any[]>),
  recentMovies: JSON.parse(localStorage.getItem("recent") as string)
    ? JSON.parse(localStorage.getItem("recent") as string)
    : ([] as Array<any[]>),
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props: any) => {
  const sidebarRef = useRef<any>(null);
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<string>("");

  const addMovieToBookmarked = (movie: any) => {
    dispatch({ type: "ADD_MOVIE_TO_BOOKMARKED", payload: movie });
  };

  const removeMovieFromBookmarked = (id: number) => {
    dispatch({ type: "REMOVE_FROM_BOOKMARKED", payload: id });
  };

  const addRecentMovieVisit = (movie: any) => {
    dispatch({ type: "ADD_RECENT_MOVIE", payload: movie });
  };

  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider)
  }

  useEffect(() => {
    localStorage.setItem("bookmarked", JSON.stringify(state.bookmarked));
    localStorage.setItem("recent", JSON.stringify(state.recentMovies));

    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });

    const handleClickOutside = (event: Event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      unsubscribe();
    };
  }, [state, sidebarRef]);

  return (
    <GlobalContext.Provider
      value={{
        bookmarked: state.bookmarked,
        recentMovies: state.recentMovies,
        // @ts-ignore
        addMovieToBookmarked,
        removeMovieFromBookmarked,
        addRecentMovieVisit,
        toggleSidebar,
        isSidebarOpen,
        sidebarRef,
        setIsSidebarOpen,
        signup,
        login,
        user,
        logout,
        googleSignIn,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

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
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import toast from "react-hot-toast";
import { UserProps } from "../types/firbase-user-types";
import AppReducer from "./AppReducer";



let isHasKey;

const initialState = {
  bookmarked: JSON.parse(localStorage.getItem("myBookmarks") as string)
    ? JSON.parse(localStorage.getItem("myBookmarks") as string)
    : [],
  recentMovies: [],
  error: "",
  bookmarkError: "",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props: any) => {
  const sidebarRef = useRef<any>(null);
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasKey, setHasKey] = useState(false);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const addMovieToBookmarked = async (movie: any) => {
    const movieId = movie.id.toString();
    const { background, date, id, poster_path, title } = movie;

    try {
      dispatch({ type: "ADD_MOVIE_TO_BOOKMARKED" });
      const bookmarkedItemRef = doc(db, `${user?.uid as string}`, movieId);
      const docSnap = await getDoc(bookmarkedItemRef);

      if (docSnap.exists()) {
        const existItem = docSnap.data();
        notifyError(existItem.title + "alreday an existing item");
        dispatch({ type: "ADD_BOOKMARK_FAIL" });
      } else {
        notifySuccess("adding" + title + "to bookmarks");
        await setDoc(doc(db, `${user?.uid as string}`, movieId), {
          background,
          date,
          id,
          poster_path,
          title,
        });
        notifySuccess(title + "has been successfully added");
        dispatch({ type: "ADD_MOVIE_TO_BOOKMARKED", payload: movie });
      }
    } catch (error: any) {
      notifyError("failed to add" + title + error);
      dispatch({
        type: "ADD_BOOKMARK_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const removeMovieFromBookmarked = async (id: number) => {
    const movieId = id.toString();
    try {
      dispatch({ type: "REMOVE_FROM_BOOKMARKED" });
      await deleteDoc(doc(db, `${user?.uid as string}`, movieId));
      notifySuccess(id + "was successfully deleted");
      dispatch({ type: "REMOVE_FROM_BOOKMARKED", payload: id });
      // location.reload();
    } catch (error: any) {
      notifyError("failed to remove" + id);
      dispatch({
        type: "ADD_BOOKMARK_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const getBookmarksFromFirebaseDB = async () => {
    const getBookmarkItems = async (db: any) => {
      const bookmarkCol = collection(db, `${user?.uid as string}`);
      const bookmarkSnapshot = await getDocs(bookmarkCol);
      const bookmarkList = bookmarkSnapshot.docs.map((doc) => doc.data());
      return bookmarkList;
    };

    try {
      let allBookmarks = await getBookmarkItems(db);
      state.bookmarked = allBookmarks;
      if (state.bookmarked) {
        const bookmarkStateString = JSON.stringify(state.bookmarked);
        localStorage.setItem("myBookmarks", bookmarkStateString);
      }
      setLoading(false);
    } catch (error: any) {
      dispatch({
        type: "GET_BOOKMARK_ERROR",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const checkForKey = () => {
    const value = localStorage.getItem("myBookmarks");
    const keyExists = value !== null;
    setHasKey(keyExists);
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
    return signInWithPopup(auth, googleAuthProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    checkForKey();
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
  }, [state, sidebarRef, hasKey]);

  return (
    <GlobalContext.Provider
      value={{
        bookmarked: state.bookmarked,
        recentMovies: state.recentMovies,
        error: state.error,
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
        getBookmarksFromFirebaseDB,
        loading,
        notifySuccess,
        notifyError,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

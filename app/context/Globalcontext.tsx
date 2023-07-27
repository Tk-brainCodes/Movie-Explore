import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useRef,
  useCallback,
} from "react";
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

let localStorageBookmarks =
  typeof window !== "undefined" ?
  JSON.parse(localStorage.getItem("myBookmarks") as string) : "" ;

const initialState = {
  bookmarked: localStorageBookmarks ? localStorageBookmarks : [],
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
  const [bookmarks, setBookmarks] = useState([]);


  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  //add bookmarks to firebase
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
        notifySuccess(`adding ${title} to bookmarks`);
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

  //remove bookmarks from firebase
  const removeMovieFromBookmarked = async (id: number) => {
    const movieId = id.toString();
    try {
      dispatch({ type: "REMOVE_FROM_BOOKMARKED", payload: id });
      await deleteDoc(doc(db, `${user?.uid as string}`, movieId));
      notifySuccess(`Movie Id: ${id} was successfully deleted`);
      // location.reload();
    } catch (error: any) {
      notifyError(`failed to remove  ${id}`);
      dispatch({
        type: "ADD_BOOKMARK_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  //get all bookmarks from firebase
   const getBookmarksFromFirebaseDB = useCallback(async () => {
     const getBookmarkItems = async (db: any) => {
       const bookmarkCol = collection(db, `${user?.uid as string}`);
       const bookmarkSnapshot = await getDocs(bookmarkCol);
       const bookmarkList = bookmarkSnapshot.docs.map((doc) => doc.data());
       return bookmarkList;
     };

     try {
       let allBookmarks = await getBookmarkItems(db);
      dispatch({ type: "ADD_MOVIE_TO_BOOKMARKED"})
      //  dispatch({ type: "ADD_MOVIE_TO_BOOKMARKED", payload: allBookmarks });
      state.bookmarked = allBookmarks;
      if (allBookmarks.length) {
         const bookmarkStateString = JSON.stringify(state.bookmarked);
         typeof window !== 'undefined' ? localStorage.setItem("myBookmarks", bookmarkStateString) : "";
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
   }, [state.bookmarked, db, dispatch])

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


  // useEffect(() => {
  //   getBookmarksFromFirebaseDB();
  // }, [state.bookmarked, getBookmarksFromFirebaseDB]);

  const handleClickOutside = useCallback((event: Event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
        bookmarks
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

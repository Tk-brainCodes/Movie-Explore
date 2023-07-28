"use client";
"use client";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleButton from "react-google-button";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import _ from "lodash";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  // @ts-ignore
  const { login, googleSignIn } = useContext(GlobalContext);
  const [firebaseError, setFirebaseError] = useState<string>("");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setFirebaseError("");
    const { email, password } = data;
    try {
      await login(email, password);
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      location.reload();
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };


  return (
   <div className=" bg-white">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <p className="flex items-center mb-6 text-2xl font-semibold text-gray-500">
      <SlideshowOutlinedIcon />
      Movie Explore   
      </p>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                     {firebaseError && (
        <h3 className='text-red-600 bg-red-100 px-2 py-2 rounded-md text-sm w-[20em]'>
          {firebaseError}
        </h3>
      )}
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                      <input type="email" {...register("email")} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" {...register("password")} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"  />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                          </div>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                      <div className='mt-[20px] w-full grid items-center justify-center'>
                     <GoogleButton type='light' onClick={handleGoogleSignIn} />
                    </div>
              </form>
          </div>
      </div>
  </div>
</div>
  );
}

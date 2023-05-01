"use client";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { useForm, SubmitHandler } from "react-hook-form";
import _ from "lodash";

type FormValues = {
  email: string;
  password: string;
};

export default function SignupForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  // @ts-ignore
  const { signup } = useContext(GlobalContext);
  const [firebaseError, setFirebaseError] = useState<string>("");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setFirebaseError("");
    const { email, password } = data;
    try {
      await signup(email, password);
      location.reload();
    } catch (error: any) {
      setFirebaseError(error.message);
    }
  };

  return (
    <form
      className='grid items-center justify-center flex-wrap flex-row px-2 py-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      {firebaseError && (
        <h3 className='text-red-600 bg-red-100 px-2 py-2 rounded-md text-sm w-[20em]'>
          {firebaseError}
        </h3>
      )}
      <input
        className='mt-[20px] w-[23em] px-2 py-2 rounded-full bg-blue-100 text-sm'
        type='email'
        {...register("email")}
        placeholder='jondeo@gmail.com'
      />
      <input
        className='mt-[20px] w-[23em] px-2 py-2 rounded-full bg-blue-100 text-sm'
        type='password'
        {...register("password")}
        placeholder='Enter password'
      />

      <input
        className='mt-[20px] mb-[20px] bg-orange-400 text-white px-2 py-2 rounded-full cursor-pointer'
        type='submit'
      />
    </form>
  );
}

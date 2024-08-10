import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn } from '@/auth';

export const SocialMediaLogin = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <form
        action={async () => {
          "use server"
          await signIn('github', { redirectTo: '/' });
        }}
        className="w-[45%] mx-auto"
      >
        <button
          type="submit"
          className="flex justify-center bg-primary text-white items-center w-full dark:bg-background dark:hover:bg-zinc-500 py-2 px-4 rounded"
        >
          Github <FaGithub className="ml-2" />
        </button>
      </form>

      <form
        action={async () => {
          "use server"
          await signIn('google', { redirectTo: '/' });
        }}
        className="w-[45%] mx-auto"
      >
        <button
          type="submit"
          className="flex justify-center bg-primary text-white items-center w-full dark:bg-background dark:hover:bg-zinc-500 py-2 px-4 rounded"
        >
          Google <FaGoogle className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default SocialMediaLogin;

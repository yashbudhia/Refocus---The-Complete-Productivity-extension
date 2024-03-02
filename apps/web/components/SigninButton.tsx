"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SigninButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 absolute right-3 top-4 items-center">
        <Image
          src={
            session.user.image
              ? session.user.image
              : "https://www.svgrepo.com/show/498301/profile-circle.svg"
          }
          alt={session.user.name ?? ""}
          width={40}
          height={40}
          className="rounded-3xl"
        />
        <button
          onClick={() => {
            signOut();
          }}
          className="text-red-600"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="absolute right-3 top-4 inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-3 focus:ring-slate-400 focus:ring-offset-3 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        &nbsp;&nbsp;&nbsp;Sign In&nbsp;&nbsp;&nbsp;
      </span>
    </button>
  );
}

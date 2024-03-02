"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface SessionMiddlewareProps {
  children: ReactNode;
}

export default function SessionMiddleware({
  children,
}: SessionMiddlewareProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

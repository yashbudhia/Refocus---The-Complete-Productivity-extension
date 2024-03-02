"use client";

import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";
import CircleGradient from "./ux/circle-gradient";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import About from "./About";

export default function LandingPage() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }
  // Missing block of code, please add the relevant code here.

  return (
    <>
      <Navbar />
      <div className="">
        <CircleGradient />
        <div className="h-[800px] flex flex-col justify-center items-center">
          <div className="font-semibold text-8xl flex flex-col justify-center items-center">
            <motion.div
              variants={textVariant(0.7)}
              initial="hidden"
              whileInView="show"
            >
              "Never Compromise
            </motion.div>
            <motion.div
              variants={textVariant(0.9)}
              initial="hidden"
              whileInView="show"
            >
              on Your{" "}
              <span className="text-transparent gradient-text-1 animate-gradient">
                Productivity
              </span>
            </motion.div>
            <motion.div
              variants={textVariant(1.1)}
              initial="hidden"
              whileInView="show"
            >
              again"
            </motion.div>
          </div>
        </div>
      </div>
      <About />
    </>
  );
}

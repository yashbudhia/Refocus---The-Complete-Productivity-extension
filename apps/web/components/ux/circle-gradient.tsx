"use client";
import {
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";
import React, { MouseEvent, useEffect, useState } from "react";

import { circleGraVariant } from "@/utils/motion";

export default function CircleGradient() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseSize = useMotionValue(0);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    console.log(latest, previous);
    if (latest > 65) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    let clientX2 = 740 + clientX / 10;

    let xPosition = clientX2 - left;
    let yPosition = clientY / 8 - top - 80;
    let size = 750 + clientY / 5;
    let opacity = 120 - clientY / 7;

    mouseX.set(xPosition);
    mouseY.set(yPosition);
    mouseSize.set(size);
  }

  return (
    <motion.div
      variants={circleGraVariant}
      initial="hidden"
      animate={hidden ? "hidden" : "show"}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 opacity-20 z-[1]"
      style={{
        background: useMotionTemplate`radial-gradient(${mouseSize}px circle at ${mouseX}px ${mouseY}px, rgb(95, 180, 245), transparent 80%)`,
      }}
    />
  );
}

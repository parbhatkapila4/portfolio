"use client";

import { useState } from "react";
import { motion } from "motion/react";
export default function Text3D({
  text,
  secondaryText,
  clickToggle,
  primaryClassName,
  secondaryClassName,
  containerClassName,
  bgColors,
  textColors,
}: {
  text: string | React.ReactNode;
  secondaryText?: string | React.ReactNode;
  clickToggle?: Boolean;
  primaryClassName?: string;
  secondaryClassName?: string;
  containerClassName?: string;
  bgColors?: [string, string];
  textColors?: [string, string];
}) {
  const [pointed, setPointed] = useState(false);
  return <motion.div
        id="text"
  
  
  ></motion.div>;
}

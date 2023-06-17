import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { api, RouterOutputs } from "~/utils/api";
import {IoCloseOutline}from 'react-icons/io5'

const Modal = ({
  tweet,
  isOpen,
  setOpen,
}: {
  tweet: RouterOutputs["example"]["getPosts"][number];
  isOpen: boolean;
  setOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!isOpen) return <></>;

  return (
    <div className=" z-30  fixed  inset-0  bg-black flex justify-center items-center">
      <motion.div
        layoutId={tweet.id}
        className="  relative   rounded-md w-full max-h-screen aspect-video  max-w-3xl      "
      >
        <h1  className=' cursor-pointer text-3xl float-right m-2 ' onClick={() => setOpen(!isOpen)}><IoCloseOutline/></h1>
        {tweet?.img && <Image src={tweet?.img} fill alt="" style={{objectFit:'contain',zIndex:-1}} />}
      </motion.div>
     </div>
  );
};

export default Modal;

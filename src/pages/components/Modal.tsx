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
  setOpen: any;
}) => {
  if (!isOpen) return <></>;
  return (
    <div className=" z-30  fixed   inset-0  backdrop-blur-md flex justify-center items-center">
      <motion.div
        layoutId={tweet.id}
        className="     relative rounded-md w-full max-w-3xl   aspect-video   inset-0   "
      >
        <h1  className=' text-2xl float-right m-2 ' onClick={() => setOpen(!isOpen)}><IoCloseOutline/></h1>
        {tweet?.img && <Image src={tweet?.img} fill alt="" style={{objectFit:'contain',zIndex:-1}} />}
      </motion.div>
    </div>
  );
};

export default Modal;

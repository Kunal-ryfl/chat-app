import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import { MoonLoader } from "react-spinners";
import { RouterOutputs } from "~/utils/api";

const Modal = ({
  tweet,
  isOpen,
  setOpen,
}: {
  tweet: RouterOutputs["example"]["getPosts"][number];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!isOpen) return <></>;
  const [loaded, setLoaded] = useState<boolean>(false);

  
  return (
    <div className=" z-30  fixed  inset-0 bg-black flex justify-center items-center">
      <motion.div
        layoutId={tweet.id}
        className="  relative  max-w-3xl border-neutral-700 w-full border-[1px] h-screen        "
      >
        {/* {!loaded &&  <MoonLoader className=" mx-auto my-auto "  color=" #00acee" />} */}
        <h1
          className=" cursor-pointer text-4xl  float-left m-2 "
          onClick={() => setOpen(!isOpen)}
        >
          <GrFormPreviousLink  className=" filter invert " />
        </h1>

        {tweet?.img && (
          <Image
            onLoadingComplete={() => setLoaded(true)}
            src={tweet?.img}
            fill
            alt=""
            style={{ objectFit: "contain", zIndex: -1 }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Modal;

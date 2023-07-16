import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import Image from "next/image";
import React from "react";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1m",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});

type user = {
  image: string | null;
  id: string;
  name: string | null;
};

const Comment = (comment: {
  caption: string;
  author: user;
  createdAt: Date;
}) => {
  return (
    <div className=" rounded-sm border-white/10 border-y-2 md:border-x-2   w-full md:w-[600px]    p-2 grid grid-cols-10 grid-row-10  ">
      <div className=" p-1   col-span-1 ">
        <Image
          src={comment?.author?.image || "/img"}
          height={70}
          width={40}
          unoptimized
          alt=""
          className=" mr-3  rounded-md border-white/10 border-2 "
        />
      </div>

      <div className=" grid grid-rows-10   col-span-9">
        <div className=" p-1 ">
          <p className=" text-sm  font-semibold "> {comment?.author?.name}</p>
          <p className=" text-[10px] font-extralight mb-2   ">
            {dayjs(comment?.createdAt).fromNow()}
          </p>
          <p className=" text-sm md:text-md  text-white/95 ">
            {comment?.caption}
          </p>
        </div>

        <div className="  relative   bg-purpe-500"></div>
      </div>
    </div>
  );
};

export default Comment;

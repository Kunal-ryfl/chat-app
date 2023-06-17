import CreateComment from "./CreateComment";
import Modal from "./Modal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { Post } from "~/types";
import { api, RouterOutputs } from "~/utils/api";

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

const PostContainer = ({
  tweet,
}: {
  tweet: RouterOutputs["example"]["getPosts"][number];
}) => {
  const hasLiked = tweet?.likes.length > 0;
  // console.log(hasLiked)
  const trpc = api.useContext();

  const { mutate: likeMutation } = api.example.likePost.useMutation({
    onMutate: async () => {
      // console.log("like fired")
      await trpc.example.getPosts.cancel();

      const prevPosts = trpc.example.getPosts.getData();

      //optimistic update

      trpc.example.getPosts.setData(undefined, (x) => {
        if (!x) return prevPosts;

        return x.map((post) => {
          if (post.id === tweet?.id) {
            return {
              ...post,
              likes: [{ userId: tweet?.userId }],
              _count: {
                likes: tweet._count?.likes + 1,
                comments: tweet._count?.comments,
              },
            };
          }
          return post;
        });
      });

      return { prevPosts };
    },

    onError: (err, id, context) => {
      toast.error(`An error occured when liking post`);
      if (!context) return;
      trpc.example.getPosts.setData(undefined, () => context.prevPosts);
    },

    onSettled: async () => {
      await trpc.example.getPosts.invalidate();
    },
  });

  const { mutate: unlikeMutation } = api.example.unlikePost.useMutation({
    onMutate: async () => {
      // console.log("unlike fired")
      await trpc.example.getPosts.cancel();

      const prevPosts = trpc.example.getPosts.getData();

      //optimistic update

      trpc.example.getPosts.setData(undefined, (x) => {
        if (!x) return prevPosts;

        return x.map((post) => {
          if (post.id === tweet?.id) {
            return {
              ...post,
              likes: [],
              _count: {
                likes: tweet._count.likes - 1,
                comments: tweet._count?.comments,
              },
            };
          }
          return post;
        });
      });

      return { prevPosts };
    },

    onError: (err, id, context) => {
      toast.error(`An error occured when unliking post`);
      if (!context) return;
      trpc.example.getPosts.setData(undefined, () => context.prevPosts);
    },

    onSettled: async () => {
      await trpc.example.getPosts.invalidate();
    },
  });

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <Modal setOpen={setOpen} isOpen={isOpen} tweet={tweet} />
      <motion.div
        className="    grid-row-10 grid w-full max-w-xl  grid-cols-10 rounded-sm  border-b-[1px]    border-neutral-700 p-2   "
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="  col-span-2   p-2  sm:col-span-1    ">
          <Link href={`/profile/${tweet?.user?.id}`}>
            {tweet?.user?.image && (
              <Image
                src={tweet?.user?.image || "/img"}
                height={10}
                width={10}
                unoptimized
                alt=""
                className=" mr-3 max-h-12  w-fit  rounded-full border-2 border-white/10 "
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAPoCAYAAAAoeFtqAAAFY0lEQVR42u3RMQ0AAAjAMPD/cGEXbEDSSVizqyZ0pgQCRECACAgQAQEiIECAABEQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAQECBIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACAgQIEAEBIiAABEQIAICxAYgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgQIAAERAgAgJEQIAICBAgQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQIAAASIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAgIECBABASIgQAQEiIAAsQGIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAgIECBABASIgAARECACAgQIEAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAARECBAgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAABAkRAgAgIEAEBIiBAbAAiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAICBAgQAQEiIEAEBIiAAAECRECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAEBAgQIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIECAABEQIAICRECACAgQG4AICBABASIgQAQEiIAICBABASIgQAQEiIAICBABASIgQAQEiIAICBABASIgQAQEiIAICBAB+dkCxfeXh1cuO7YAAAAASUVORK5CYII="
              />
            )}
          </Link>
        </div>

        <div className=" grid-rows-10 col-span-8  grid  sm:col-span-9">
          <div className=" p-1 ">
            <div className=" flex items-baseline  gap-2">
              <p className=" text-base  font-semibold "> {tweet?.user?.name}</p>
              <p className=" text-xs font-extralight   text-slate-400">
                {dayjs(tweet?.createdAt).fromNow()}{" "}
              </p>
            </div>

            <p className=" md:text-md my-1 text-sm   text-white/95 ">
              {tweet?.caption}
            </p>
          </div>

          <div className="   ">
            <motion.div
              layoutId={tweet?.id}
              onClick={() => setOpen(!isOpen)}
              className=" relative"
            >
              {tweet?.img && (
                <Image
                  src={tweet?.img}
                  className=" w-full  rounded  border-[1px]  border-neutral-700 aspect-[4/5]  "
                  unoptimized
                  alt="Postimg"
                  width={200}
                  height={100}
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAPoCAYAAAAoeFtqAAAFY0lEQVR42u3RMQ0AAAjAMPD/cGEXbEDSSVizqyZ0pgQCRECACAgQAQEiIECAABEQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAQECBIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACAgQIEAEBIiAABEQIAICxAYgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgQIAAERAgAgJEQIAICBAgQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQIAAASIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAgIECBABASIgQAQEiIAAsQGIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAgIECBABASIgAARECACAgQIEAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAARECBAgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAABAkRAgAgIEAEBIiBAbAAiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAICBAgQAQEiIEAEBIiAAAECRECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAEBAgQIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIECAABEQIAICRECACAgQG4AICBABASIgQAQEiIAICBABASIgQAQEiIAICBABASIgQAQEiIAICBABASIgQAQEiIAICBAB+dkCxfeXh1cuO7YAAAAASUVORK5CYII="
                />
              )}
            </motion.div>

            <div className="   flex items-center gap-4 py-2 text-slate-400  ">
              <motion.button
                className=" flex items-center gap-1"
                onClick={
                  !hasLiked
                    ? () => likeMutation({ postid: tweet?.id })
                    : () => unlikeMutation({ postid: tweet?.id })
                }
              >
                <AiFillHeart
                  className={!hasLiked ? " text-2xl" : " fill-red-500 text-2xl"}
                />
                {tweet?._count?.likes}
              </motion.button>

              <Link href={`/post/${tweet?.id}`}>
                <div className=" flex items-center gap-1">
                  <FiMessageCircle className="  text-2xl" />{" "}
                  {tweet?._count?.comments}{" "}
                </div>
              </Link>
            </div>

            <CreateComment tweet={tweet} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PostContainer;

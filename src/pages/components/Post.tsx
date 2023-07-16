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
import React, { useEffect, useState } from "react";
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
    m: "1 min",
    mm: "%d mins",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 Month",
    MM: "%d Months",
    y: "1 year",
    yy: "%d years",
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
  useEffect(() => {
    //Runs only on the first render
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <>
      <Modal setOpen={setOpen} isOpen={isOpen} tweet={tweet} />
      <motion.div
        className="    my-1    grid-row-10 grid w-full max-w-xl  grid-cols-10   md:border-b-[1px]     border-neutral-700    "
        layout
        //layout helps in achieving animation when new post is added so other components behave properly
        // u can check without it there is no proper co-ordination
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="    grid-rows-10 col-span-full py-2  grid  ">
          <div className="   ">
            <div className=" flex   px-2    gap-2">
              <Link href={`/profile/${tweet?.user?.id}`}>
                {tweet?.user?.image && (
                  <Image
                    src={tweet?.user?.image || "/img"}
                    height={10}
                    width={10}
                    unoptimized
                    alt="dp"
                    className="  h-8 w-8  rounded    border-neutral-400 "
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAPoCAYAAAAoeFtqAAAFY0lEQVR42u3RMQ0AAAjAMPD/cGEXbEDSSVizqyZ0pgQCRECACAgQAQEiIECAABEQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAQECBIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACAgQIEAEBIiAABEQIAICxAYgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgQIAAERAgAgJEQIAICBAgQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQIAAASIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAgIECBABASIgQAQEiIAAsQGIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAgIECBABASIgAARECACAgQIEAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAARECBAgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAABAkRAgAgIEAEBIiBAbAAiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAICBAgQAQEiIEAEBIiAAAECRECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAEBAgQIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIECAABEQIAICRECACAgQG4AICBABASIgQAQEiIAICBABASIgQAQEiIAICBABASIgQAQEiIAICBABASIgQAQEiIAICBAB+dkCxfeXh1cuO7YAAAAASUVORK5CYII="
                  />
                )}
              </Link>
              <div className=" flex  justify-between w-full py-2">
                <p className=" text-sm   "> {tweet?.user?.name}</p>
                <p className="  text-xs font-extralight  text-neutral-400">
                  {dayjs(tweet?.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <p className=" md:text-md my-1 mx-2 text-sm    text-neutral-200 ">
              {tweet?.caption}
            </p>
          </div>

          <div className="      ">
            <motion.div
              layoutId={tweet?.id} //layoutid helps in achieving this kind of animation like zoom
              onClick={() => setOpen(!isOpen)}
              className="  relative"
            >
              {tweet?.img && (
                <Image
                  src={tweet?.img}
                  className=" cursor-pointer w-full      border-neutral-700 aspect-[4/5]  "
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

            <div className="  p-2   flex items-center gap-4  text-slate-400  ">
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
              </motion.button>

              <div className=" flex items-center gap-1">
                <FiMessageCircle className="  text-2xl" />
              </div>
            </div>
            <div className=" text-neutral-400 flex gap-3 px-2 text-sm w-full ">
              <p>{tweet?._count?.likes} likes</p>
              <Link href={`/post/${tweet?.id}`}>
                <p>{tweet?._count?.comments} replies</p>
              </Link>
            </div>
            {/* <CreateComment tweet={tweet} /> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PostContainer;

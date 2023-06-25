import PostContainer from "../components/Post";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { PacmanLoader } from "react-spinners";
import { api } from "~/utils/api";

const Profile = () => {
  const ref = useRef(null);

  const { scrollY } = useScroll({
    // target: ref,
    // offset:['end start','start end']
  });

  const y = useTransform(scrollY, [0, 200], [0, -60]);
  const x = useTransform(scrollY, [0, 200], [0, -30]);
  const y1 = useTransform(scrollY, [0, 200], [0, -120]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.5]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);
    
  });
  const router = useRouter();
  const query = router.query.id as string;
  // console.log("Q = ", query);

  const { data: useSessionData } = useSession();
  const { data: user, isLoading: load1 } = api.example.getUser.useQuery({
    text: query,
  });
  const { data, isLoading: load2, error } = api.example.getPosts.useQuery();

  if (load1 || load2)
    return (
      <div className=" flex h-screen w-screen items-center justify-center">
        <PacmanLoader color="purple" />{" "}
      </div>
    );
  return (
    <AnimatePresence initial={false}>
      <div className=" min-h-screen  pb-16   text-white ">
        <motion.div
          style={{ y: y1 }}
          className="   grid  border-b-[1px] border-neutral-700    py-10  w-full  max-w-xl grid-cols-10  rounded-sm     "
        >
          {/* <motion.div className=" col-span-full  row-span-2  rounded-sm backdrop-blur-md "></motion.div> */}

          <motion.div
            style={{ y, scale }}
            className="     col-span-3 "
          >
            <Image
              src={
                user?.image ||
                "https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_960_720.png"
              }
              height={100}
              width={120}
              unoptimized
              alt=""
              className=" relative rounded-full border-2  border-white/10"
            />
          </motion.div>

          <motion.div style={{ y }} className="  col-span-7 py-4 pl-10">
            <motion.h1 className=" text-base md:text-2xl">
              {user?.name}
            </motion.h1>
            <motion.h1
              style={{ opacity }}
              className=" text-[11px] text-gray-400 md:text-sm"
            >
              {user?.email}
            </motion.h1>
            {user?.bio ? (
              <motion.h1
                style={{ opacity }}
                className=" text-[11px] text-gray-400 md:text-sm"
              >
                {user?.bio}
              </motion.h1>
            ) : (
              <>
                <motion.h1
                  style={{ opacity }}
                  className=" text-[11px] text-gray-400 md:text-sm"
                >
                  add bio
                </motion.h1>
              </>
            )}

            {/* {useSessionData?.user?.name === user?.name && (
            <>
              <label
                htmlFor="my-modal-3"
                className="btn float-right bg-inherit"
              >
                <AiOutlineEdit />
              </label>
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal  bg-slate-900/60 backdrop-blur-md">
                <div className="modal-box relative  rounded-md  bg-black">
                  <label
                    htmlFor="my-modal-3"
                    className="btn-sm btn-circle btn absolute right-2 top-2 bg-white text-black hover:bg-white/50"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold">Edit profile</h3>
                  <p className="py-4 text-white/60  "> comming soon!</p>
                </div>
              </div>
            </>
          )}  */}
          </motion.div>
        </motion.div>

        <div className="  py-4">
          <h1 className=" p-2  font-bold">Posts</h1>
<div className=" flex flex-col items-center gap-3">

          {data?.map(
            (post) =>
            post?.userId === query && (
              <PostContainer key={post?.id} tweet={post} />
              )
              )}
              </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Profile;

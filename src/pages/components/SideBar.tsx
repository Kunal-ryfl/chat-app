import React from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import clsx from "clsx";

const SideBar = () => {
  const { asPath } = useRouter();

  const { data: session } = useSession();
  if (session === null)
    return (
      <div className=" col-span-2  flex justify-start text-white opacity-0 xl:justify-end ">
        <div className=" top-10 my-4 hidden h-fit grid-cols-3   gap-3   rounded-sm  px-2 py-4 text-2xl   md:sticky md:grid md:grid-cols-1  ">
          <div className=" flex items-center justify-start "> </div>
          <div className="  items-centerjustify-start  flex "></div>
          <div className="  flex items-center justify-start "></div>
        </div>
      </div>
    );

  return (
    <div className="  flex justify-start text-white xl:justify-end ">
      <div className=" top-10 my-4 hidden h-fit grid-cols-3      rounded-sm  px-2 py-4 text-2xl   md:sticky md:grid md:grid-cols-1  ">
        <Link
          href={"/feed"}
          className={clsx(
            " flex items-center rounded-md p-2   text-3xl font-semibold  hover:bg-neutral-800 ",
            {
              " font-bold text-white ": asPath === "/feed",
              "  text-neutral-400": asPath !== "/feed",
            }
          )}
        >
          <AiOutlineHome />
          <h1 className=" mx-2 hidden text-base  xl:block">Home</h1>
        </Link>

        <Link
          href={"/"}
          className={clsx(
            " flex items-center rounded-md p-2  text-3xl font-semibold  hover:bg-neutral-800 ",
            {
              " font-bold text-white": asPath === "/",
              "  text-neutral-400": asPath !== "/",
            }
          )}
        >
          <IoMdNotificationsOutline />

          <h1 className=" mx-2 hidden  text-base font-semibold xl:block ">
            Notification
          </h1>
        </Link>

        <Link
          href={`/profile/${session?.user?.id}`}
          className={clsx(
            " flex  items-center rounded-md p-2 text-3xl  font-semibold  hover:bg-neutral-800 ",
            {
              " font-bold text-white":
                asPath === `/profile/${session?.user?.id}`,
              "  text-neutral-400": asPath !== `/profile/${session?.user?.id}`,
            }
          )}
        >
          <CgProfile />

          <h1 className=" mx-2  hidden text-base font-semibold xl:block">
            Profile
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;

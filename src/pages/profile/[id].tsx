import React from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import PostContainer from "../components/Post";
import { MoonLoader } from "react-spinners";
import { AiOutlineEdit } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const query = router.query.id as string;
  console.log("Q = ", query);

  const { data: useSessionData,} = useSession();
  const { data:user,isLoading:load1 } = api.example.getUser.useQuery({ text: query });
  const { data, isLoading:load2, error } = api.example.getPosts.useQuery();

 
  if (load1 || load2)
    return (
      <>
        <MoonLoader color="purple" className=" mx-auto my-10" />{" "}
      </>
    );
  return (
    <div className=" min-h-screen bg-black pb-16   text-white md:px-2">
      <div className="  grid   w-full  grid-cols-10 grid-rows-3 rounded-sm md:w-[600px]     ">
        <div className=" col-span-full  row-span-2  rounded-sm bg-white/10"></div>

        <div className="  col-span-3 row-span-1">
          <Image
            src={
              user?.image ||
              "https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_960_720.png"
            }
            height={100}
            width={120}
            unoptimized
            alt=""
            className=" relative -top-14 left-2 rounded-full border-2  border-white/10"
          />
        </div>

        <div className=" col-span-7 px-2 py-4">
          <h1 className=" text-base md:text-2xl">{user?.name}</h1>
          <h1 className=" text-[11px] text-gray-400 md:text-sm">
            {user?.email}
          </h1>
             {
              user?.bio ? 
          <h1 className=" text-[11px] text-gray-400 md:text-sm">
            {user?.bio}
          </h1>:
          <><h1 className=" text-[11px] text-gray-400 md:text-sm">
          add bio
        </h1></>
             }


       { useSessionData?.user?.name === user?.name &&
       <>
          <label htmlFor="my-modal-3" className="btn float-right bg-inherit">
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
       }

        </div>
      </div>

      <div className="  py-4">
        <h1 className=" p-2  font-bold">Posts</h1>

         
            {data?.map((post) => (
              post?.userId === query &&
              <PostContainer key={post?.id} tweet={post} />
            ))}
         
        
      </div>
    </div>
  );
};

export default Profile;

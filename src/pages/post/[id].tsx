import Comment from "../components/Comment";
import { useRouter } from "next/router";
import React from "react";
import { GiAstronautHelmet } from "react-icons/gi";
import { PacmanLoader } from "react-spinners";
import { api } from "~/utils/api";

const Page = () => {
  const router = useRouter();
  const query = router.query.id as string;
  console.log("Q = ", query);

  const { data, isLoading, error } = api.example.getPostById.useQuery(query);

  if (isLoading)
    return (
      <div className=" flex h-screen w-screen items-center justify-center">
        <PacmanLoader color="purple" />
      </div>
    );

  return (
    <div className="  min-h-screen py-2 pb-16 ">
      <div className=" w-full   px-2  py-2">
        <h1 className=" text-sm font-bold md:text-xl">Comments</h1>
      </div>

      {data && data.length < 1 && (
        <div className="  w-full p-2     md:w-[600px]">
          <GiAstronautHelmet className=" mx-auto  mt-20  text-9xl" />
          <h1 className=" text-center text-xl ">Silence here </h1>
          <p className=" my-5 text-center text-white/60">No comments</p>
        </div>
      )}

      {data &&
        data.length > 0 &&
        data?.map((comment) => (
          <Comment
            caption={comment?.caption}
            createdAt={comment?.createdAt}
            author={comment?.user}
            key={comment?.id}
          />
        ))}
    </div>
  );
};

export default Page;

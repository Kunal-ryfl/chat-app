import Comment from "../components/Comment";
import CreateComment from "../components/CreateComment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GiAstronautHelmet } from "react-icons/gi";
import { PacmanLoader } from "react-spinners";
import { api, RouterOutputs } from "~/utils/api";

const Page = () => {
  const router = useRouter();
  const query = router.query.id as string;
  // console.log("Q = ", query);

  const { data, isLoading, error } = api.example.getComById.useQuery(query);
  const { data: postData, isLoading: loading2 } =
    api.example.getPostById.useQuery(query);

  if (isLoading || loading2)
    return (
      <div className=" flex h-screen w-screen items-center justify-center">
        <PacmanLoader color="purple" />
      </div>
    );

  return (
    <div className="  min-h-screen px-2 py-2 pb-16 ">
      <div className=" border-b-[1px]  h-32 border-neutral-700 py-2 w-full flex max-w-xl">
        <div    className=" py-2 w-full">
          <h1 className="text-base  ">  {postData?.caption}</h1>
        </div>

        <div className="    relative shrink-0  w-40">
          {postData?.img && (
            <Image
              src={postData?.img}
              className=" cursor-pointer     border-neutral-700 aspect-[4/5]  "
              unoptimized
              alt="Postimg"
              fill
              style={{ objectFit: "contain" }}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAPoCAYAAAAoeFtqAAAFY0lEQVR42u3RMQ0AAAjAMPD/cGEXbEDSSVizqyZ0pgQCRECACAgQAQEiIECAABEQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAREQIAICRECACAgQAQECBIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACIiAABEQIAICRECACAgQIEAEBIiAABEQIAICxAYgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgAgJEQIAICBABASIgQIAAERAgAgJEQIAICBAgQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQAQEiIAAERAgAgJEQIAAASIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAiIgQAQEiIAAERAgAgIECBABASIgQAQEiIAAsQGIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAiIgAARECACAkRAgAgIECBABASIgAARECACAgQIEAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAAREAEBIiBABASIgAARECBAgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAgIEAEBIiBABASIgAABAkRAgAgIEAEBIiBAbAAiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAIiIEAEBIiAABEQIAICBAgQAQEiIEAEBIiAAAECRECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAERECACAgQAQEiIEAEBAgQIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIAICRECACAgQAQEiIECAABEQIAICRECACAgQG4AICBABASIgQAQEiIAICBABASIgQAQEiIAICBABASIgQAQEiIAICBABASIgQAQEiIAICBAB+dkCxfeXh1cuO7YAAAAASUVORK5CYII="
            />
          )}
        </div>
      </div>

      <div className=" w-full   px-2  py-2">
        <h1 className=" text-sm font-bold md:text-xl">Comments</h1>
      </div>

      {/* <CreateComment tweet={postData} /> */}

      {data && data?.length < 1 && (
        <div className="  w-full p-2     md:w-[600px]">
          <GiAstronautHelmet className=" mx-auto  mt-20  text-9xl" />
          <h1 className=" text-center text-xl ">Silence here </h1>
          <p className=" my-5 text-center text-white/60">No comments</p>
        </div>
      )}

      {data &&
        data?.length > 0 &&
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

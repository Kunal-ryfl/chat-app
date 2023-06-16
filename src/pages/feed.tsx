import React from "react";
import Create from "./components/Create";
import Post from "./components/Post";
import { api } from "~/utils/api";
import Skeleton from "./components/Skeleton";
import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "~/server/auth";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Feed = () => {
  const [listRef] = useAutoAnimate<HTMLDivElement>();
  const { data: posts, isLoading, error } = api.example.getPosts.useQuery();
  if (isLoading)
    return (
      <div className=" h-screen w-screen  overflow-hidden">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  return (
    <div className="  pb-16 ">
      <div className=" sticky top-0 z-20   mx-auto  w-full  max-w-2xl border-white/10 backdrop-blur-md">
        <div className="   mx-auto  w-full  max-w-2xl border-white/10 px-2   py-2">
          <h1 className=" text-base font-bold   md:text-xl">Home</h1>
        </div>
        <Create />
      </div>
      <div ref={listRef} className=" flex  flex-col items-center">
        {posts?.length &&
          posts?.map((post) => <Post tweet={post} key={post.id} />)}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: { destination: "/signin", permanent: false },
      props: {},
    };
  }

  return {
    props: { session }, // will be passed to the page component as props
  };
}
export default Feed;

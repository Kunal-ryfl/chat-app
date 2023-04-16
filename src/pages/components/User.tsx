import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import { MoonLoader,PacmanLoader } from 'react-spinners'

const User = () => {
  const { data,isLoading ,error} = api.example.getAllUser.useQuery();
  if(isLoading){
    return <MoonLoader color="purple" className=" mt-10" size={40} />
  }

  if(error){
    return <></>
  }

  return (
    <>
    <div className=" hidden  sticky top-4 lg:block mt-10 w-52 rounded-sm  bg-white/5 p-2 text-slate-300">
      <h1 className="  text-xl font-semibold"> Users </h1>

      {data?.map((x) => (
        <div className=" my-3  grid  grid-cols-10   " key={x.id}>
          <div className=" col-span-2">
            <Image
              src={x?.image || "/fsd"}
              height={100}
              width={100}
              alt="dp"
              className="w-14 rounded-full"
            />
          </div>
          <div className=" col-span-8 p-2">
            <h1 className=" text-sm">{x?.name}</h1>
          </div>
        </div>
      ))}
    </div>

    <div className=" hidden lg:block mt-4 sticky  top-72  p-2 text-slate-300 rounded-xl w-52">
      <p className="text-xs">Developed by Kunal Bhardwaj © 2023</p>
    </div>
    </>
  );
};

export default User;

import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allPostsOutput = RouterOutput["example"]["getPosts"];

export type Post = allPostsOutput[number];

export const postInput = z
  .string({
    required_error: "Describe your post",
  })
  .min(1)
  .max(50);


import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allPostsOutput = RouterOutput["example"]["getPosts"];

export type Post = allPostsOutput[number];

export const postInput = z.object({ data: z.string({
    required_error: "Describe your post",
  })
  .min(1)
  .max(50)
  ,img : z.string().nullable() 
}
);

export const commentInput =
 z.object({comment:z.string({required_error: "Describe your post",}).min(1).max(100),
postId:z.string().min(1)}
);


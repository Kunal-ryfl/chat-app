import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "./server/api/root";

// type RouterOutput = inferRouterOutputs<AppRouter>;
// type allTodosOutput = RouterOutput["example"]["all"];

// export type Todo = allTodosOutput[number];

export const postInput = z
  .string({
    required_error: "Describe your post",
  })
  .min(1)
  .max(50);
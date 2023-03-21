import { z } from "zod";
import { postInput } from "~/types";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const exampleRouter = createTRPCRouter({
  

  getPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
        
      ],
    });
  }),


   
  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),


   
  
  getUserPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
        
        
      ],

      where:{
        userId: ctx.session.user.id,
      }
    });
  }),


  

  getUser:protectedProcedure.input(z.object({ text: z.string() })).query(async({ctx,input})=>{

    return ctx.prisma.user.findUnique({
      
      
      
      where: {

        id:input.text
      },
    })

  }),

  create : protectedProcedure.input(postInput).mutation(async({ctx,input})=>{

    return ctx.prisma.post.create({
      data: {
        caption: input,
        
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
      
    });
  
  }),


  getLikes: protectedProcedure.input( z.object({ id: z.string() }) ).query(({ ctx,input }) => {
    return   ctx.prisma.likedPost.count({
      where: {
        postId:input.id
      },
  
  });
}),
  

Liked: protectedProcedure.input( z.object({ id: z.string() }) ).query(({ ctx,input }) => {
    return   ctx.prisma.likedPost.findFirst({
      where: {
        postId:input.id,
        userId:ctx.session.user.id,
      },
  
  });
}),
  

  
  toggleLike: protectedProcedure.input( z.object({ postid:z.string() }) ).mutation(async({ ctx,input }) => {

     const liked =  await ctx.prisma.user.findFirst({
      where: {
        
        
        id:ctx.session.user.id,
        likedposts:{
          some:{
            postId:input.postid,
          }
        },
      },
    })
    

    return liked === null? ctx.prisma.likedPost.create({
      data: {
        Post:{
          connect:{
            id:input.postid,
          },
        },
        
        user:{
          connect:{
            id:ctx.session.user.id,
          },
        },
        
      },
  
  }) : ctx.prisma.likedPost.delete({
    where: {
      postId_userId:{
        userId:ctx.session.user.id,
        postId:input.postid,
      }
    },

  });
}),

  


  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});

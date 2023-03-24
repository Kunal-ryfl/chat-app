import { z } from "zod";
import { postInput } from "~/types";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";



export const exampleRouter = createTRPCRouter({
  

  getPosts: publicProcedure.query(async({ ctx }) => {
    
    const posts =  await ctx.prisma.post.findMany({
     orderBy: [
        {
          createdAt: 'desc',
        },
        
      ],

      include: {
        likes: {
          where: {
            userId:ctx.session?.user?.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },

        user: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },

      },
    

    });

    return  posts.map(({ id,img,user, caption,createdAt, userId ,likes,_count }) => ({ id,img,user,createdAt, caption, userId ,likes,_count }))
      // todos.map(({ id, text, done }) => ({ id, text, done }))
    
  }),


   
  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  
  getPostById: publicProcedure.input(z.object({postid:z.string()})).query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where:{
        id:ctx.session?.user.id,
      },
      include: {
        likes: {
          where: {
            userId:ctx.session?.user?.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    
    });
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
      },
      include: {
        likes: {
          where: {
            userId:ctx.session?.user?.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },

        user: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },

      },
    
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
  

  
  likePost: protectedProcedure.input( z.object({ postid:z.string() }) ).mutation(async({ ctx,input }) => {


    return  ctx.prisma.likedPost.create({
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
  
  });
}),
  

unlikePost: protectedProcedure.input( z.object({ postid:z.string() }) ).mutation(async({ ctx,input }) => {

    return   ctx.prisma.likedPost.delete({
    where: {
      postId_userId:{
        userId:ctx.session.user.id,
        postId:input.postid,
      }
    },

  });
}),

  
});

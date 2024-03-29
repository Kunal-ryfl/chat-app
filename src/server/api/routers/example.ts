import { z } from "zod";
import { postInput,commentInput } from "~/types";
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
            comments:true,
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


   
  
  
  getUserPosts: protectedProcedure.input(z.object({userId:z.string()})).query(({ ctx,input }) => {
    return ctx.prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
        
        
      ],

      where:{
        userId: input.userId,
      },
      include: {
        likes: {
          where: {
            userId:input.userId,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments:true,
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


  getAllUser:protectedProcedure.query(async({ctx})=>{
    return ctx.prisma.user.findMany();
  }),


  create : protectedProcedure.input(postInput).mutation(async({ctx,input})=>{

    return ctx.prisma.post.create({
      data: {
        caption: input.data,
        img:input.img,
  
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
      
    });
  
  }),
  
  createComment : protectedProcedure.input(commentInput).mutation(async({ctx,input})=>{
    return ctx.prisma.comment.create({
      data: {
        caption: input.comment,
        
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
        Post:{
          connect:{
            id:input.postId
          }
        }
      },
    });
  
  }),

  

  getPostById:protectedProcedure.input(z.string()).query(async({ctx,input})=>{
 
    return ctx.prisma.post.findUnique({
      where:{
        id:input
      },
      include:{
        user: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
   
    })
     
  }),  
  
  getComById:protectedProcedure.input(z.string()).query(async({ctx,input})=>{
 
    return ctx.prisma.comment.findMany({
      where:{
        Postid:input
      },
      include:{
        user: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
    })
     
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

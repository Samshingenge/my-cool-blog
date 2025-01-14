"use server";

import { revalidatePath } from "next/cache";
import prisma from "../app/lib/db";
import { Prisma } from "@prisma/client";

export async function createPost(formData : FormData){

    try {
       await prisma.post.create({
        data: {
            title: formData.get("title") as string,
            slug: (formData.get("title")as string) 
            .replace(/\s+/g, "-")
            .toLowerCase(),
            content: formData.get("content") as string,
            author : {
                connect : {
                    email : 'johndoe@gmail.com',
                }
            }
        }
    });
    
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === "P2002"){
                console.log("Post already exists")
            }
        }
    }
    revalidatePath("/posts")
}

 
export async function editPost(formData: FormData, id: string){
    await prisma.post.update({
        where : { id },
        data : {
            title : formData.get("title") as string,
            slug: (formData.get("title") as string)
            .replace(/\s+/g, "-")
            .toLocaleLowerCase(),
            content : formData.get("content") as string,
        } 
    });
    
}

export async function deletePost(id: string){
    await prisma.post.delete({
        where : { id }
    })  
}
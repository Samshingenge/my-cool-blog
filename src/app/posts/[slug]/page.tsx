// src/app/posts/[slug]/page.tsx

import prisma from "@/app/lib/db";

type tParams = { slug: string[] }; // Define params as a regular object

export default async function PostPage(props: { params: tParams }) {
    const { slug } = props.params; // Access slug directly
    const post = await prisma.post.findUnique({
        where: {
            slug: slug[0], // Use slug[0] if slug is an array
        },
    });

    // Handle the case where the post is not found
    if (!post) {
        return <div>Post not found</div>; // You can customize this as needed
    }

    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <p>{post.content}</p>
        </main>
    );
}
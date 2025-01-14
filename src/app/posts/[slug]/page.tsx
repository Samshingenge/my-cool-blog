import prisma from "@/app/lib/db";





export default async function PostPage({ params }: { params: { slug: string } }) {

    const post = await prisma.post.findUnique({
        where: {
            slug: params.slug,
        }
    });

    // Handle the case where the post is not found
    if (!post) {
        return <div>Post not found</div>; // You can customize this as needed
    }

    return(
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">{post?.title}</h1>
            <p>{post?.content}</p>
        </main>
    )
    
}
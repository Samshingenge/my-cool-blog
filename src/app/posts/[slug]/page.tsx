import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Use Next.js built-in types
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    return {
        title: `Post - ${params.slug}`,
    };
}

export async function generateStaticParams() {
    const posts = await prisma.post.findMany({
        select: {
            slug: true,
        },
    });

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await prisma.post.findUnique({
        where: {
            slug: params.slug,
        },
    });

    if (!post) {
        notFound();
    }

    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <p>{post.content}</p>
        </main>
    );
}
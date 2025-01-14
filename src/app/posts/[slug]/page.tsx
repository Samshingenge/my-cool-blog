import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

// Add 'generateStaticParams' for static generation (optional but recommended)
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

export default async function PostPage({ params }: Props) {
    const post = await prisma.post.findUnique({
        where: {
            slug: params.slug,
        }
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
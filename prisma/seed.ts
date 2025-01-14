import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: "Post 1",
        slug: "post-1",
        content: "Post 1 content",
        author: {
            connectOrCreate: {
                where: {
                    email: "johndoe@gmail.com"
                },
                create: {
                    email: "johndoe@gmail.com",
                    hashedPassword: "hashedPassword",
                }       
            }
        }
    },
    {
        title: "Post 2",
        slug: "post-2",
        content: "Post 2 content",
        author: {
            connectOrCreate: {
                where: {
                    email: "johndoe@gmail.com"
                },
                create: {
                    email: "johndoe@gmail.com",
                    hashedPassword: "hashedPassword",
                }       
            }
        }
    }
]
async function main() {
console.log(`Start seeding ...`)

for (const post of initialPosts) {
    const newPost = await prisma.post.create({ data: post })
    console.log(`Created post with id: ${newPost.id}`)
}

console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
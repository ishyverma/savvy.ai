import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export const initialUser = async () => {
    const user = await currentUser();

    if (!user || !(user.fullName)) {
        redirect("/sign-in")
    }

    const isUserPresent = await prisma.user.findUnique({
        where: {
            userId: user.id
        }
    })

    if (!isUserPresent) {
        const newUser = await prisma.user.create({
            data: {
                name: user.fullName,
                userId: user.id,
                email: user.emailAddresses[0].emailAddress,
                imageUrl: user.imageUrl,
            }
        })
        return newUser
    }

    return isUserPresent
}
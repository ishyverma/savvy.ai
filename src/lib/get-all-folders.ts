import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export const getFolders = async () => {
    const user = await currentUser();

    if(!user) {
        redirect("/sign-in")
    }

    const folders = await prisma.folder.findMany({
        where: {
            userId: user.id
        }
    })

    return folders
}
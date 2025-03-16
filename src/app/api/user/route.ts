import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = await currentUser();
    const dbUser = await prisma.user.findUnique({
        where: {
            userId: user?.id
        }
    })

    if (!dbUser) {
        return NextResponse.json({
            message: "There are no users"
        })
    }
    
    return NextResponse.json({
        user: dbUser
    })
}
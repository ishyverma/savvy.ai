import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { link, userId, folderId } = await req.json();;

    if (!folderId) {
        const tweet = await prisma.tweet.create({
            data: {
                link,
                userId
            }
        })
        return NextResponse.json({
            tweet
        })
    }

    const tweetWithFolder = await prisma.tweet.create({
        data: {
            link,
            folderId,
            userId
        }
    })
    return NextResponse.json({
        tweetWithFolder
    })
}
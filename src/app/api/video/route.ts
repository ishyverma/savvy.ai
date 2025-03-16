import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { link, userId, folderId } = await req.json();
    if (!folderId) {
        const video = await prisma.video.create({
            data: {
                link,
                userId
            }
        })
        return NextResponse.json({
            video
        })
    }

    const videoWithFolder = await prisma.video.create({
        data: {
            link,
            userId,
            folderId
        }
    })

    return NextResponse.json({
        videoWithFolder
    })
}
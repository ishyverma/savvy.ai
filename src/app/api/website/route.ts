import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { link, userId, folderId } = await req.json();
  if (!folderId) {
    const website = await prisma.website.create({
      data: {
        link,
        userId,
      },
    });
    return NextResponse.json({
      website,
    });
  }

  const websiteWithFolder = await prisma.website.create({
    data: {
      link,
      userId,
      folderId,
    },
  });

  return NextResponse.json({
    websiteWithFolder,
  });
}

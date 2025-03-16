import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { folderId, userId, description } = await req.json();
  console.log(folderId)
  if (!folderId) {
    const note = await prisma.note.create({
      data: {
        description,
        userId,
      },
    });
    return NextResponse.json({
      note,
    });
  }

  const noteWithFolder = await prisma.note.create({
    data: {
      description,
      userId,
      folderId,
    },
  });

  return NextResponse.json({
    noteWithFolder,
  });
}

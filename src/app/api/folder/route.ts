import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const user = await currentUser();

  const folders = await prisma.folder.findMany({
    where: {
      userId: userId!,
    },
  });

  return NextResponse.json({ folders });
}

export async function POST(req: NextRequest) {
  const { userId, name, isPublic } = await req.json();

  const folder = await prisma.folder.create({
    data: {
      name,
      userId,
      isPublic,
    },
  });

  return NextResponse.json({
    folder,
  });
}

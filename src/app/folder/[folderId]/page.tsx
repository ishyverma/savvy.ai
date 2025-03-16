import CreateMemory from "@/components/main/create-memory";
import Header from "@/components/main/header";
import NotesMainCard from "@/components/main/notes-main-card";
import SpaceMainCard from "@/components/main/space-main-card";
import TweetMainCard from "@/components/main/tweet-main-card";
import WebsiteMainCard from "@/components/main/website-main-card";
import YtMainCard from "@/components/main/yt-main-card";
import prisma from "@/db";
import { Note, Tweet, Video, Website } from "@prisma/client";
import React from "react";

type Props = {
  params: {
    folderId: string;
  };
};

const FolderPage = async ({ params }: Props) => {
  const folder = await prisma.folder.findFirst({
    where: {
      id: params.folderId,
    },
    select: {
      tweets: true,
      notes: true,
      videos: true,
      websites: true,
    },
  });

  if (!folder) {
    return null;
  }

  const renderOnScreen = [
    ...(folder?.notes ?? []),
    ...(folder?.tweets ?? []),
    ...(folder?.videos ?? []),
    ...(folder?.websites ?? []),
  ];
  renderOnScreen.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div>
      <Header />
      <div className="py-20 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
        {renderOnScreen.map((item) => (
          <div key={item.id}>
            {item.type === "Note" && (
              <NotesMainCard
                note={{
                  id: item.id,
                  userId: item.userId,
                  type: "Note",
                  description: (item as Note).description,
                  folderId: item.folderId,
                  createdAt: item.createdAt,
                }}
              />
            )}
            {item.type === "Video" && (
              <YtMainCard
                video={{
                  id: item.id,
                  userId: item.userId,
                  type: "Video",
                  link: (item as Video).link,
                  folderId: item.folderId,
                  createdAt: item.createdAt,
                }}
              />
            )}
            {item.type === "Tweet" && (
              <TweetMainCard
                tweet={{
                  id: item.id,
                  userId: item.userId,
                  type: "Tweet",
                  link: (item as Tweet).link,
                  folderId: item.folderId,
                  createdAt: item.createdAt,
                }}
              />
            )}
            {item.type === "Website" && (
              <WebsiteMainCard
                website={{
                  id: item.id,
                  userId: item.userId,
                  type: "Website",
                  link: (item as Website).link,
                  folderId: item.folderId,
                  createdAt: item.createdAt,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderPage;

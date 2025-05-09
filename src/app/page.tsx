import CreateMemory from "@/components/main/create-memory";
import Header from "@/components/main/header";
import NotesMainCard from "@/components/main/notes-main-card";
import SpaceMainCard from "@/components/main/space-main-card";
import TweetMainCard from "@/components/main/tweet-main-card";
import WebsiteMainCard from "@/components/main/website-main-card";
import YtMainCard from "@/components/main/yt-main-card";
import prisma from "@/db";
import { initialUser } from "@/lib/initial-user";
import { Note, Tweet, Type, Video, Website } from "@prisma/client";

const colors = [
  "#297373",
  "39393A",
  "#6B4B3E",
  "#565264",
  "#465C69",
  "#363457",
  "#735290",
  "#684551",
  "#402E2A",
  "#6A5837",
  "#16697A",
  "#4A1942",
  "#713E5A",
  "#183059",
  "#2B3D41",
];

export default async function Home() {
  const user = await initialUser();
  const allThings = await prisma.user.findUnique({
    where: {
      userId: user.userId,
    },
    select: {
      notes: true,
      tweets: true,
      videos: true,
      websites: true,
      folders: true,
    },
  });

  if (!allThings) {
    return null;
  }

  const renderOnScreen = [
    ...(allThings?.notes ?? []),
    ...(allThings?.tweets ?? []),
    ...(allThings?.videos ?? []),
    ...(allThings?.websites ?? []),
  ];
  renderOnScreen.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div>
      <Header />
      <div className="py-20 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
        <CreateMemory />
        {allThings.folders.map((folder) => (
          <SpaceMainCard folder={folder} />
        ))}
        {renderOnScreen.filter(item => item.folderId === null).map((item) => (
          <div key={item.id}>
            {item.type === "Note" && item.folderId === null && (
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
            {item.type === "Video" && item.folderId === null && (
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
            {item.type === "Tweet" && item.folderId === null && (
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
            {item.type === "Website" && item.folderId === null && (
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
}

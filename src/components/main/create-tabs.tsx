"use client";

import { cn } from "@/lib/utils";
import { Bird, Folder, Link2, Loader2, Notebook, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import WebsiteCard from "./website-card";
import NotesCard from "./noted-card";
import TweetCard from "./tweet-card";
import VideoCard from "./video-card";
import FolderCard from "./folder-card";
import type { User } from "@prisma/client";
import axios from "axios";


type Props = {};

type TabsType = "website" | "notes" | "tweet" | "video" | "folder";

const CreateTabs = (props: Props) => {
  const [tab, setTab] = useState<TabsType>("website");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios.get("/api/user").then(response => {
      setUser(response.data.user)
    })
  }, [user])

  if (!user) {
    return <div className="flex items-center gap-2 justify-center">
      <Loader2 className="animate-spin w-5 h-5" /> <span>Loading...</span>
    </div>
  }

  return (
    <div className="flex gap-3">
      <div className="w-1/3 border h-fit rounded-lg p-2 space-y-2 overflow-auto darkbg-[#27272A] bg-[#FAFBFC] dark:bg-[#27272A]">
          {/* Website */}
          <div onClick={() => setTab("website")} className={cn(
            `p-2 rounded-lg  dark:hover:bg-[#3F3F45] hover:bg-gray-200 transition-all border border[#443F3C]`,
            tab === 'website' && "dark:bg-[#2D2D3F] bg-[#EBEBFB] hover:bg-[#EBEBFB] dark:border-[#383863] border-[#CFD0FA] border"
          )}>
            <Link2 className="text-[#6466F1] w-4 h-4" />
            <p className="font-satoshi font-medium mt-1">Website</p>
            <p className="mt-1 font-satoshi text-sm">Add a website URL</p>
          </div>
          {/* Notes */}
          <div onClick={() => setTab("notes")} className={cn(
            `p-2 rounded-lg dark:hover:bg-[#3F3F45] hover:bg-gray-200 transition-all border`,
            tab === 'notes' && "border dark:bg-[#293634] bg-[#E8F4F0] hover:bg-[#E8F4F0] dark:border-[#2B5143] border-[#C4E9DA]"
          )}>
            <Notebook className="text-[#12B981] w-4 h-4" />
            <p className="font-satoshi font-medium mt-1">Note</p>
            <p className="mt-1 font-satoshi text-sm">Add a note</p>
          </div>
          {/* Tweet */}
          <div onClick={() => setTab("tweet")} className={cn(
            `p-2 rounded-lg dark:hover:bg-[#3F3F45] hover:bg-gray-200 transition-all border`,
            tab === 'tweet' && "border dark:bg-blue-950/50 bg-blue-100 hover:bg-blue-100 dark:border-blue-900/50 border-blue-300"
          )}>
            <Bird className="text-blue-700 w-4 h-4" />
            <p className="font-satoshi font-medium mt-1">Tweet</p>
            <p className="mt-1 font-satoshi text-sm">Add a tweet URL</p>
          </div>
          {/* Video */}
          <div onClick={() => setTab("video")} className={cn(
            `p-2 rounded-lg dark:hover:bg-[#3F3F45] hover:bg-gray-200 transition-all border`,
            tab === 'video' && "border dark:bg-[#312D3F] bg-[#EFEBFB] hover:bg-[#EFEBFB] dark:border-[#433764] border-[#DACFFB]"
          )}>
            <Video className="text-[#7450C9] w-4 h-4" />
            <p className="font-satoshi font-medium mt-1">Video</p>
            <p className="mt-1 font-satoshi text-sm">Add a youtube video URL</p>
          </div>
          {/* Folder */}
          <div onClick={() => setTab("folder")} className={cn(
            `p-2 rounded-lg dark:hover:bg-[#3F3F45] hover:bg-gray-200 transition-all border`,
            tab === 'folder' && "border dark:bg-[#3D2A30] bg-[#FBE8EC] hover:bg-[#FBE8EC] dark:border-[#622F3A] border-[#FAC8D1]"
          )}>
            <Folder className="dark:text-white w-4 h-4 text-black" />
            <p className="font-satoshi font-medium mt-1">Folder</p>
            <p className="mt-1 font-satoshi text-sm">
              Add a new folder to your brain
            </p>
          </div>
      </div>
      <div className="flex-1">
        {tab === "website" && <WebsiteCard user={user} />}
        {tab === "notes" && <NotesCard user={user} />}
        {tab === "tweet" && <TweetCard user={user} />}
        {tab === "video" && <VideoCard user={user} />}
        {tab === "folder" && <FolderCard user={user} />}
      </div>
    </div>
  );
};

export default CreateTabs;

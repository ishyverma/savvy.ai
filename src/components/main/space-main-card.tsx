"use client";

import type { Folder, User } from "@prisma/client";
import { FolderIcon, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  folder: Folder;
};

const SpaceMainCard = ({ folder }: Props) => {
  const router = useRouter();
  return (
    <div className="space-y-2 hover:cursor-pointer inline-grid grid-rows-1">
        <div
          onClick={() => {
            router.push(`/folder/${folder.id}`);
          }}
          key={folder.id}
          className="p-4 border rounded-md space-y-2 h-52 flex flex-col justify-between"
        >
          <div>
            <p className="flex items-center gap-1 font-satoshi">
              Folder <FolderIcon className="w-4 h-4" />
            </p>
            <p className="text-xl font-satoshi font-semibold mb-2 mt-5">
              {folder.name}
            </p>
          </div>
          {!folder.isPublic && (
            <div className="bg-[#3F2D25] text-[#F7BE2E] text-sm py-1 px-2 rounded-lg font-satoshi w-fit flex items-center gap-1">
              <Lock className="w-4 h-4" /> Private
            </div>
          )}
        </div>
    </div>
  );
};

export default SpaceMainCard;

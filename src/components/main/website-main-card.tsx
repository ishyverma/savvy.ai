import type { Website } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  website: Website;
};

const colors = ["#297373", "#39393A", "#6B4B3E", "#565264", "#465C69"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const WebsiteMainCard = ({ website }: Props) => {
  return (
    <div className="space-y-2 text-white">
        <div
          key={website.id}
          className="p-4 rounded-2xl space-y-2 min-w-64 min-h-52 flex flex-col justify-between"
          style={{ backgroundColor: getRandomColor() }}
        >
          <div>
            <p className="text-lg font-semibold font-satoshi">Website</p>
            <p className="text-xs mt-2">{website.link}</p>
          </div>
          <Link
            target="_blank"
            href={website.link}
            className="font-satoshi font-semibold text-xs line-clamp-1 flex gap-1 w-fit items-center"
          >
            <p className="hover:underline">go to website</p>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
    </div>
  );
};

export default WebsiteMainCard;

import prisma from "@/db";
import { Tweet, User } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  tweet: Tweet;
};

const colors = ["#297373", "#39393A", "#6B4B3E", "#565264", "#465C69"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const TweetMainCard = async ({ tweet }: Props) => {
  return (
    <div className="space-y-2">
        <div
          key={tweet.id}
          className="p-4 rounded-2xl space-y-2 min-w-64 min-h-52 flex flex-col justify-between"
          style={{ backgroundColor: getRandomColor() }}
        >
          <div>
            <p className="text-lg font-semibold font-satoshi">x.com</p>
            <p className="text-sm font-satoshi">Saved from x.com</p>
          </div>
          <Link
            target="_blank"
            href={tweet.link}
            className="font-satoshi font-semibold text-xs line-clamp-1 flex gap-1 w-fit items-center"
          >
            <p className="hover:underline">go to post</p>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
    </div>
  );
};

export default TweetMainCard;

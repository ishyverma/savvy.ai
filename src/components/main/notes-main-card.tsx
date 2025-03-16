import type { Note } from "@prisma/client";
import React from "react";

type Props = {
  note: Note
};

const colors = ["#297373", "#39393A", "#6B4B3E", "#565264", "#465C69"];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

const NotesMainCard = async ({ note }: Props) => {
  return <div className="space-y-2">
      <div key={note.id} className="flex flex-col justify-between text-white p-4 min-w-64 min-h-52 gap-4 rounded-2xl" style={{ backgroundColor: getRandomColor() }}>
        <p className="text-lg font-satoshi font-semibold">{note.description}</p>
        <p className="text-sm">{note.createdAt.toDateString()}</p>
      </div>
  </div>;
};

export default NotesMainCard;

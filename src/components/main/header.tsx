"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "../logo/logo";
import { UserButton } from "@clerk/nextjs";
import KeyMap from "./keymap";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModeToggle } from "./mode-toggle";
import CreateTabs from "./create-tabs";

const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "c") {
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex justify-between items-center py-2 px-10 border-b fixed w-[100vw] backdrop-blur-md bg-opacity-50 bg-transparent z-50 bg-black">
      <div className="p-2 rounded-xl border-2">
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="cursor-pointer">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <KeyMap />
            </DialogTrigger>
            <DialogContent className="h-[80vh] w-[80vw] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Create Memory</DialogTitle>
              </DialogHeader>
              <div className="h-[80vh]">
                <CreateTabs />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "h-8 w-8",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;

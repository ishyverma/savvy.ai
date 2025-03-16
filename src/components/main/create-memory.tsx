"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Folder } from "lucide-react";

import { motion } from "motion/react";

const CreateMemory = () => {
  const triggerCopyCommand = () => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

    const event = new KeyboardEvent("keydown", {
      key: "c",
      code: "KeyC",
      bubbles: true,
      cancelable: true,
      metaKey: isMac,
      ctrlKey: !isMac,
    });

    document.dispatchEvent(event);
  };

  return (
    <>
      <Card className="w-full border border-dashed relative h-52">
        <CardHeader>
          <CardTitle>Add to your Memory</CardTitle>
          <CardDescription>Future You will thank you for this!</CardDescription>
        </CardHeader>
        <CardContent className="text-white tracking-tight"></CardContent>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
            filter: "blur(10px)",
          }}
          whileHover={{
            opacity: 1,
            scale: 1.1,
            filter: "blur(0px)",
          }}
          className="absolute flex-1 inset-0 rounded-lg border border-dashed dark:bg-[#09090B] bg-white p-4 flex gap-4 font-satoshi tracking-tight font-semibold"
        >
          <div onClick={triggerCopyCommand} className="flex-1 flex flex-col gap-1 items-center justify-center border border-dashed dark:hover:bg-neutral-900 transition-all rounded-lg cursor-pointer hover:bg-gray-100">
            <Brain /> Memory
          </div>
          <div onClick={triggerCopyCommand} className="flex-1 flex flex-col gap-1 items-center justify-center border border-dashed rounded-lg dark:hover:bg-neutral-900 hover:bg-gray-200 transition-all cursor-pointer">
            <Folder /> Folder
          </div>
        </motion.div>
      </Card>
    </>
  );
};

export default CreateMemory;

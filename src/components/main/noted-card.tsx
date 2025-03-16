"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { Folder, User } from "@prisma/client";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  user: User | undefined;
};

const NotesCard = ({ user }: Props) => {
  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [folders, setFolders] = useState<Folder[]>();
  const [folder, setFolder] = useState<Folder>();

  useEffect(() => {
    axios.get(`/api/folder?userId=${user?.id}`).then((getFolder) => {
      setFolders(getFolder.data.folders);
    });
  }, []);

  const sendRequest = async () => {
    try {
      await axios.post("/api/notes", {
        folderId: folder?.id,
        userId: user?.id,
        description: text,
      });
      toast.success("Abracadabra! Now You Won't Forget!");
    } catch (error) {
      toast.error("There were some error");
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Note</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          placeholder="Add a note"
          className="placeholder:text-base"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? folders?.filter((folder) => folder.name === value)[0].name
                : "Select folder..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No folders found.</CommandEmpty>
                <CommandGroup>
                  {folders?.map((folder) => (
                    <CommandItem
                      key={folder.id}
                      value={folder.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? value : folder.name);
                        setFolder(folder);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === folder.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {folder.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button onClick={sendRequest}>Create</Button>
      </CardContent>
    </Card>
  );
};

export default NotesCard;

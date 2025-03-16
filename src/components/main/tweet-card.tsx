import type { Folder, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

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
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  user: User | undefined;
};

const formSchema = z.object({
  link: z.string().min(1, { message: "Name is required" }),
});

const TweetCard = ({ user }: Props) => {
  const [folders, setFolders] = useState<Folder[] | undefined>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [folder, setFolder] = useState<Folder>();

  useEffect(() => {
    axios.get(`/api/folder?userId=${user?.id}`).then((getFolder) => {
      setFolders(getFolder.data.folders);
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dataToSend = {
      link: values.link,
      userId: user?.id,
      folderId: folder?.id,
    };

    try {
      const response = await axios.post("/api/tweet", dataToSend);
      toast.success("Abracadabra! Now You Won't Forget!");
    } catch (error) {
      console.log("CREATING_TWEET_ERROR", error);
      toast.error("There were some error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tweet URL</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tweet URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://x.com/ishyverma/status/1898971065914999090"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                            setValue(
                              currentValue === value ? value : folder.name
                            );
                            setFolder(folder);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === folder.name
                                ? "opacity-100"
                                : "opacity-0"
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
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TweetCard;

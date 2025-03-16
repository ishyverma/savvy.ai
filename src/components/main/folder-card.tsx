'use client'

import type { User } from '@prisma/client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'

type Props = {
  user: User | undefined
}

const FolderCard = ({ user }: Props) => {
  const [isPublic, setIsPublic] = useState(false)
  const [value, setValue] = useState("");

  const sendRequest = async () => {
    try {
      await axios.post("/api/folder", {
        userId: user?.id,
        name: value,
        isPublic
      })
      toast.success("Abracadabra! Now You Won't Forget!")
    } catch (error) {
      toast.error("There were some error")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Create a folder
        </CardTitle>
        <CardDescription>
          Create a folder to organize your bookmarks, links, and notes.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Input onChange={(e) => setValue(e.target.value)} value={value} placeholder='Enter a name for the folder' />
        <div className='flex gap-2'>
          <Switch onCheckedChange={() => setIsPublic(prev => !prev)} /> Public
        </div>
        <Button onClick={sendRequest} disabled={value.length === 0 ? true : false}>Create</Button>
      </CardContent>
    </Card>
  )
}

export default FolderCard
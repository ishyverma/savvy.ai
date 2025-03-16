import prisma from '@/db'
import type { User } from '@prisma/client'
import React from 'react'
import NotesMainCard from './notes-main-card'

type Props = {
    user: User | undefined
}

const ShowOnFrontend = async ({ user }: Props) => {
  return (
    <div></div>
  )
}

export default ShowOnFrontend
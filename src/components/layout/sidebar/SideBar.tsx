"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Context, FC, useContext, useEffect, useRef, useState } from "react"
import Task from "./Task"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import Chat from "./chat/chat"
import { Difficulty, type Task as TTask } from "@/types/task"
import { Link } from "lucide-react"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import Search from "./search"
import { Button } from "@/components/ui/button"
import { TaskContext, type TTaskContext } from "@/providers/TaskProvider"

const SideBar: FC = ({}) => {
  const { setRef } = useContext(EditorContext as Context<TEditorContext>)
  const ref = useRef<HTMLDivElement | null>(null)
  const params = useParams()
  const { task } = useContext(TaskContext as Context<TTaskContext>)

  useEffect(() => {
    if (ref.current) setRef(ref)
  }, [ref.current])
  return (
    <div ref={ref} className='flex flex-col gap-5 p-2 w-1/2'>
      <Tabs className='w-full h-full' defaultValue='description'>
        <TabsList>
          <TabsTrigger value='description'>Описание</TabsTrigger>
          <TabsTrigger value='chat'>Чат с собеседователем</TabsTrigger>
          <TabsTrigger value='search'>Искать задачи</TabsTrigger>
        </TabsList>
        <TabsContent className='flex flex-col items-center' value='description'>
          <Task {...task} />
          <Button
            variant='ghost'
            className='mt-10 flex gap-2'
            onClick={() => {
              const link = `${window.location.origin}/room/${params.roomId}`
              try {
                navigator.clipboard.writeText(link)
                toast.success("Ссылка успешно скопированна!", {
                  description: link,
                })
              } catch (error) {
                toast.error("Не удалось скопировать ссылку.", {
                  description: link,
                })
              }
            }}
          >
            <span>Скопировать ссылку собеседования</span> <Link />
          </Button>
        </TabsContent>
        <TabsContent className='w-full h-[95%]' value='chat'>
          <Chat />
        </TabsContent>
        <TabsContent value='search'>
          <Search />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SideBar

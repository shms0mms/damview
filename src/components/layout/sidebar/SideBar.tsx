"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Context, FC, useContext, useEffect, useRef, useState } from "react"
import Task from "./Task"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import Chat from "./chat/chat"
import SearchTasks from "./search/SearchTasks"
import { useTasks } from "@/hooks/useTasks"
import type { Task as TTask } from "@/types/task"
import TasksList from "./search/TasksList"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"
import { toast } from "sonner"
import { useParams } from "next/navigation"

const SideBar: FC = ({}) => {
  const { setRef } = useContext(EditorContext as Context<TEditorContext>)
  const { tasks: _tasks } = useTasks()
  const [tasks, setTasks] = useState<TTask[]>(_tasks)
  const ref = useRef<HTMLDivElement | null>(null)
  const params = useParams()

  useEffect(() => {
    if (ref.current) setRef(ref)
  }, [ref.current])

  useEffect(() => setTasks(_tasks), [_tasks])
  return (
    <div ref={ref} className='flex flex-col gap-5 p-2 w-1/2'>
      <Tabs className='w-full h-full' defaultValue='description'>
        <TabsList>
          <TabsTrigger value='description'>Описание</TabsTrigger>
          <TabsTrigger value='chat'>Чат с собеседователем</TabsTrigger>
          <TabsTrigger value='search'>Искать задачи</TabsTrigger>
        </TabsList>
        <TabsContent className='flex flex-col items-center' value='description'>
          <Task
            id={1}
            description='Даны два числа A и B. Вам нужно вычислить их сумму A+B. В этой задаче
				для работы с входными и выходными данными вы можете использовать и файлы
				и потоки на ваше усмотрение.'
            name='A+B 1'
            examples={[
              {
                enter: "2 2",
                id: 1,
                out: "4",
              },
            ]}
          />
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
          <SearchTasks setTasks={setTasks} />
          <ScrollArea className='h-[calc(100vh-6rem)]' style={{ minHeight: 0 }}>
            <TasksList tasks={tasks} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SideBar

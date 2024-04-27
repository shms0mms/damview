import { ScrollArea } from "@/components/ui/scroll-area"
import { useTasks } from "@/hooks/useTasks"
import { useState, useEffect } from "react"
import type { Task } from "@/types/task"
import SearchTasks from "./SearchTasks"
import TasksList from "./TasksList"
import { useSetTask } from "@/hooks/useSetTask"

const Search = () => {
  const { tasks: _tasks } = useTasks()
  const [tasks, setTasks] = useState<Task[]>(_tasks)

  useEffect(() => setTasks(_tasks), [_tasks])
  return (
    <>
      <SearchTasks setTasks={setTasks} />
      <ScrollArea className='h-[calc(100vh-6rem)]'>
        <TasksList tasks={tasks} />
      </ScrollArea>
    </>
  )
}

export default Search

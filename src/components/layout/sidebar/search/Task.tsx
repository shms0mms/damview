import { Button } from "@/components/ui/button"
import { useSetTask } from "@/hooks/useSetTask"
import type { Task } from "@/types/task"
import { useEffect, type FC } from "react"

type TTaskProps = {
  task: Task
  setTask: (taskId: number) => void
}

const Task: FC<TTaskProps> = ({ task, setTask }) => {
  return (
    <li className='w-full'>
      <Button
        className='items-start py-10 flex flex-col gap-1 overflow-hidden w-full'
        variant='outline'
        onClick={() => setTask(task.id)}
      >
        <span className='font-semibold'>{task.name}</span>
        <span>{task.dificalty}</span>
      </Button>
    </li>
  )
}

export default Task

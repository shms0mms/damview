import { Button } from "@/components/ui/button"
import type { Task } from "@/types/task"
import { type FC } from "react"

type TTaskProps = {
  task: Task
}

const Task: FC<TTaskProps> = ({ task }) => {
  return (
    <li className='w-full'>
      <Button
        className='items-start py-10 flex flex-col gap-1 overflow-hidden w-full'
        variant='outline'
      >
        <span className='font-semibold'>{task.name}</span>
        <span className='w-full text-ellipsis overflow-hidden'>
          {task.description}
        </span>
      </Button>
    </li>
  )
}

export default Task

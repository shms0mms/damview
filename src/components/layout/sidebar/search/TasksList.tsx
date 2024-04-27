import type { Task as TTask } from "@/types/task"
import { type FC } from "react"
import Task from "./Task"

type TasksListProps = {
  tasks: TTask[]
}

const TasksList: FC<TasksListProps> = ({ tasks }) => {
  return (
    <ul className='flex flex-col items-start gap-2 mt-4'>
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TasksList

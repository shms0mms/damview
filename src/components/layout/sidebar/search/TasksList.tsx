import type { Task as TTask } from "@/types/task"
import { type Context, useContext, useEffect, type FC } from "react"
import Task from "./Task"
import { useSetTask } from "@/hooks/useSetTask"
import { useTaskById } from "@/hooks/useTaskById"
import { TaskContext, type TTaskContext } from "@/providers/TaskProvider"
import { useParams } from "next/navigation"
import { USER_ID } from "@/const/app.const"

type TasksListProps = {
  tasks: TTask[]
}

const TasksList: FC<TasksListProps> = ({ tasks }) => {
  const { roomId } = useParams()
  const { setTask, taskId } = useSetTask(
    parseInt(localStorage.getItem(USER_ID)!),
    roomId as string
  )
  const { mutateAsync } = useTaskById(taskId)
  const { setTask: setTaskContext } = useContext(
    TaskContext as Context<TTaskContext>
  )

  useEffect(() => {
    if (!taskId) return
    const setNewTask = async () => {
      const task = await mutateAsync(taskId)
      setTaskContext(task)
    }
    setNewTask()
  }, [taskId])
  return (
    <ul className='flex flex-col items-start gap-2 mt-4'>
      {tasks.map(task => (
        <Task setTask={setTask} key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TasksList

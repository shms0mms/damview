import type { Task as TTask } from "@/types/task"
import { type Context, useContext, useEffect, type FC } from "react"
import Task from "./Task"
import { useSetTask } from "@/hooks/useSetTask"
import { useTaskById } from "@/hooks/useTaskById"
import { TaskContext, type TTaskContext } from "@/providers/TaskProvider"

type TasksListProps = {
  tasks: TTask[]
}

const TasksList: FC<TasksListProps> = ({ tasks }) => {
  const { setTask, taskId } = useSetTask()
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

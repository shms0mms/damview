"use client"
import { useTask } from "@/hooks/useTask"
import { createContext, useEffect, useState } from "react"
import { type FC, type PropsWithChildren } from "react"
import type { ReactFunc } from "@/types/app"
import type { Task } from "@/types/task"

export type TTaskContext = {
  task: Task
  setTask: ReactFunc<Task>
}

export const TaskContext = createContext<TTaskContext | {}>({})

const TaskProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { task: _task } = useTask()
  const [task, setTask] = useState<Task>(_task)
  useEffect(() => setTask(_task), [_task])
  return (
    <TaskContext.Provider value={{ task, setTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider

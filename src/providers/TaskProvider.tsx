"use client"
import { useTask } from "@/hooks/useTask"
import { createContext, useEffect, useState } from "react"
import { type FC, type PropsWithChildren } from "react"
import type { ReactFunc } from "@/types/app"
import type { Task } from "@/types/task"
import { useParams } from "next/navigation"

export type TTaskContext = {
	task: Task
	setTask: ReactFunc<Task>
}

export const TaskContext = createContext<TTaskContext | {}>({})

const TaskProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { roomId } = useParams()
	const { task: _task } = useTask(roomId.toString())

	const [task, setTask] = useState<Task>(_task as Task)
	useEffect(() => setTask(_task as Task), [_task])
	return (
		<TaskContext.Provider value={{ task, setTask }}>
			{children}
		</TaskContext.Provider>
	)
}

export default TaskProvider

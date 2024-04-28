import type { Task as TTask } from "@/types/task"
import { type FC } from "react"
import Task from "./Task"

type TasksListProps = {
	tasks: TTask[]
	setTask: (taskId: number) => void
}

const TasksList: FC<TasksListProps> = ({ tasks, setTask }) => {
	return (
		<ul className="flex flex-col items-start gap-2 mt-4">
			{tasks.length ? (
				tasks.map(task => <Task setTask={setTask} key={task.id} task={task} />)
			) : (
				<div className="flex items-center justify-center w-full h-full">
					Таких задач не найдено
				</div>
			)}
		</ul>
	)
}

export default TasksList

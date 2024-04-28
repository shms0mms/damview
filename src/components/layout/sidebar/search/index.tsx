import { ScrollArea } from "@/components/ui/scroll-area"
import { useTasks } from "@/hooks/useTasks"
import { useState, useEffect, FC } from "react"
import type { Task } from "@/types/task"
import SearchTasks from "./SearchTasks"
import TasksList from "./TasksList"

const Search: FC<{ setTask: (taskId: number) => void }> = ({ setTask }) => {
	const { tasks: _tasks } = useTasks()
	const [tasks, setTasks] = useState<Task[]>(_tasks)

	useEffect(() => setTasks(_tasks), [_tasks])
	return (
		<>
			<SearchTasks setTasks={setTasks} />
			<ScrollArea className="h-[calc(100vh-6rem)]">
				<TasksList setTask={setTask} tasks={tasks} />
			</ScrollArea>
		</>
	)
}

export default Search

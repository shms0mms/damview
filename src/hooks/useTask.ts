import { taskService } from "@/services/task.service"
import { type Task } from "@/types/task"
import { useQuery } from "@tanstack/react-query"

export const useTask = (roomId: string) => {
	const { data: task, ...rest } = useQuery<Task>({
		queryKey: ["task"],
		queryFn: () => taskService.getTask(roomId),
	})
	return { task, ...rest }
}

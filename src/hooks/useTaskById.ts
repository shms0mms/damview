import { taskService } from "@/services/task.service"
import { useMutation } from "@tanstack/react-query"

export const useTaskById = (key?: number) => {
	const { data: task, ...rest } = useMutation({
		mutationKey: ["get-task-by-id", key],
		mutationFn: (id: number) => taskService.getById(id),
	})
	return { task, ...rest }
}

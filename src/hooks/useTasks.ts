import { taskService } from "@/services/task.service"
import { useQuery } from "@tanstack/react-query"

export const useTasks = () => {
	const { data: tasks, ...rest } = useQuery({
		initialData: [],
		queryKey: ["tasks"],
		queryFn: () => taskService.getAll(),
	})
	return { tasks, ...rest }
}

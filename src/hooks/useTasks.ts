import { MOCK_TASKS } from "@/const/tasks.const"
import { taskService } from "@/services/task.service"
import type { Task } from "@/types/task"
import { useQuery } from "@tanstack/react-query"

export const useTasks = () => {
  const { data: tasks, ...rest } = useQuery({
    initialData: [],
    queryKey: ["tasks"],
    queryFn: () => new Promise<Task[]>(resolve => resolve(MOCK_TASKS)), // taskService.getAll(),
  })
  return { tasks, ...rest }
}

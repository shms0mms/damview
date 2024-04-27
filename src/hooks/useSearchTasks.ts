import { useMutation } from "@tanstack/react-query"
import type { Task } from "@/types/task"
import { taskService } from "@/services/task.service"
import type { TSearchTask } from "@/types/search-tasks"

export const useSearchTasks = () => {
  const {
    mutate: searchTasks,
    data: searchedTasks,
    ...rest
  } = useMutation<Task[], {}, TSearchTask>({
    mutationKey: ["searchTasks"],
    mutationFn: data => taskService.searchTasks(data),
  })
  return { searchTasks, searchedTasks, ...rest }
}

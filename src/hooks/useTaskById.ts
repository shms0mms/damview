import { MOCK_TASK } from "@/const/tasks.const"
import type { Task } from "@/types/task"
import { useMutation } from "@tanstack/react-query"

export const useTaskById = (key?: number) => {
  const { data: task, ...rest } = useMutation({
    mutationKey: ["get-task-by-id", key],
    mutationFn: (id: number) =>
      new Promise<Task>(resolve => resolve(MOCK_TASK)), // taskService.getById(id)
  })
  return { task, ...rest }
}

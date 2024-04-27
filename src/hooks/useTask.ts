import { MOCK_TASK } from "@/const/tasks.const"
import { type Task } from "@/types/task"
import { useQuery } from "@tanstack/react-query"

export const useTask = () => {
  const { data: task, ...rest } = useQuery<Task>({
    initialData: MOCK_TASK,
    queryKey: ["task"],
    queryFn: () => new Promise<Task>(resolve => resolve(MOCK_TASK)),
  })
  return { task, ...rest }
}

import { axios } from "@/api/interceptors"
import type { TSearchTask } from "@/types/search-tasks"
import type { Task } from "@/types/task"

class TaskService {
  private BASE_URL = "/tasks"
  async getAll() {
    const response = await axios.get<Task[]>(this.BASE_URL)
    return response.data
  }
  async searchTasks(data: TSearchTask) {
    const response = await axios.post<Task[]>(`${this.BASE_URL}/search`, data)
    return response.data
  }
}

export const taskService = new TaskService()

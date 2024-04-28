import { axios } from "@/api/interceptors"
import type { TSearchTask } from "@/types/search-tasks"
import type { Task } from "@/types/task"

class TaskService {
	private BASE_URL = "/interview"
	async getById(id: number) {
		const response = await axios.get<Task>(`${this.BASE_URL}/task/${id}`)
		return response.data
	}
	async getAll() {
		const response = await axios.get<Task[]>(`${this.BASE_URL}/all_tasks`)
		return response.data
	}
	async searchTasks(data: TSearchTask) {
		const response = await axios.get<Task[]>(
			`${this.BASE_URL}/filter_tasks?name__like=${data.name__like}&dificalty=${data.dificalty}`
		)

		return response.data
	}
	async getTask(roomId: string) {
		const response = await axios.get<Task>(
			`${this.BASE_URL}/last_task/${roomId}`
		)
		return response.data
	}

	async testCodeForTask(taskId: number, code: string) {
		const rsp = await axios.post(`${this.BASE_URL}/tasks/test`, {
			task_id: +taskId,
			code,
		})

		return rsp.data
	}
}

export const taskService = new TaskService()

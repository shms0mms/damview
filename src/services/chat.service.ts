import { axios } from "@/api/interceptors"

export const chatService = {
	async getLastMessages(roomId: string) {
		const response = await axios.get(`/interview/last_messages/${roomId}`)

		return response.data
	},
}

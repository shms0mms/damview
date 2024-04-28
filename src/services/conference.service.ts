import { axios } from "@/api/interceptors"
import type {
	TCreateConference,
	TLogInConference,
	TCreateConferenceResponse,
	TLogInConferenceResponse,
} from "@/types/conference"

class ConferenceService {
	private BASE_URL = "/interview"

	async create(data: TCreateConference) {
		const response = await axios.post<TCreateConferenceResponse>(
			`${this.BASE_URL}/create_room`,
			data
		)
		return response.data
	}

	async login(data: TLogInConference) {
		const response = await axios.post<TLogInConferenceResponse>(
			`${this.BASE_URL}/create_person/${data.roomId}`,
			{ fio: data.fio, role: data.role }
		)
		return response.data
	}
}

export const conferenceService = new ConferenceService()

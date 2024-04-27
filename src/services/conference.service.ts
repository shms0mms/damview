import { axios } from "@/api/interceptors"
import type {
  TCreateConference,
  TUpdateConference,
  TConference,
} from "@/types/conference"

class ConferenceService {
  // async get(id: string) {
  //   const response = await axios.get<TConference>(`/conference/${id}`)
  //   return response.data
  // }
  private BASE_URL = "/interview"

  async create(data: TCreateConference) {
    const response = await axios.post<TConference>(
      `${this.BASE_URL}/create_room`,
      data
    )
    return response.data
  }
}

export const conferenceService = new ConferenceService()

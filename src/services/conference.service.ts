import { axios } from "@/api/interceptors"
import type {
  TCreateConference,
  TUpdateConference,
  TConference,
} from "@/types/conference"

export const conferenceService = {
  // async get(id: string) {
  //   const response = await axios.get<TConference>(`/conference/${id}`)
  //   return response.data
  // },

  async create(data: TCreateConference) {
    const response = await axios.post<TConference>(
      `/interview/create_room`,
      data
    )
    return response.data
  },
}

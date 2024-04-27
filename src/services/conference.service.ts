import { axios } from "@/api/interceptors"
import type {
  TCreateConference,
  TUpdateConference,
  TConference,
} from "@/types/conference"

export const conferenceService = {
  async get(id: string) {
    const response = await axios.get<TConference>(`/conference/${id}`)
    return response.data
  },

  async create(data: TCreateConference) {
    const response = await axios.post<TConference>(`/conference`, data)
    return response.data
  },

  async update(data: TUpdateConference) {
    const response = await axios.put<TConference>(
      `/conference/${data.id}`,
      data
    )
    return response.data
  },

  async delete(id: string) {
    const response = await axios.delete<TConference>(`/conference/${id}`)
    return response.data
  },
}

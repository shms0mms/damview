"use client"

import { useMutation } from "@tanstack/react-query"
import { conferenceService } from "@/services/conference.service"
import {
  Role,
  type TCreateConference,
  type TCreateConferenceResponse,
} from "@/types/conference"
import { toast } from "sonner"

export const useCreateConference = () => {
  const { mutate: createConference, ...rest } = useMutation<
    TCreateConferenceResponse,
    {},
    TCreateConference
  >({
    mutationKey: ["createConference"],
    mutationFn: (data: TCreateConference) =>
      new Promise(resolve =>
        resolve({ roomId: "asdf", role: Role.INTERVIEWER, userId: 1 })
      ),
    // conferenceService.create(data),
    onSuccess: () => {
      toast.success("Конференция успешно создана!")
    },
    onError: () => {
      toast.error("Не удалось создать конференцию.")
    },
  })
  return { createConference, ...rest }
}

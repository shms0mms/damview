"use client"

import { useMutation } from "@tanstack/react-query"
import { conferenceService } from "@/services/conference.service"
import type { TConference, TCreateConference } from "@/types/conference"
import { toast } from "sonner"

export const useCreateConference = () => {
	const { mutate: createConference, ...rest } = useMutation<
		TConference,
		Error,
		TCreateConference
	>({
		mutationKey: ["createConference"],
		mutationFn: (data: TCreateConference) => conferenceService.create(data),

		onSuccess: () => {
			toast.success("Конференция успешно создана!")
		},
		onError: () => {
			toast.error("Не удалось создать конференцию.")
		},
	})
	return { createConference, ...rest }
}

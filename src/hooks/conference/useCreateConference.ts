"use client"

import { useMutation } from "@tanstack/react-query"
import { conferenceService } from "@/services/conference.service"
import type { TCreateConference } from "@/types/conference"
import { toast } from "sonner"

export const useCreateConference = () => {
  return useMutation({
    mutationKey: ["createConference"],
    mutationFn: (data: TCreateConference) => conferenceService.create(data),
    onSuccess: () => {
      toast.success("Conference created successfully")
    },
  })
}

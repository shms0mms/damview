import { conferenceService } from "@/services/conference.service"
import {
	type TLogInConferenceResponse,
	type TLogInConference,
	Role,
} from "@/types/conference"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useLogInConference = () => {
	const {
		mutate: logInConference,
		data: user,
		...rest
	} = useMutation<TLogInConferenceResponse, {}, TLogInConference>({
		mutationKey: ["login-conference"],
		mutationFn: data => conferenceService.login(data),
		onSuccess: () => {
			toast.success("Вы успешно вошли в конференцию!")
		},
		onError: () => {
			toast.error("Не удалось войти в конференцию.")
		},
	})
	return { logInConference, user, ...rest }
}

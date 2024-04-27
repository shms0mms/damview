import { Button } from "@/components/ui/button"
import { useForm, Form as NextForm, OnSubmitHandler } from "react-mms-form"
import { useEffect, type FC } from "react"
import { useCreateConference } from "@/hooks/conference/useCreateConference"
import { type TCreateConference, Role } from "@/types/conference"
import { redirect } from "next/navigation"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "../input"
import { Label } from "../label"
import { ROLE, USER_ID } from "@/const/app.const"
import { useLocalStorage } from "pidoras"

const Form: FC = () => {
	const { handleSubmit, register, fields, updateField } =
		useForm<TCreateConference>({
			defaultValues: {
				fio: "",
				role: Role.INTERVIEWER,
			},
			withLocalStorage: ["fio"],
			mode: "onSubmit",
		})
	const { createConference, data: newConference } = useCreateConference()
	const { set } = useLocalStorage()
	useEffect(() => {
		if (!newConference) return
		set(ROLE, newConference.role)
		set(USER_ID, newConference.userId)
		redirect(`/room/${newConference.roomId}`)
	}, [newConference])

	const onSubmit: OnSubmitHandler<TCreateConference> = data => {
		createConference(data as TCreateConference)
	}
	return (
		<NextForm
			handleSubmit={handleSubmit}
			onSubmitHandler={onSubmit}
			className="flex flex-col gap-4"
		>
			<Label>ФИО</Label>
			<Input
				placeholder="Имя, Фамилия, Отчество"
				register={register}
				name={"fio"}
			/>
			<Label>Роль</Label>
			<Select
				onValueChange={value =>
					updateField("role", {
						...fields.role,
						value,
					})
				}
				defaultValue={fields.role && fields.role.value}
			>
				<SelectTrigger>
					<SelectValue placeholder="Выберите вашу роль" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="interviewee">Собеседующий</SelectItem>
					<SelectItem value="interviewer">Кандидат</SelectItem>
				</SelectContent>
			</Select>
			<Button>Создать</Button>
		</NextForm>
	)
}

export default Form

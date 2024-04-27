import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ICON_SIZE } from "@/const/icon.const"
import { METHODS } from "@/const/methods.const"
import { Send } from "lucide-react"
import { FC, useEffect, useRef } from "react"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"
interface FormData {
	message: string
}
interface IChatControl {
	sendMessage: (message: string) => void
}
const ChatControl: FC<IChatControl> = ({ sendMessage }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		updateField,
		fields,
		fieldsValues,
	} = useForm<FormData>({
		withLocalStorage: ["message"],
	})
	const onSubmit: OnSubmitHandler<FormData> = data => {
		if (data.message) {
			sendMessage(data.message)
			updateField("message", {
				...fields.message,
				value: "",
			})
		}
	}

	const ref = useRef<HTMLInputElement>(null)
	// useEffect(() => {
	// 	const onKeyDown = (e: KeyboardEvent) => {
	// 		if (ref.current && e.key === "Enter") {
	// 			if (ref.current.value !== "") {
	// 				sendMessage(ref.current.value)
	// 				updateField("message", {
	// 					...fields.message,
	// 					value: "",
	// 				})
	// 			}
	// 		}
	// 	}
	// 	if (typeof window !== "undefined")
	// 		window.addEventListener("keydown", onKeyDown)

	// 	return () => {
	// 		window.removeEventListener("keydown", onKeyDown)
	// 	}
	// }, [ref.current && ref.current.value])
	return (
		<Form
			handleSubmit={handleSubmit}
			onSubmitHandler={onSubmit}
			method={METHODS.POST}
			className="flex items-center gap-5 justify-between w-full absolute bottom-0 left-0 p-2"
		>
			<Input
				ref={ref}
				name={"message"}
				error={errors.message}
				register={register}
				placeholder="Отправить сообщение..."
			/>

			<Button size={"icon"} className="p-3" type="submit">
				<Send width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} />
			</Button>
		</Form>
	)
}

export default ChatControl

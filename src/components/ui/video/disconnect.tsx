"use client"
import { FC, useEffect, useState } from "react"
import Circle from "../circle"
import { PhoneOff } from "lucide-react"
import { ICON_SIZE } from "@/const/icon.const"
import { ROLE, USER_ID } from "@/const/app.const"
import { useRouter } from "next/navigation"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../alert-dialog"

const Disconnect: FC = ({}) => {
	const { push } = useRouter()
	const [isConfirm, updateConfirmed] = useState(false)

	useEffect(() => {
		if (isConfirm) {
			localStorage.removeItem(USER_ID)
			localStorage.removeItem(ROLE)
			push(`/`)
		}
	}, [isConfirm])
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button
					className="absolute top-5 opacity-50 hover:opacity-100 transition-all duration-300 left-1/2 -translate-x-1/2"
					type="button"
				>
					<Circle className="w-14 h-14 bg-red-500">
						<PhoneOff width={ICON_SIZE.XL} height={ICON_SIZE.XL} />
					</Circle>
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Уйти с собеседования?</AlertDialogTitle>
					<AlertDialogDescription>
						Вы точно хотите уйти с собеседования?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						<button type="button" onClick={() => updateConfirmed(false)}>
							Отменить
						</button>
					</AlertDialogCancel>
					<AlertDialogAction>
						<button type="button" onClick={() => updateConfirmed(true)}>
							Уйти
						</button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default Disconnect

"use client"
import { FC } from "react"
import Circle from "../circle"
import { PhoneOff } from "lucide-react"
import { ICON_SIZE } from "@/const/icon.const"

const Disconnect: FC = ({}) => {
	return (
		<button
			className="absolute top-5 opacity-50 hover:opacity-100 transition-all duration-300 left-1/2 -translate-x-1/2"
			onClick={() => {}}
		>
			<Circle className="w-14 h-14 bg-red-500">
				<PhoneOff width={ICON_SIZE.XL} height={ICON_SIZE.XL} />
			</Circle>
		</button>
	)
}

export default Disconnect

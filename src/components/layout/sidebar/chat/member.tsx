import { FC } from "react"
import { type Member as TMember } from "@/types/chat"

const Member: FC<TMember> = ({ fio, role }) => {
	return (
		<div className="flex items-center justify-between gap-5">
			<div className="flex items-center gap-1">{fio}</div>
			<div className="opacity-30">
				{role === "interviewee" ? "Участник" : "Собеседователь"}
			</div>
		</div>
	)
}

export default Member

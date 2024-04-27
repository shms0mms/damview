import { Role } from "@/types/user"
import { FC } from "react"

export interface IMember {
	name: string
	role: Role
}

const Member: FC<IMember> = ({ name, role }) => {
	return (
		<div className="flex items-center justify-between gap-5">
			<div className="flex items-center gap-1">{name}</div>
			<div className="opacity-30">
				{role === "interviewee" ? "Участник" : "Собеседователь"}
			</div>
		</div>
	)
}

export default Member

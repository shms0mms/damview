import { Role } from "./user"

export interface Message {
	message: string
	fio: string
	isMe?: boolean
}

export interface Member {
	fio: string
	role: Role
}

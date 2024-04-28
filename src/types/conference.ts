export type TConference = {
	roomId: string
	userId: number
	role: Role
}
export type TCreateConference = {
	fio: string
	role: Role
}
export type TUpdateConference = {
	roomId: string
}

export enum Role {
	INTERVIEWER = "interviewer",
	INTERVIEWEE = "interviewee",
}
export type TCreateConferenceResponse = {
	roomId: string
	role: Role
	userId: number
}
export type TLogInConference = {
	roomId: string
} & TCreateConference
export type TLogInConferenceResponse = TCreateConferenceResponse

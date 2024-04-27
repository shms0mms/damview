export type TConference = {
  roomId: string
}
export type TCreateConference = {
  fullname: string
  role: Role
}
export type TCreateConferenceResponse = {
  roomId: string
  role: Role
  userId: number
}
export type TUpdateConference = {
  roomId: string
}

export type TLogInConference = {
  roomId: string
} & TCreateConference
export type TLogInConferenceResponse = TCreateConferenceResponse

export enum Role {
  INTERVIEWER = "interviewer",
  INTERVIEWEE = "interviewee",
}

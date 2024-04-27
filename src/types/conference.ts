export type TConference = {
  roomId: string
}
export type TCreateConference = {
  fullname: string
  role: Role
}
export type TUpdateConference = {
  roomId: string
}

export enum Role {
  INTERVIEWER = "interviewer",
  INTERVIEWEE = "interviewee",
}

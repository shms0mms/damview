export interface Example {
  id: number
  enter: string
  out: string
}

export interface Task {
  id: number
  name: string
  task: string
  dificalty: Difficulty
  examples?: Example[]
}

export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HIGH = "High",
}

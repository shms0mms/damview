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
	params?: string
}

export enum Difficulty {
	EASY = "easy",
	MIDDLE = "middle",
	HARD = "hard",
}

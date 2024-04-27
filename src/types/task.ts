export interface Example {
	id: number
	enter: string
	out: string
}

export interface Task {
	id: number
	name: string
	description: string
	examples?: Example[]
}

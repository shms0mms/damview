import Description from "@/components/ui/description"
import Example from "@/components/ui/editor/example"
import Title from "@/components/ui/title"
import { type Task } from "@/types/task"
import { FC } from "react"

const Task: FC<Task> = ({ description, id, name, examples }) => {
	return (
		<>
			<Title>{name}</Title>
			<Description>{description}</Description>
			{examples?.length && examples.map(e => <Example {...e} key={e.id} />)}
		</>
	)
}

export default Task

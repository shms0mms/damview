import Description from "@/components/ui/description"
import Example from "@/components/ui/editor/example"
import Title from "@/components/ui/title"
import { type Task } from "@/types/task"
import { FC } from "react"

const Task: FC<Task> = ({ description, id, name, examples }) => {
	return (
		<div className="w-full h-full flex flex-col gap-5">
			<Title>
				{id}. {name}
			</Title>
			<Description>{description}</Description>
			{examples?.length && examples.map(e => <Example {...e} key={e.id} />)}
		</div>
	)
}

export default Task

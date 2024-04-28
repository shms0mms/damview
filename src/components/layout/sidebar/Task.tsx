import Description from "@/components/ui/description"
import Example from "@/components/ui/editor/example"
import Title from "@/components/ui/title"
import { type Task } from "@/types/task"
import { FC } from "react"

const Task: FC<Task> = ({ task, id, name, examples }) => {
	return (
		<>
			{!!id ? (
				<div className="flex-[1_1_auto] w-full h-full flex flex-col gap-5">
					<Title>
						{id}. {name}
					</Title>
					<Description>{task}</Description>
					{!!examples?.length &&
						examples.map(e => <Example {...e} key={e.id} />)}
				</div>
			) : (
				<Title className="items-start flex text-left">Выберите задачу</Title>
			)}
		</>
	)
}

export default Task

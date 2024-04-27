"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Context, FC, useContext, useEffect, useRef } from "react"
import Task from "./Task"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import Chat from "./chat/chat"

const SideBar: FC = ({}) => {
	const { setRef } = useContext(EditorContext as Context<TEditorContext>)
	const ref = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		if (ref.current) setRef(ref)
	}, [ref.current])
	return (
		<div ref={ref} className="flex flex-col gap-5 p-2 w-1/2">
			<Tabs className="w-full h-full" defaultValue="description">
				<TabsList>
					<TabsTrigger value="description">Описание</TabsTrigger>

					<TabsTrigger value="chat">Чат с собеседователем</TabsTrigger>
				</TabsList>
				<TabsContent value="description">
					<Task
						id={1}
						description="Даны два числа A и B. Вам нужно вычислить их сумму A+B. В этой задаче
				для работы с входными и выходными данными вы можете использовать и файлы
				и потоки на ваше усмотрение."
						name="A+B 1"
						examples={[
							{
								enter: "2 2",
								id: 1,
								out: "4",
							},
						]}
					/>
				</TabsContent>
				<TabsContent className="w-full h-[95%]" value="chat">
					<Chat />
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default SideBar

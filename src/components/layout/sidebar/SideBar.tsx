"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FC, useEffect, useRef, useState } from "react"
import Task from "./Task"

const SideBar: FC = ({}) => {
	const [isResizing, updateResized] = useState(false)
	const [startWidth, updateStartWidth] = useState(0)
	const [startX, updateStartX] = useState(0)

	const ref = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		if (ref.current) {
			ref.current.addEventListener("mousedown", function (e) {
				updateResized(true)
				updateStartX(e.pageX)
				updateStartWidth(parseInt(ref.current?.clientWidth.toString() || "0"))
			})
		}
		if (ref.current)
			ref.current.addEventListener("mouseup", function () {
				console.log(isResizing)

				updateResized(false)
			})
		document.addEventListener("mousemove", function (e) {
			if (isResizing) {
				const width = startWidth + (e.pageX - startX)
				if (ref.current) ref.current.style.width = width + "px"
			}
		})
	}, [isResizing])
	return (
		<div ref={ref} className="flex flex-col gap-5 p-2 w-1/2">
			<Tabs defaultValue="description">
				<TabsList>
					<TabsTrigger value="description">Описание</TabsTrigger>
					<TabsTrigger value="solutions">Отправленные решения</TabsTrigger>

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
			</Tabs>
		</div>
	)
}

export default SideBar

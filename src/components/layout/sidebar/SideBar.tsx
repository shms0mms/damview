"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Context, FC, useContext, useEffect, useRef, useState } from "react"
import Task from "./Task"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import Chat from "./chat/chat"
import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { useLocalStorage } from "pidoras"
import { Role } from "@/types/conference"
import { ROLE, USER_ID } from "@/const/app.const"
import { TTaskContext, TaskContext } from "@/providers/TaskProvider"
import Search from "./search"
import { useSetTask } from "@/hooks/useSetTask"
import { useTaskById } from "@/hooks/useTaskById"

const SideBar: FC = ({}) => {
	const { setRef } = useContext(EditorContext as Context<TEditorContext>)
	const ref = useRef<HTMLDivElement | null>(null)
	const params = useParams()
	const { get } = useLocalStorage()
	const role = get(ROLE)
	useEffect(() => {
		if (ref.current) setRef(ref)
	}, [ref.current])
	const { task } = useContext(TaskContext as Context<TTaskContext>)

	const { roomId } = useParams()
	const { setTask, taskId } = useSetTask(
		parseInt(
			typeof window !== "undefined" ? localStorage.getItem(USER_ID)! : "1"
		),
		roomId as string
	)

	const { mutateAsync } = useTaskById(taskId)
	const { setTask: setTaskContext } = useContext(
		TaskContext as Context<TTaskContext>
	)

	useEffect(() => {
		if (!taskId) return
		const setNewTask = async () => {
			const task = await mutateAsync(taskId)
			setTaskContext(task)
		}
		setNewTask()
	}, [taskId])

	const isInterviewer = role === Role.INTERVIEWER
	return (
		<div ref={ref} className="flex flex-col gap-5 p-2 w-1/2">
			<Tabs className="w-full h-full" defaultValue="description">
				<TabsList>
					<TabsTrigger value="description">Описание</TabsTrigger>
					<TabsTrigger value="chat">Чат</TabsTrigger>
					{isInterviewer && (
						<TabsTrigger value="search">Искать задачи</TabsTrigger>
					)}
				</TabsList>

				<TabsContent className="flex flex-col" value="description">
					<Task {...task} />
					<Button
						variant="ghost"
						className="mt-10 flex gap-2"
						onClick={() => {
							const link = `${window.location.origin}/room/${params.roomId}`
							try {
								navigator.clipboard.writeText(link)
								toast.success("Ссылка успешно скопированна!", {
									description: link,
								})
							} catch (error) {
								toast.error("Не удалось скопировать ссылку.", {
									description: link,
								})
							}
						}}
					>
						<span>Скопировать ссылку собеседования</span> <Link />
					</Button>
				</TabsContent>

				<TabsContent className="w-full h-[95%]" value="chat">
					<Chat />
				</TabsContent>
				{isInterviewer && (
					<TabsContent value="search">
						<Search setTask={setTask} />
					</TabsContent>
				)}
			</Tabs>
		</div>
	)
}

export default SideBar

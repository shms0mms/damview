"use client"
import { env } from "@/env"
import { useEffect } from "react"
import useWebSocket from "react-use-websocket"

export const useSetTask = (userId: number, roomId: string) => {
	const {
		sendJsonMessage: sendMessageToSocket,
		getWebSocket,
		lastJsonMessage,
	} = useWebSocket(
		`${env.NEXT_PUBLIC_WEBSOCKET_URL}/interview/room/tasks/${userId}/${roomId}`
	)
	const socket = getWebSocket()
	const setTask = (taskId: number) => {
		sendMessageToSocket({ num: taskId })
	}
	const connect = () => {}
	const disconnect = () => {
		socket?.close()
	}
	useEffect(() => {
		return () => {
			disconnect()
		}
	}, [])

	const taskId = JSON.parse(JSON.stringify(lastJsonMessage))?.task_id

	return { setTask, connect, disconnect, taskId }
}

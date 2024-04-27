"use client"
import { env } from "@/env"
import { useEffect } from "react"
import useWebSocket from "react-use-websocket"

const useChat = (userId: number, roomId: string) => {
	const {
		sendMessage: sendMessageToSocket,
		readyState,
		getWebSocket,
		lastJsonMessage,
	} = useWebSocket(
		`${env.NEXT_PUBLIC_WEBSOCKET_URL}/interview/room/chat/${userId}/${roomId}`
	)
	const socket = getWebSocket()
	const sendMessage = (message: string) => {
		sendMessageToSocket(message)
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

	const message = JSON.parse(JSON.stringify(lastJsonMessage || ""))

	return { sendMessage, connect, disconnect, message }
}

export default useChat

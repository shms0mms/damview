"use client"
import { ROOM_ID, USER_ID } from "@/const/app.const"
import { env } from "@/env"
import { useEffect } from "react"
import useWebSocket from "react-use-websocket"

const useLiveCoding = (userId: number = USER_ID, roomId: string = ROOM_ID) => {
	const { sendMessage, readyState, lastMessage, getWebSocket } = useWebSocket(
		`${env.NEXT_PUBLIC_WEBSOCKET_URL}/interview/room/code/${userId}/${roomId}`
	)
	const socket = getWebSocket()
	const sendCode = (message: string) => {
		sendMessage(message)
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

	const message = lastMessage?.data
	return { sendCode, connect, disconnect, message }
}

export default useLiveCoding

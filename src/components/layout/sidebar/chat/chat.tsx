"use client"
import { FC, useEffect, useState } from "react"
import ChatHeader from "./chat-header"
import ChatControl from "./chat-control"
import ChatMessages from "./chat-messages"
import useChat from "@/hooks/useChat"
import { Member, Message } from "@/types/chat"
import { FIO, USER_ID } from "@/const/app.const"
import { useQuery } from "@tanstack/react-query"
import { chatService } from "@/services/chat.service"
import { useParams } from "next/navigation"

const Chat: FC = ({}) => {
	const { roomId } = useParams()
	const myFio = JSON.parse(JSON.stringify(localStorage.getItem(FIO)))
	const _userId = localStorage.getItem(USER_ID)
	const userId = Number(_userId) || 1
	const { sendMessage, message } = useChat(userId, roomId.toString())
	const { data } = useQuery({
		queryKey: ["/chat/messages/last"],
		queryFn: () => chatService.getLastMessages(roomId.toString()),
	})

	const [messages, setMessages] = useState<Message[]>(data || [])

	useEffect(() => {
		if (data?.length) {
			const messages = data.map((d: any) => {
				return {
					...d.user,
					message: d.message,
					isMe: myFio === d.user.fio ? true : false,
				}
			})

			setMessages(messages)
		}
	}, [data?.length])

	const [members, setMembers] = useState<Member[]>([])

	useEffect(() => {
		if (!!message?.fio)
			setMessages(state => [
				...state,
				{ ...message, isMe: myFio === message.fio ? true : false } as Message,
			])

		if (message?.length) {
			for (let i = 0; i < message?.length; i++) {
				setMembers(state => [...state, message[i]])
			}
		}
	}, [message?.id, message?.length])

	return (
		<div className="flex relative flex-col w-full h-full">
			<ChatHeader members={members} />
			<ChatMessages messages={messages} />
			<ChatControl sendMessage={sendMessage} />
		</div>
	)
}

export default Chat

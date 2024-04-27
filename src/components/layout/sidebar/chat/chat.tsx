import { FC, useEffect, useState } from "react"
import ChatHeader from "./chat-header"
import ChatControl from "./chat-control"
import ChatMessages from "./chat-messages"
import useChat from "@/hooks/useChat"
import { Member, Message } from "@/types/chat"
import { useLocalStorage } from "pidoras"
import { FIO } from "@/const/app.const"

const Chat: FC = ({}) => {
	const { sendMessage, message } = useChat()
	const [messages, setMessages] = useState<Message[]>([])
	const [members, setMembers] = useState<Member[]>([])
	const { get } = useLocalStorage()
	const myFio = get(FIO)
	useEffect(() => {
		if (!!message?.fio)
			setMessages(state => [
				...state,
				{ ...message, isMe: myFio ? true : false } as Message,
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

import { FC } from "react"
import ChatHeader from "./chat-header"
import ChatControl from "./chat-control"
import ChatMessages from "./chat-messages"

const Chat: FC = ({}) => {
	return (
		<div className="flex relative flex-col w-full h-full">
			<ChatHeader />
			<ChatMessages
				messages={[
					{
						id: 1,
						message: "Привет",
						name: "Кирилл",
						isMe: true,
					},
					{
						id: 2,
						message: "Дарова",
						name: "Александр",
					},
				]}
			/>
			<ChatControl />
		</div>
	)
}

export default Chat

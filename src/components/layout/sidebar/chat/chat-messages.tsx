import Loader from "@/components/ui/loader"
import { type Message as TMessage } from "@/types/chat"
import { FC } from "react"
import Message from "./message"
export interface IChatMessages {
	messages: TMessage[]
	isLoading?: boolean
}
const ChatMessages: FC<IChatMessages> = ({ messages, isLoading }) => {
	const center = "flex items-center justify-center w-full h-full"
	return (
		<div className="px-2 py-5 flex w-full mb-12 overflow-auto flex-[1_1_auto]">
			{messages.length ? (
				<div className="flex flex-col w-full overflow-auto gap-5 h-full">
					{messages.map((m, pk) => (
						<Message key={pk} {...m} />
					))}
				</div>
			) : isLoading ? (
				<div className={center}>
					<Loader />
				</div>
			) : (
				<div className={center}>Сообщений пока нету</div>
			)}
		</div>
	)
}

export default ChatMessages

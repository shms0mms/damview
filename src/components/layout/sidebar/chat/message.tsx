import Circle from "@/components/ui/circle"
import { ICON_SIZE } from "@/const/icon.const"
import { type Message } from "@/types/chat"
import { User } from "lucide-react"
import { FC } from "react"

const Message: FC<Message> = ({ id, message, name, isMe }) => {
	const firstName = name.split(" ")[0]
	return (
		<div
			className={`flex items-center w-full gap-1 ${
				!isMe && "justify-start flex-row-reverse"
			}`}
		>
			<div className={`flex items-center gap-1 ${!isMe && "flex-row-reverse"}`}>
				<Circle className="w-8 h-8">
					<User width={ICON_SIZE.SM} height={ICON_SIZE.SM} />
				</Circle>
				<span className="text-xs opacity-30">{firstName}</span>
			</div>
			<div className="bg-secondary rounded-sm p-2 break-all ">{message}</div>
		</div>
	)
}

export default Message

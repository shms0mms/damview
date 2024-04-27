import Circle from "@/components/ui/circle"
import { ICON_SIZE } from "@/const/icon.const"
import { type Message } from "@/types/chat"
import { User } from "lucide-react"
import { FC } from "react"

const Message: FC<Message> = ({ message, fio, isMe }) => {
	const firstName = fio.split(" ")[0]
	return (
		<div
			className={`flex flex-col-reverse w-full gap-1 ${!isMe && "items-end"}`}
		>
			<div className={`flex items-center gap-2 ${!isMe && "flex-row-reverse"}`}>
				<Circle className="w-8 h-8">
					<User width={ICON_SIZE.SM} height={ICON_SIZE.SM} />
				</Circle>
				<div className="bg-secondary rounded-sm p-2 break-all ">{message}</div>
			</div>
			<span className="text-xs opacity-30">{firstName}</span>
		</div>
	)
}

export default Message

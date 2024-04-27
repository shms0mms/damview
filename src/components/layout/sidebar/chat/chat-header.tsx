import Circle from "@/components/ui/circle"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Title from "@/components/ui/title"
import { Users } from "lucide-react"
import { FC } from "react"
import Member from "./member"

const ChatHeader: FC = ({}) => {
	return (
		<div className="w-full border-[0px] border-b-[1px] border-solid border-b-secondary p-2 flex items-center gap-3">
			<Circle>
				<Users />
			</Circle>
			<div className="flex items-start flex-col gap-1">
				<Title className="text-sm">Чат с собеседователем</Title>

				<Dialog>
					<DialogTrigger asChild>
						<button onClick={() => {}}>2 участника</button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader className="flex flex-col gap-3">
							<DialogTitle>Участники чата</DialogTitle>
							<DialogDescription className="flex flex-col gap-2">
								<Member name="Кирилл Торопов Викторович" role="interviewer" />
								<Member
									name="Александр Сидоров Александрович"
									role="interviewee"
								/>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

export default ChatHeader

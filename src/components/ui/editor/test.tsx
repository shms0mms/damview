import { Answer } from "@/types/editor"
import { FC } from "react"
import ExampleData from "./example-data"
import Title from "../title"

const Test: FC<Answer> = ({ answer, yourAnswer }) => {
	const isCorrect = yourAnswer == answer
	return (
		<div className="flex flex-col gap-1">
			<Title
				className={`text-xs ${isCorrect ? "text-green-400" : "text-red-400"}`}
			>
				{isCorrect ? "Ответ верный" : "Неправильный ответ"}
			</Title>
			<div className="flex items-center gap-5 justify-between">
				<ExampleData
					className={`${isCorrect && "text-black bg-green-100"}`}
					text={yourAnswer}
					title="Ваш ответ"
				/>
				<ExampleData
					className={`${isCorrect && "text-black bg-green-100"}`}
					text={answer}
					title="Правильный ответ"
				/>
			</div>
		</div>
	)
}

export default Test

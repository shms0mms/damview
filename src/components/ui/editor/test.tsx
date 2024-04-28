import { Answer } from "@/types/editor"
import { FC } from "react"
import ExampleData from "./example-data"
import Title from "../title"

const Test: FC<Answer> = ({ answer_test, your_answer_test }) => {
	const isCorrect = your_answer_test == answer_test
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
					text={your_answer_test?.toString() || "Неправильно выведены данные"}
					title="Ваш ответ"
				/>
				<ExampleData
					className={`${isCorrect && "text-black bg-green-100"}`}
					text={answer_test?.toString() || "Неправильно выведены данные"}
					title="Правильный ответ"
				/>
			</div>
		</div>
	)
}

export default Test

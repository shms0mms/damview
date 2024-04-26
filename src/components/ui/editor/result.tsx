"use client"
import { FC, useState } from "react"
import { ChevronDown } from "lucide-react"
import { ICON_SIZE } from "@/const/icon.const"
export interface IResult {
	quantity: number // Всего тестов
	finishedQuantity: number // Сколько прошли тестов
}

const Result: FC<IResult> = ({ finishedQuantity, quantity }) => {
	const [isVisible, updateVisibled] = useState(false)
	const isSuccess = quantity == finishedQuantity

	return (
		<div className="p-6 relative">
			<button
				className="flex items-center gap-1"
				onClick={() => updateVisibled(!isVisible)}
			>
				Результаты проверки
				<ChevronDown
					width={ICON_SIZE.SM}
					height={ICON_SIZE.SM}
					className={`transition-all duration-300 block ${
						isVisible ? "rotate-180" : "rotate-0"
					}`}
				/>
			</button>
			<div
				className={`absolute px-6 ${
					isVisible && "py-6"
				} -top-full left-0 grid overflow-hidden ease-in-out transition-all duration-300 ${
					isVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
				}`}
			>
				<div className={"min-h-0"}>Пройдено тестов</div>
			</div>
		</div>
	)
}

export default Result

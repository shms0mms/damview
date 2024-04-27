"use client"
import { FC, useState } from "react"
import { ChevronDown } from "lucide-react"
import { ICON_SIZE } from "@/const/icon.const"
import { ResultFromTest } from "@/types/editor"
import Circle from "../circle"
import Title from "../title"
import Test from "./test"
import Loader from "../loader"

const Result: FC<ResultFromTest> = ({ allTests, passTests, result }) => {
	const [isVisible, updateVisibled] = useState(false)
	const isSuccess = allTests == passTests
	const errorTests = allTests - passTests
	const sizes = "w-7 h-7"
	return (
		<div className="p-6 absolute bottom-0 left-0 w-full z-10 bg-editor">
			<div
				className={`mb-6 ${
					isVisible && "border-b-[1px] border-t-[1px]"
				} max-h-[320px] overflow-auto border-[0px]  border-solid border-t-slate-500 border-b-slate-500 w-full grid transition-all duration-300 ${
					isVisible ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
				}`}
			>
				<div className={"transition-all duration-300 min-h-0"}>
					<div className="flex flex-col gap-5 py-6 transition-all duration-300">
						<div className="flex items-center gap-2">
							<Title className="text-sm">Результат выполнения программы</Title>

							<div className="flex items-center gap-2">
								<Circle className={`${sizes} bg-green-500`}>{passTests}</Circle>
								<Circle className={`${sizes} bg-slate-500`}>{allTests}</Circle>
								<Circle className={`${sizes} bg-red-500`}>
									{isSuccess ? 0 : errorTests}
								</Circle>
							</div>
						</div>
						<div className="flex flex-col gap-5">
							{result.length ? (
								result.map((r, pk) => <Test key={pk} {...r} />)
							) : (
								<Loader />
							)}
						</div>
					</div>
				</div>
			</div>
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
		</div>
	)
}

export default Result

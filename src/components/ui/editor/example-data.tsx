"use client"
import { ICON_SIZE } from "@/const/icon.const"
import useDevice from "@/hooks/useDevice"
import { ClipboardCopy } from "lucide-react"
import { FC, useState } from "react"

export interface IExampleData {
	text: string
	title: string
}

const ExampleData: FC<IExampleData> = ({ text, title }) => {
	return (
		<div className="rounded-sm p-2 w-full relative flex flex-col bg-secondary gap-2">
			<button
				type="button"
				onClick={async () => {
					await navigator.clipboard.writeText(text)
				}}
				className={`absolute top-2 right-2 transition-all duration-300`}
			>
				<ClipboardCopy width={ICON_SIZE.SM} height={ICON_SIZE.SM} />
			</button>

			<span className="text-xs">{title}</span>
			<span className="text-xs tracking-[2px]">{text}</span>
		</div>
	)
}

export default ExampleData

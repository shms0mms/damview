"use client"
import { ICON_SIZE } from "@/const/icon.const"
import { cn } from "@/lib/utils"
import { UIComponent } from "@/types/components"
import { ClipboardCopy } from "lucide-react"
import { FC } from "react"

export interface IExampleData extends UIComponent {
	text: string
	title: string
}

const ExampleData: FC<IExampleData> = ({ text, title, className }) => {
	return (
		<div
			className={cn(
				`rounded-sm p-2 w-full relative flex flex-col bg-secondary gap-2 ${className}`
			)}
		>
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

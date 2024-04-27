import { cn } from "@/lib/utils"
import { UIComponent } from "@/types/components"
import { FC, PropsWithChildren } from "react"
export interface ICircle extends UIComponent {}
const Circle: FC<PropsWithChildren<ICircle>> = ({ children, className }) => {
	return (
		<div
			className={cn(
				`rounded-full bg-secondary w-10 h-10 flex items-center justify-center ${className}`
			)}
		>
			{children}
		</div>
	)
}

export default Circle

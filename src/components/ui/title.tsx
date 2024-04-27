import { cn } from "@/lib/utils"
import { UIComponent } from "@/types/components"
import { FC, PropsWithChildren } from "react"
interface ITitle extends UIComponent {}
const Title: FC<PropsWithChildren<ITitle>> = ({ children, className }) => {
	return <div className={cn(`text-2xl font-bold ${className}`)}>{children}</div>
}

export default Title

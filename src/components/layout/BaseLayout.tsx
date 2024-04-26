import { FC, PropsWithChildren } from "react"
import SideBar from "./sidebar/SideBar"

const BaseLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div className="w-full h-full">
			<div className="separator">
				<SideBar />
				{children}
			</div>
		</div>
	)
}

export default BaseLayout

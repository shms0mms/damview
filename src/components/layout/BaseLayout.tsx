import { FC, PropsWithChildren } from "react"
import SideBar from "./sidebar/SideBar"
import Resizer from "../ui/resizer"

const BaseLayout: FC<PropsWithChildren<{ withR?: boolean }>> = ({
	children,
	withR,
}) => {
	return (
		<div className="w-full h-full">
			<div className="separator">
				<SideBar />
				{withR && <Resizer />}
				{children}
			</div>
		</div>
	)
}

export default BaseLayout

import { FC, PropsWithChildren } from "react"

const Description: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <div className="text-base">{children}</div>
}

export default Description

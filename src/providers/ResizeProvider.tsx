"use client"
import { ReactFunc } from "@/types/app"
import { createContext, useState } from "react"
import { FC, PropsWithChildren } from "react"

export type TResizeContext = {
	leftWidth: number
	updateLeftWidth: ReactFunc<number>
	rightWidth: number
	updateRightWidth: ReactFunc<number>
}

export const ResizeContext = createContext<TResizeContext | {}>({})

const ResizeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [leftWidth, updateLeftWidth] = useState(0)
	const [rightWidth, updateRightWidth] = useState(0)
	const value: TResizeContext = {
		leftWidth,
		rightWidth,
		updateLeftWidth,
		updateRightWidth,
	}
	return (
		<ResizeContext.Provider value={value}>{children}</ResizeContext.Provider>
	)
}

export default ResizeProvider

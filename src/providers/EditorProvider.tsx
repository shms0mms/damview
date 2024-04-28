"use client"
import { ReactFunc } from "@/types/app"
import { RefObject, createContext, useState } from "react"
export type EditorLanguage = "javascript" | "python"
export enum EnumLanguage {
	python = "python",
	javascript = "javascript",
}

export type TEditorContext = {
	editorValue: string
	updateEditorValue: ReactFunc<string>
	editorLanguage: EditorLanguage
	updateEditorLanguage: ReactFunc<EditorLanguage>
	setRef: ReactFunc<RefObject<HTMLDivElement> | null>
	ref: RefObject<HTMLDivElement> | null
}
export const EditorContext = createContext<TEditorContext | {}>({})

import { FC, PropsWithChildren } from "react"

const EditorProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [editorValue, updateEditorValue] = useState("")

	const [editorLanguage, updateEditorLanguage] = useState<EditorLanguage>(
		EnumLanguage.python
	)
	const [ref, setRef] = useState<RefObject<HTMLDivElement> | null>(null)
	const value: TEditorContext = {
		editorValue,
		updateEditorValue,
		editorLanguage,
		updateEditorLanguage,
		ref,
		setRef,
	}
	return (
		<EditorContext.Provider value={value}>{children}</EditorContext.Provider>
	)
}

export default EditorProvider

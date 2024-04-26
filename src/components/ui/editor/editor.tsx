"use client"
import {
	Context,
	FC,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import { UnControlled as CodeMirror } from "react-codemirror2"
import Result from "./result"
import { useLocalStorage } from "pidoras"
import { EDITOR_VALUE } from "@/const/editor.const"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import EditorHeader from "./editor-header"
require("codemirror/mode/xml/xml")
require("codemirror/mode/javascript/javascript")
require("codemirror/mode/python/python")
export interface IEditor {}

const Editor: FC<IEditor> = ({}) => {
	const { editorValue, editorLanguage, updateEditorValue } = useContext(
		EditorContext as Context<TEditorContext>
	)

	const editor = useRef(null)
	const wrapper = useRef(null)

	const editorWillUnmount = () => {
		//@ts-ignore
		if (editor.current) editor.current.display.wrapper.remove()
		//@ts-ignore
		if (wrapper.current) wrapper.current.hydrated = false
	}

	const { get, set } = useLocalStorage()
	const value = editorValue || get(EDITOR_VALUE)
	return (
		<div className="flex bg-editor relative flex-col h-full w-full">
			<EditorHeader />
			<div className="flex flex-col w-full h-full mt-24">
				<CodeMirror
					ref={wrapper}
					className="w-full h-full flex-[1_1_auto]"
					value={value}
					options={{
						mode: editorLanguage,
						theme: "material",
						lineNumbers: true,
					}}
					onChange={(editor, data, value) => {
						updateEditorValue(value)
						set(EDITOR_VALUE, value)
					}}
					editorDidMount={e => (editor.current = e)}
					editorWillUnmount={editorWillUnmount}
				/>
				<Result finishedQuantity={5} quantity={10} />
			</div>
		</div>
	)
}

export default Editor

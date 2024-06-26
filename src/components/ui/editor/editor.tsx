"use client"
import { Context, FC, useCallback, useContext, useRef } from "react"
import { UnControlled as CodeMirror } from "react-codemirror2"
import Result from "./result"
import { useLocalStorage } from "pidoras"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import EditorHeader from "./editor-header"
import { EDITOR_VALUE_PYTHON } from "@/const/editor.const"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
require("codemirror/mode/python/python")
require("codemirror/addon/hint/show-hint.css")
require("codemirror/addon/hint/show-hint.js")
import debounce from "lodash.debounce"
export interface IEditor {
	sendCode: (message: string) => void
}

const Editor: FC<IEditor> = ({ sendCode }) => {
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

	const { set } = useLocalStorage()
	const editorValuePythonFromLocalStorage =
		localStorage.getItem(EDITOR_VALUE_PYTHON)?.toString() || ""

	const value = editorValue || JSON.parse(editorValuePythonFromLocalStorage)
	const debouncedUpdate = useCallback(
		debounce((value: string) => {
			sendCode(value)
		}, 250),
		[]
	)
	return (
		<div className="flex overflow-hidden bg-editor relative flex-col h-full w-full">
			<EditorHeader />
			<div className="flex flex-col w-full h-full my-24">
				<CodeMirror
					ref={wrapper}
					className="w-full h-[80%]"
					value={value}
					options={{
						mode: editorLanguage,
						theme: "material",
						lineNumbers: true,
						extraKeys: {
							"Ctrl-Space": "autocomplete",
						},
					}}
					onChange={(editor, data, value) => {
						updateEditorValue(value)
						set(EDITOR_VALUE_PYTHON, value.split("\n"))
						debouncedUpdate(value)
					}}
					editorDidMount={e => {
						editor.current = e
					}}
					editorWillUnmount={editorWillUnmount}
				/>
				<Result
					result={[
						{
							answer: "5",
							yourAnswer: "45824305",
						},
						{
							answer: "5",
							yourAnswer: "5",
						},
						{
							answer: "1",
							yourAnswer: "1",
						},
						{
							answer: "1",
							yourAnswer: "1",
						},
						{
							answer: "2",
							yourAnswer: "2",
						},
						{
							answer: "12",
							yourAnswer: "12",
						},
						{
							answer: "1",
							yourAnswer: "1243234",
						},
						{
							answer: "14",
							yourAnswer: "235235231",
						},
						{
							answer: "2000",
							yourAnswer: "235423581",
						},
						{
							answer: "1",
							yourAnswer: "01",
						},
					]}
					passTests={5}
					allTests={10}
				/>
			</div>
		</div>
	)
}

export default Editor

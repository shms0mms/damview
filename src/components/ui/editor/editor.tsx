"use client"
import {
	Context,
	FC,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
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
import { useMutation, useQuery } from "@tanstack/react-query"
import { taskService } from "@/services/task.service"
import { TTaskContext, TaskContext } from "@/providers/TaskProvider"
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

	const { task } = useContext(TaskContext as Context<TTaskContext>)
	const { set } = useLocalStorage()
	const start = `def main(${task?.params || ""}):\n`
	const editorValuePythonFromLocalStorage =
		localStorage.getItem(EDITOR_VALUE_PYTHON)?.toString() || ""

	const value =
		editorValue || JSON.parse(JSON.stringify(editorValuePythonFromLocalStorage))

	const debouncedUpdate = useCallback(
		debounce((value: string) => {
			sendCode(value)
		}, 250),
		[]
	)

	const { data, mutate } = useMutation({
		mutationKey: ["/editor/test/"],
		mutationFn: ({ taskId, code }: { taskId: number; code: string }) =>
			taskService.testCodeForTask(taskId, code),
	})

	return (
		<div className="flex overflow-auto bg-editor relative flex-col h-full w-full">
			<EditorHeader mutate={mutate} />
			<div className="flex flex-col w-full h-full mt-24 relative">
				<div className="h-[100%] w-full">
					<div className={`absolute top-0 left-8 z-10 opacity-60`}>{start}</div>
					<CodeMirror
						ref={wrapper}
						className="w-full h-full mt-6"
						value={`${value === '""' ? "" : value}`}
						options={{
							mode: editorLanguage,
							theme: "material",
							lineNumbers: true,
							extraKeys: {
								"Ctrl-Space": "autocomplete",
							},
						}}
						onChange={(editor, data, value) => {
							const val = value ?? ""
							const arr = val.split("\n")?.length ? val.split("\n") : []

							updateEditorValue(val)
							set("pythonEditorValue", arr.join("\n"))
							debouncedUpdate(val)
						}}
						editorDidMount={e => {
							editor.current = e
						}}
						editorWillUnmount={editorWillUnmount}
					/>
				</div>
				<Result
					result={data?.results}
					allTests={data?.count_tests}
					passTests={data?.work}
					error={data?.error}
				/>
			</div>
		</div>
	)
}

export default Editor

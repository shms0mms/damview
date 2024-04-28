import { Context, FC, useContext } from "react"
import EditorLanguage from "./editor-language"
import { Button } from "../button"
import { notify } from "@/utils/notify.utils"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import { Download } from "lucide-react"
import { ICON_SIZE } from "@/const/icon.const"
import { TTaskContext, TaskContext } from "@/providers/TaskProvider"
import { UseMutateFunction } from "@tanstack/react-query"
const EditorHeader: FC<{
	mutate: UseMutateFunction<
		any,
		Error,
		{ taskId: number; code: string },
		unknown
	>
}> = ({ mutate }) => {
	const { updateEditorValue, editorValue } = useContext(
		EditorContext as Context<TEditorContext>
	)
	const { task } = useContext(TaskContext as Context<TTaskContext>)

	return (
		<div className="text-sm p-4 flex items-center justify-between absolute z-10 w-full border-[0px] border-solid border-b-[1px] border-b-back top-0 left-0 ">
			<EditorLanguage />
			<div className="flex items-center gap-2">
				<button onClick={() => notify()} type="button">
					Оповестить собеседователя
				</button>
				<Button className="relative w-9 h-9" size={"icon"}>
					<input
						className="opacity-0 w-full h-full absolute top-0 left-0"
						type="file"
						onChange={e => {
							const files = e.currentTarget.files
							const reader = new FileReader()
							if (files?.length) {
								const file = files[0]
								reader.onload = function (event) {
									updateEditorValue(event?.target?.result?.toString() || "")
								}
								reader.readAsText(file)
							}
						}}
					/>

					<Download width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} />
				</Button>
				{!!task?.id && (
					<Button
						onClick={() => {
							const code = editorValue

							mutate({ taskId: task.id, code })
						}}
						size={"sm"}
					>
						Отправить
					</Button>
				)}
			</div>
		</div>
	)
}

export default EditorHeader

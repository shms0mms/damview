"use client"
import { Context, FC, useContext, useEffect } from "react"
import Editor from "@/components/ui/editor/editor"
import Disconnect from "@/components/video/disconnect"
import useLiveCoding from "@/hooks/useLiveCoding"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import { useParams } from "next/navigation"
import { USER_ID } from "@/const/app.const"
import VideoRoom from "@/components/video/VideoRoom"

const Room: FC = ({}) => {
	const { roomId } = useParams()
	const userId = localStorage.getItem(USER_ID) || ""

	const { message, sendCode } = useLiveCoding(Number(userId), roomId.toString())
	const { updateEditorValue, editorValue } = useContext(
		EditorContext as Context<TEditorContext>
	)

	useEffect(() => {
		if (message) {
			message.replaceAll('"', "")

			updateEditorValue(message)
		}
	}, [message?.length || editorValue === ""])

	return (
		<>
			<div className="h-full w-full flex flex-col relative">
				<div className="h-full w-full flex items-center gap-5 relative">
					<Disconnect />
					<VideoRoom />
				</div>

				<Editor sendCode={sendCode} />
			</div>
		</>
	)
}

export default Room

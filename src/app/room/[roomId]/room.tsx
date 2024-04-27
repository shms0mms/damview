"use client"
import { Context, FC, useContext, useEffect } from "react"
import Editor from "@/components/ui/editor/editor"
import Disconnect from "@/components/ui/video/disconnect"
import Video from "@/components/ui/video/video"
import useLiveCoding from "@/hooks/useLiveCoding"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import { useParams } from "next/navigation"
import { USER_ID } from "@/const/app.const"

const Room: FC = ({}) => {
	const { roomId } = useParams()
	const userId = localStorage.getItem(USER_ID)
	const { message, sendCode } = useLiveCoding(Number(userId), roomId.toString())
	const { updateEditorValue, editorValue } = useContext(
		EditorContext as Context<TEditorContext>
	)
	useEffect(() => {
		updateEditorValue(message)
	}, [message?.length || editorValue === ""])

	return (
		<>
			<div className="h-full w-full flex flex-col">
				<div className="h-full w-full flex items-center gap-5 relative">
					<Video isMe isMicrophone={true} isVideo={true} />
					<Video isVideo={false} isMicrophone={false} />
					<Disconnect />
				</div>

				<Editor sendCode={sendCode} />
			</div>
		</>
	)
}

export default Room

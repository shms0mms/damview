"use client"
import { Context, FC, useContext, useEffect } from "react"
import Editor from "@/components/ui/editor/editor"
import Disconnect from "@/components/ui/video/disconnect"
import Video from "@/components/ui/video/video"
import useLiveCoding from "@/hooks/useLiveCoding"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"

const Room: FC = ({}) => {
	const { message, sendCode } = useLiveCoding()
	const { updateEditorValue } = useContext(
		EditorContext as Context<TEditorContext>
	)
	useEffect(() => {
		updateEditorValue(message)
	}, [message])

	return (
		<>
			<div className="h-full w-full flex flex-col">
				<div className="h-full w-full flex items-center gap-5 relative">
					<Video isMicrophone={true} isVideo={true} />
					<Video isVideo={false} isMicrophone={false} />
					<Disconnect />
				</div>

				<Editor sendCode={sendCode} />
			</div>
		</>
	)
}

export default Room

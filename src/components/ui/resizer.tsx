"use client"
import { EditorContext, TEditorContext } from "@/providers/EditorProvider"
import { Context, FC, useContext, useEffect, useRef, useState } from "react"

const Resizer: FC = ({}) => {
	const { ref } = useContext(EditorContext as Context<TEditorContext>)
	const [isResizing, updateResized] = useState(false)
	const [startWidth, updateStartWidth] = useState(0)
	const [startX, updateStartX] = useState(0)
	const resizeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isResizing) {
				const width = startWidth + (e.pageX - startX)
				if (ref?.current && width > 400) ref.current.style.width = width + "px"
			}
		}
		const handleMouseUp = () => {
			updateResized(false)
		}
		if (resizeRef.current && ref?.current) {
			resizeRef.current.addEventListener("mousedown", e => {
				updateResized(true)
				updateStartX(e.pageX)
				updateStartWidth(ref.current?.offsetWidth || 0)
			})
		}

		document.addEventListener("mousemove", handleMouseMove)
		document.addEventListener("mouseup", handleMouseUp)

		return () => {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseup", handleMouseUp)
		}
	}, [isResizing, ref?.current])
	return (
		<div
			ref={resizeRef}
			className="w-[20px] h-full bg-muted cursor-col-resize flex items-center justify-center"
		></div>
	)
}

export default Resizer

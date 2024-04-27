"use client"
import { ICON_SIZE } from "@/const/icon.const"
import { VideoOff } from "lucide-react"
import { FC, useEffect, useRef, useState } from "react"
import ToggleVideo from "./toggle-video"
import ToggleMicrophone from "./toggle-microphone"
export interface IVideo {
	isMicrophone: boolean
	isVideo: boolean
}
const Video: FC<IVideo> = ({
	isMicrophone: isPropsMicrophone,
	isVideo: isPropsVideo,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isVideo, toggleIsVideo] = useState(isPropsVideo)
	const [isMicrophone, toggleIsMicrophone] = useState(isPropsMicrophone)

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: isVideo, audio: isMicrophone })
			.then(stream => {
				if (videoRef.current) videoRef.current.srcObject = stream
			})
			.catch(error => {})
	}, [isVideo, isMicrophone])
	return (
		<div className="h-full overflow-auto w-1/2 relative">
			{isVideo && (
				<video
					className="w-full h-full absolute top-0 left-0 object-cover"
					ref={videoRef}
					autoPlay
					muted
				></video>
			)}
			{!isVideo && (
				<VideoOff
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
					width={ICON_SIZE.XL}
					height={ICON_SIZE.XL}
				/>
			)}
			<ToggleVideo isVideo={isVideo} toggleIsVideo={toggleIsVideo} />
			<ToggleMicrophone
				isMicrophone={isMicrophone}
				toggleIsMicrophone={toggleIsMicrophone}
			/>
		</div>
	)
}

export default Video

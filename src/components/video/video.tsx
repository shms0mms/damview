"use client"
import { FC, useEffect, useRef, useState } from "react"
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng"
export interface IVideo {
	isMicrophone: boolean
	isVideo: boolean
	user: IAgoraRTCRemoteUser
}
const Video: FC<IVideo> = ({
	isMicrophone: isPropsMicrophone,
	isVideo: isPropsVideo,
	user,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isVideo, toggleIsVideo] = useState(isPropsVideo)
	const [isMicrophone, toggleIsMicrophone] = useState(isPropsMicrophone)

	useEffect(() => {
		if (user.videoTrack && videoRef.current)
			user.videoTrack.play(videoRef.current)

		if (!isMicrophone) user.videoTrack?.stop()
	}, [!!user?.uid, videoRef.current, isMicrophone, isVideo])
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
			{/* {!isVideo && (
				<VideoOff
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
					width={ICON_SIZE.XL}
					height={ICON_SIZE.XL}
				/>
			)} */}
			{/* <ToggleVideo isVideo={isVideo} toggleIsVideo={toggleIsVideo} />
			<ToggleMicrophone
				isMicrophone={isMicrophone}
				toggleIsMicrophone={toggleIsMicrophone}
			/> */}
		</div>
	)
}

export default Video

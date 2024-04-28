import { env } from "@/env"
import AgoraRTC, { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng"
import { FC, useEffect, useState } from "react"
import Video from "./video"
import Loader from "../ui/loader"
const APP_ID = env.NEXT_PUBLIC_AGORA_APP_ID
const TOKEN = env.NEXT_PUBLIC_AGORA_TOKEN
const CHANNEL = env.NEXT_PUBLIC_AGORA_CHANNEL_NAME

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })

export type MediaType = "video" | "audio"
const VideoRoom: FC = ({}) => {
	const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([])

	const handleUserJoined = async (
		user: IAgoraRTCRemoteUser,
		mediaType: MediaType
	) => {
		await client.subscribe(user, mediaType)

		if (mediaType === "video") {
			setUsers(state => [...state, user])
		}

		if (mediaType === "audio") {
			user.audioTrack?.play()
		}
	}

	const handleUserLeft = async (user: IAgoraRTCRemoteUser) => {
		setUsers(state => state.filter(u => u.uid !== user.uid))
	}
	useEffect(() => {
		const func = async () => {
			const isConnecting =
				client.connectionState === "CONNECTING" ||
				client.connectionState === "CONNECTED"

			if (!isConnecting) {
				await client
					.join(APP_ID, CHANNEL, TOKEN, null)
					.then(uid =>
						Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
					)
					.then(([tracks, uid]) => {
						const [audioTrack, videoTrack] = tracks
						setUsers(
							state =>
								[
									...state,
									{
										uid,
										audioTrack,
										videoTrack,
									},
								] as IAgoraRTCRemoteUser[]
						)
						client.publish(tracks)
					})

				client.on("user-published", handleUserJoined)

				client.on("user-left", handleUserLeft)
			}
		}
		func()
	}, [])
	const _users = users.filter(
		(user, index) => index === users.findIndex(obj => obj.uid === user.uid)
	)

	return (
		<>
			{_users.length ? (
				<div className="flex w-full h-full items-center ">
					{_users.map(user => (
						<Video isMicrophone key={user.uid} isVideo user={user} />
					))}
				</div>
			) : (
				<div className="w-full h-full flex items-center justify-center">
					<Loader />
				</div>
			)}
		</>
	)
}

export default VideoRoom

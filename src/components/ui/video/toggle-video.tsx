import { ReactFunc } from "@/types/app"
import { FC } from "react"
import { Video, VideoOff, icons } from "lucide-react"
import { ICON_SIZE } from "@/const/icon.const"

export interface IToggleVideo {
	isVideo: boolean
	toggleIsVideo: ReactFunc<boolean>
}

const ToggleVideo: FC<IToggleVideo> = ({ isVideo, toggleIsVideo }) => {
	const props = {
		width: ICON_SIZE.XL,
		height: ICON_SIZE.XL,
	}
	return (
		<button
			className="absolute bottom-2 left-2"
			onClick={() => toggleIsVideo(!isVideo)}
		>
			{isVideo ? <Video {...props} /> : <VideoOff {...props} />}
		</button>
	)
}

export default ToggleVideo

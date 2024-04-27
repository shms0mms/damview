import { ICON_SIZE } from "@/const/icon.const"
import { ReactFunc } from "@/types/app"
import { Mic, MicOff } from "lucide-react"
import { FC } from "react"

export interface IToggleMicrophone {
	isMicrophone: boolean
	toggleIsMicrophone: ReactFunc<boolean>
}

const ToggleMicrophone: FC<IToggleMicrophone> = ({
	isMicrophone,
	toggleIsMicrophone,
}) => {
	const props = {
		width: ICON_SIZE.XL,
		height: ICON_SIZE.XL,
	}
	return (
		<>
			<button
				className="absolute bottom-2 right-2"
				onClick={() => toggleIsMicrophone(!isMicrophone)}
			>
				{isMicrophone ? <Mic {...props} /> : <MicOff {...props} />}
			</button>
		</>
	)
}

export default ToggleMicrophone

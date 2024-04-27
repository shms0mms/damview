"use client"

import { useEffect, useState } from "react"
export type Device = "mobile" | "desktop"
const useDevice = () => {
	const [device, setDevice] = useState<Device>("desktop")
	const isMobile = useEffect(() => {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			setDevice("mobile")
		} else {
			setDevice("desktop")
		}
	}, [
		typeof navigator !== "undefined" &&
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			),
	])
	return device
}

export default useDevice

export const notify = () => {
	const audio = new Audio("/audio/notify.mp3")

	audio.play()
}

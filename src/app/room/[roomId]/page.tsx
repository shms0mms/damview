import BaseLayout from "@/components/layout/BaseLayout"
import RoomDialog from "@/components/ui/room-dialog"
import Room from "./Room"

export default function EditorPage() {
	return (
		<BaseLayout withR>
			<Room />
			<RoomDialog />
		</BaseLayout>
	)
}

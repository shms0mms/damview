import BaseLayout from "@/components/layout/BaseLayout"
import RoomDialog from "@/components/ui/room-dialog"
import Room from "./room"

export default function EditorPage() {
	return (
		<BaseLayout withR>
			<Room />
			<RoomDialog />
		</BaseLayout>
	)
}

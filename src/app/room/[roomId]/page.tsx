import BaseLayout from "@/components/layout/BaseLayout"
import Room from "./Room"
import RoomDialog from "@/components/ui/room-dialog"

export default function EditorPage() {
  return (
    <BaseLayout withR>
      <Room />
      <RoomDialog />
    </BaseLayout>
  )
}

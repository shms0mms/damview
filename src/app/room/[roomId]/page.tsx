import BaseLayout from "@/components/layout/BaseLayout"
import Editor from "@/components/ui/editor/editor"
import RoomDialog from "@/components/ui/room-dialog"

export default function EditorPage() {
  return (
    <BaseLayout withR>
      <Editor />
      <RoomDialog />
    </BaseLayout>
  )
}

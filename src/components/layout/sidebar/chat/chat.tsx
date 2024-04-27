import { FC } from "react"
import ChatHeader from "./chat-header"
import ChatControl from "./chat-control"
import ChatMessages from "./chat-messages"
import { ScrollArea } from "@/components/ui/scroll-area"

const Chat: FC = ({}) => {
  return (
    <div className='flex relative flex-col w-full h-full'>
      <ChatHeader />
      <ScrollArea>
        <ChatMessages
          messages={[
            {
              id: 1,
              message: "Привет",
              name: "Кирилл",
              isMe: true,
            },
            {
              id: 2,
              message: "Дарова",
              name: "Александр",
            },
          ]}
        />
      </ScrollArea>
      <ChatControl />
    </div>
  )
}

export default Chat

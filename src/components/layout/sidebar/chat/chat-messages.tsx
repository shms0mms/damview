import Loader from "@/components/ui/loader"
import { type Message as TMessage } from "@/types/chat"
import { FC } from "react"
import Message from "./message"
export interface IChatMessages {
  messages: TMessage[]
  isLoading?: boolean
}
const ChatMessages: FC<IChatMessages> = ({ messages, isLoading }) => {
  const center = "flex items-center justify-center w-full h-full"
  return (
    <div className='px-3 pt-5 flex w-full h-full flex-[1_1_auto] pb-16'>
      {messages.length ? (
        <div className='flex flex-col w-full gap-5 h-full'>
          {messages.map(m => (
            <Message key={m.id} {...m} />
          ))}
        </div>
      ) : isLoading ? (
        <div className={center}>
          <Loader />
        </div>
      ) : (
        <div className={center}>Сообщений пока нету</div>
      )}
    </div>
  )
}

export default ChatMessages

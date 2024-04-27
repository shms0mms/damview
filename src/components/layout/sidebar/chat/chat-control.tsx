import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ICON_SIZE } from "@/const/icon.const"
import { METHODS } from "@/const/methods.const"
import { Send } from "lucide-react"
import { FC, useEffect, useRef } from "react"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"
interface FormData {
  message: string
}
const ChatControl: FC = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    updateField,
    fields,
  } = useForm<FormData>({
    withLocalStorage: ["message"],
  })
  const onSubmit: OnSubmitHandler<FormData> = data => {
    console.log(data.message || "")
    updateField("message", {
      ...fields.message,
      value: "",
    })
  }
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", e => {
        if (ref.current && e.key === "Enter") {
          console.log(ref.current.value)
          updateField("message", {
            ...fields.message,
            value: "",
          })
        }
      })
    }
  }, [ref.current])
  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmitHandler={onSubmit}
      method={METHODS.POST}
      className='flex items-center gap-5 justify-between w-full absolute bottom-0 left-0 p-2 backdrop-blur-lg rounded-xl'
    >
      <Input
        ref={ref}
        name={"message"}
        error={errors.message}
        register={register}
        placeholder='Отправить сообщение...'
      />

      <Button size={"icon"} className='p-3' type='submit'>
        <Send width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} />
      </Button>
    </Form>
  )
}

export default ChatControl

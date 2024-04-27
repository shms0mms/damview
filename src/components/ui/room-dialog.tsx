"use client"

import { useLocalStorage } from "pidoras"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"
import { Role, type TLogInConference } from "@/types/conference"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "./button"
import { useLogInConference } from "@/hooks/conference/useLogInConference"

const RoomDialog = () => {
  const { get, set } = useLocalStorage()
  const _user = get("user") as { userId: number; role: Role } | null
  const [open, setOpen] = useState<boolean>(_user ? false : true)
  const { register, handleSubmit, fields, updateField } =
    useForm<TLogInConference>({
      defaultValues: { fio: "", role: Role.INTERVIEWEE },
    })
  const { logInConference, user } = useLogInConference()

  const onSubmit: OnSubmitHandler<TLogInConference> = data => {
    logInConference(data as TLogInConference)
  }

  useEffect(() => {
    if (!user) return
    setOpen(false)
    set("user", user)
  }, [user])
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Войти в конференцию</DialogTitle>
          <DialogDescription>
            Заполните форму ниже, чтобы войти в конференцию.
          </DialogDescription>
        </DialogHeader>
        <Form
          handleSubmit={handleSubmit}
          onSubmitHandler={onSubmit}
          className='flex flex-col gap-2'
        >
          <Label>ФИО</Label>
          <Input
            placeholder='Введите ваше имя, фамилию и отчество...'
            params={{
              minLength: { value: 3, message: "Введите корректное ФИО" },
            }}
            register={register}
            name='fio'
          />
          <Label className='mt-4'>Ваша роль</Label>
          <Select
            onValueChange={value =>
              updateField("role", {
                ...fields.role,
                value,
              })
            }
            defaultValue={fields.role && fields.role.value}
          >
            <SelectTrigger>
              <SelectValue placeholder='Выберите вашу роль' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='interviewee'>Собеседующий</SelectItem>
              <SelectItem value='interviewer'>Кандидат</SelectItem>
            </SelectContent>
          </Select>
          <Button className='mt-2'>Войти</Button>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RoomDialog

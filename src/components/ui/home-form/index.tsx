"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Form from "@/components/ui/home-form/form"

const HomeForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Начать</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новую конференцию</DialogTitle>
          <DialogDescription>
            Заполните форму ниже, и перейдите по ссылке.
          </DialogDescription>
        </DialogHeader>
        <Form />
      </DialogContent>
    </Dialog>
  )
}

export default HomeForm

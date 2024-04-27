import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useEffect, type FC } from "react"
import { useCreateConference } from "@/hooks/conference/useCreateConference"
import { type TCreateConference, Role } from "@/types/conference"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  fullname: z.string().min(1, { message: "Вы должны ввести ваше ФИО" }),
  role: z.string().or(z.enum([Role.INTERVIEWER, Role.INTERVIEWEE])),
})

const Form: FC = () => {
  const form = useForm<TCreateConference>({
    defaultValues: {
      fullname: "",
      role: Role.INTERVIEWER,
    },
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  })
  const { createConference, data: newConference } = useCreateConference()

  useEffect(() => {
    if (!newConference) return
    redirect(`/room/${newConference.roomId}/editor`)
  }, [newConference])
  return (
    <FormComponent {...form}>
      <form
        onSubmit={form.handleSubmit(data => createConference(data))}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Ваше ФИО...' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваша роль</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Выберите вашу роль' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='interviewee'>Собеседующий</SelectItem>
                  <SelectItem value='interviewer'>Кандидат</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Создать</Button>
      </form>
    </FormComponent>
  )
}

export default Form

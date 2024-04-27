import { Input } from "@/components/ui/input"
import { type FC, useCallback, useEffect } from "react"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"
import { useSearchTasks } from "@/hooks/useSearchTasks"
import type { TSearchTask } from "@/types/search-tasks"
import type { ReactFunc } from "@/types/app"
import { Difficulty, type Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TSearchTaskProps = {
  setTasks: ReactFunc<Task[]>
}

const SearchTasks: FC<TSearchTaskProps> = ({ setTasks }) => {
  const { handleSubmit, register, fields, updateField } = useForm<TSearchTask>({
    mode: "onChange",
  })
  const { searchTasks, searchedTasks } = useSearchTasks()

  const onSubmit: OnSubmitHandler<TSearchTask> = values => {
    searchTasks(values as TSearchTask)
  }
  useEffect(() => {
    if (!searchedTasks) return
    setTasks(searchedTasks)
  }, [searchedTasks])

  return (
    <Form handleSubmit={handleSubmit} onSubmitHandler={onSubmit}>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 w-full'>
          <Input
            placeholder='Введите интересующую задачу...'
            register={register}
            name='task'
          />
          <Button className='p-2' size='icon'>
            <Search size={26} />
          </Button>
        </div>
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
            <SelectValue placeholder='Выберите сложность задачи...'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={Difficulty.EASY}>Легкая</SelectItem>
              <SelectItem value={Difficulty.MEDIUM}>Средняя</SelectItem>
              <SelectItem value={Difficulty.HIGH}>Сложный</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Form>
  )
}

export default SearchTasks

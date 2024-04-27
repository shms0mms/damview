import { Input } from "@/components/ui/input"
import { type FC, useCallback, useEffect } from "react"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"
import debounce from "lodash.debounce"
import { useSearchTasks } from "@/hooks/useSearchTasks"
import type { TSearchTask } from "@/types/search-tasks"
import type { ReactFunc } from "@/types/app"
import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type TSearchTaskProps = {
  setTasks: ReactFunc<Task[]>
}

const SearchTasks: FC<TSearchTaskProps> = ({ setTasks }) => {
  const { handleSubmit, register, fieldsValues } = useForm<TSearchTask>({
    mode: "onChange",
    defaultValues: { substring: "" },
  })
  const { searchTasks, searchedTasks } = useSearchTasks()

  const onSubmit: OnSubmitHandler<TSearchTask> = values => {
    console.log(values)
  }
  useEffect(() => {
    if (!searchedTasks) return
    setTasks(searchedTasks)
  }, [searchedTasks])

  return (
    <Form handleSubmit={handleSubmit} onSubmitHandler={onSubmit}>
      <div className='flex gap-2'>
        <Input
          placeholder='Введите уровень сложности/категорию интересующих задач...'
          register={register}
          name='substring'
        />
        <Button size='icon'>
          <Search />
        </Button>
      </div>
    </Form>
  )
}

export default SearchTasks

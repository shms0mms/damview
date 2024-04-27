import { Input } from "@/components/ui/input"
import { type FC, useCallback, useEffect } from "react"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"
import debounce from "lodash.debounce"
import { useSearchTasks } from "@/hooks/useSearchTasks"
import type { TSearchTask } from "@/types/search-tasks"
import type { ReactFunc } from "@/types/app"
import type { Task } from "@/types/task"

type TSearchTaskProps = {
  setTasks: ReactFunc<Task[]>
}

const SearchTasks: FC<TSearchTaskProps> = ({ setTasks }) => {
  const { handleSubmit, register, fieldsValues } = useForm<TSearchTask>({
    mode: "onChange",
    defaultValues: { substring: "" },
  })
  const { searchTasks, searchedTasks } = useSearchTasks()
  const searchTaskDebounce = useCallback(
    debounce((data: TSearchTask) => searchTasks(data), 444),
    []
  )

  const onSubmit: OnSubmitHandler<TSearchTask> = values => {
    console.log(values)
  }
  useEffect(() => {
    if (!searchedTasks) return
    setTasks(searchedTasks)
  }, [searchedTasks])

  useEffect(() => {
    if (!fieldsValues.substring || fieldsValues.substring.length < 4) return
    searchTaskDebounce(fieldsValues)
  }, [fieldsValues.substring])
  return (
    <Form handleSubmit={handleSubmit} onSubmitHandler={onSubmit}>
      <Input
        placeholder='Введите уровень сложности/категорию интересующих задач...'
        register={register}
        name='substring'
      />
    </Form>
  )
}

export default SearchTasks

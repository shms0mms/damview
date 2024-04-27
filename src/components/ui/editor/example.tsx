import { FC } from "react"
import Title from "../title"
import ExampleData from "./example-data"

export interface IExample {
  id: number
  enter: string
  out: string
}

const Example: FC<IExample> = ({ id, enter, out }) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <Title className='text-base'>Пример {id}</Title>
      <div className='w-full flex items-center gap-5'>
        <ExampleData text={enter} title='Ввод' />
        <ExampleData text={out} title='Вывод' />
      </div>
    </div>
  )
}

export default Example

import { FC } from "react"
import EditorLanguage from "./editor-language"
import { Button } from "../button"

const EditorHeader: FC = ({}) => {
  return (
    <div className='text-sm p-4 flex items-center justify-between absolute z-10 w-full border-[0px] border-solid border-b-[1px] border-b-back top-0 left-0 '>
      <EditorLanguage />
      <div className='flex items-center gap-2'>
        <button type='button'>Оповестить собеседователя</button>
        <Button size={"sm"}>Отправить</Button>
      </div>
    </div>
  )
}

export default EditorHeader

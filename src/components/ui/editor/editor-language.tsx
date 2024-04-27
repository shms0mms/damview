"use client"
import { Context, FC, useContext } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select"
import {
  EditorContext,
  type EditorLanguage,
  EnumLanguage,
  TEditorContext,
} from "@/providers/EditorProvider"

const EditorLanguage: FC = ({}) => {
  const { updateEditorLanguage, editorLanguage } = useContext(
    EditorContext as Context<TEditorContext>
  )
  return (
    <>
      <Select
        defaultValue={EnumLanguage.javascript}
        value={editorLanguage}
        onValueChange={(value: EditorLanguage) => updateEditorLanguage(value)}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Языки программирования</SelectLabel>
            <SelectItem value={EnumLanguage.javascript}>JavaScript</SelectItem>
            <SelectItem value={EnumLanguage.python}>Python</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default EditorLanguage

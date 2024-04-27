import { FC, PropsWithChildren } from "react"
import SideBar from "./sidebar/SideBar"
import Resizer from "../ui/resizer"
import TaskProvider from "@/providers/TaskProvider"

const BaseLayout: FC<PropsWithChildren<{ withR?: boolean }>> = ({
  children,
  withR,
}) => {
  return (
    <TaskProvider>
      <div className='w-full h-full'>
        <div className='separator'>
          <SideBar />
          {withR && <Resizer />}
          {children}
        </div>
      </div>
    </TaskProvider>
  )
}

export default BaseLayout

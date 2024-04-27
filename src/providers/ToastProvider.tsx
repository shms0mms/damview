"use client"

import { useTheme } from "next-themes"
import { type FC, type PropsWithChildren } from "react"
import { Toaster } from "sonner"

const ToastProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { theme } = useTheme()
  return (
    <>
      {children}
      <Toaster
        position='bottom-center'
        theme={(theme as "dark" | "light" | "system") ?? "dark"}
      />
    </>
  )
}

export default ToastProvider

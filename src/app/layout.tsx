import type { Metadata } from "next"
import "../styles/globals.scss"
import { play } from "@/styles/fonts"
import ThemeProvider from "@/providers/ThemeProvider"
import EditorProvider from "@/providers/EditorProvider"
import ResizeProvider from "@/providers/ResizeProvider"
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import ToastProvider from "@/providers/ToastProvider"

export const metadata: Metadata = {
  title: "Damview",
  description: "Interview your employees and check their programming level",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={play.className}>
        <ReactQueryProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ToastProvider>
              <ResizeProvider>
                <EditorProvider>{children}</EditorProvider>
              </ResizeProvider>
            </ToastProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

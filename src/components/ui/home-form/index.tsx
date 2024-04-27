"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import Form from "@/components/ui/home-form/form"
import Results from "./results"
import { type THeights } from "@/types/home-form"

const HomeForm = () => {
  const [currentTab, setCurrentTab] = useState<"form" | "results">("form")
  const [heights, setHeights] = useState<THeights>({
    formHeight: 75,
    resultsHeight: 0,
  })

  const dialogContentProps = { setCurrentTab, heights, setHeights }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Начать</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать новую конференцию</DialogTitle>
          <DialogDescription>
            Заполните форму ниже, и перейдите по ссылке.
          </DialogDescription>
        </DialogHeader>
        <div className='overflow-hidden'>
          <AnimatePresence>
            {currentTab === "form" ? (
              <Form {...dialogContentProps} />
            ) : (
              <Results {...dialogContentProps} />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HomeForm

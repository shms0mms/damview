import { Form as FormComponent } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { useEffect, useRef, type FC } from "react"
import { type THeights } from "@/types/home-form"
import { Button } from "@/components/ui/button"

type TFormProps = {
  heights: THeights
  setHeights: React.Dispatch<React.SetStateAction<THeights>>
  setCurrentTab: React.Dispatch<React.SetStateAction<"form" | "results">>
}

const Form: FC<TFormProps> = ({
  heights: { formHeight, resultsHeight },
  setHeights,
  setCurrentTab,
}) => {
  const form = useForm({
    defaultValues: {},
    mode: "onSubmit",
  })

  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (!formRef.current) return
    setHeights(prev => ({ ...prev, formHeight: formRef.current!.offsetHeight }))
  }, [formRef.current?.offsetHeight])

  return (
    <motion.div
      key='form'
      transition={{
        duration: 0.25,
      }}
      initial={{
        height: resultsHeight,
        filter: "blur(4px)",
        translateX: -250,
        opacity: 0,
      }}
      animate={{
        height: formHeight,
        filter: "blur(0px)",
        translateX: 0,
        opacity: 1,
      }}
      exit={{
        height: resultsHeight,
        filter: "blur(4px)",
        translateX: -250,
        opacity: 0,
        position: "absolute",
      }}
    >
      <FormComponent {...form}>
        <form
          onSubmit={form.handleSubmit(_data => setCurrentTab("results"))}
          ref={formRef}
        >
          <Button>Создать</Button>
        </form>
      </FormComponent>
    </motion.div>
  )
}

export default Form

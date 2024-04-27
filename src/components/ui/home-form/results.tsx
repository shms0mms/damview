import { useEffect, useRef, type FC } from "react"
import { type THeights } from "@/types/home-form"
import { motion } from "framer-motion"
import { Button } from "../button"

type TResultsProps = {
  heights: THeights
  setHeights: React.Dispatch<React.SetStateAction<THeights>>
  setCurrentTab: React.Dispatch<React.SetStateAction<"form" | "results">>
}

const Results: FC<TResultsProps> = ({
  heights: { formHeight, resultsHeight },
  setHeights,
  setCurrentTab,
}) => {
  const resultsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!resultsRef.current) return
    setHeights(prev => ({
      ...prev,
      resultsHeight: resultsRef.current!.offsetHeight,
    }))
  }, [resultsRef.current?.offsetHeight])
  return (
    <motion.div
      key='results'
      transition={{
        duration: 0.25,
      }}
      initial={{
        height: formHeight,
        filter: "blur(4px)",
        translateX: 250,
        opacity: 0,
      }}
      animate={{
        height: resultsHeight,
        filter: "blur(0px)",
        translateX: 0,
        opacity: 1,
      }}
      exit={{
        height: formHeight,
        filter: "blur(4px)",
        translateX: 250,
        opacity: 0,
        position: "absolute",
      }}
    >
      <div ref={resultsRef}>
        <Button className='block' onClick={() => setCurrentTab("form")}>
          asdfs
        </Button>
        <Button className='block' onClick={() => setCurrentTab("form")}>
          asdfs
        </Button>
      </div>
    </motion.div>
  )
}

export default Results

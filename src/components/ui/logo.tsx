import { cn } from "@/lib/utils"
import { type FC } from "react"

type TLogoProps = {} & React.HTMLAttributes<HTMLDivElement>

const Logo: FC<TLogoProps> = ({ className, ...props }) => {
  return (
    <div className={cn("flex items-center text-lg", className)} {...props}>
      <span className='font-bold'>Dam</span>
      <span className='text-destructive'>View</span>
    </div>
  )
}

export default Logo

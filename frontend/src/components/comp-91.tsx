import { useState } from "react"
import { LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type Props = {
  title:string,
  styles?:string,
}
export default function ButtonWithLoading({title,styles}:Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = () => {
    setIsLoading(true)
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Reset after 1 second
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      data-loading={isLoading || undefined}
      className={`group relative disabled:opacity-100 ${styles}`}
    >
      <span className="group-data-loading:text-transparent">{title}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircleIcon
            className="animate-spin"
            size={16}
            aria-hidden="true"
          />
        </div>
      )}
    </Button>
  )
}

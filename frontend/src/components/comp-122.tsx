import {
  RiGoogleFill,
} from "@remixicon/react"

import { Button } from "@/components/ui/button"

export default function GoogleSignin() {
  return (
    <div className="flex flex-col gap-2  w-[100%] sm:w-[440px] md:w-[440px] lg:w-[285px] xl:w-[400px] h-[40px]">
      <Button className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 w-full h-full cursor-pointer">
        <span className="pointer-events-none me-2 flex-1">
          <RiGoogleFill className="opacity-60" size={16} aria-hidden="true" />
        </span>
        Login with Google
      </Button>
    </div>
  )
}

import { useId, useMemo, useState } from "react"
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PasswordInputProps = {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  name?: string
}

export default function PasswordInput({
  value = "",
  onChange,
  onBlur,
  name,
}: PasswordInputProps) {
  const id = useId()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ]

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }))
  }

  const strength = checkStrength(value)

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length
  }, [strength])

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border"
    if (score <= 1) return "bg-red-500"
    if (score <= 2) return "bg-orange-500"
    if (score === 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password"
    if (score <= 2) return "Weak password"
    if (score === 3) return "Medium password"
    return "Strong password"
  }

  return (
    <div className="w-full sm:w-[440px] md:w-[440px] lg:w-[285px] xl:w-[400px]">
      <div className="*:not-first:mt-2 w-full">
        <Label htmlFor={id}>Password</Label>
        <div className="relative">
          <Input
            id={id}
            name={name}
            className="pe-9"
            placeholder="Password"
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-describedby={`${id}-description`}
          />
          <button
            className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>
      </div>

      {/* Strength Bar */}
      <div
        className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        />
      </div>

      <p id={`${id}-description`} className="text-sm font-medium mb-2">
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      <ul className="space-y-1.5">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <CheckIcon size={16} className="text-emerald-500" />
            ) : (
              <XIcon size={16} className="text-muted-foreground/80" />
            )}
            <span
              className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
            >
              {req.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

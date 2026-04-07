import * as React from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const CopyButton = React.forwardRef(
  ({ className, value, copyMessage = "Copied!", ...props }, ref) => {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
      if (!hasCopied) return

      const timer = setTimeout(() => {
        setHasCopied(false)
      }, 2000)

      return () => clearTimeout(timer)
    }, [hasCopied])

    return (
      <Button
        ref={ref}
        size="sm"
        variant="ghost"
        className={cn(
          "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20",
          hasCopied && "text-green-400 hover:text-green-300 hover:bg-green-500/20",
          className
        )}
        onClick={() => {
          navigator.clipboard.writeText(value)
          setHasCopied(true)
        }}
        {...props}
      >
        {hasCopied ? (
          <>
            <Check className="w-4 h-4" />
            <span className="ml-1">{copyMessage}</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span className="ml-1">Copy</span>
          </>
        )}
      </Button>
    )
  }
)
CopyButton.displayName = "CopyButton"

export { CopyButton }

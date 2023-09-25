import { ReactNode, CSSProperties } from "react"

interface ICirButton {
  children: ReactNode
  radius?: string | number
  styles?: CSSProperties
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  disabled?: boolean
  isTransparent?: boolean
  isStopPropagation?: boolean
  isRadius?: boolean
  className?: string
  useSAnimate?: boolean
}

export const CirButton: React.FC<ICirButton> = ({
  children,
  radius = "40px",
  styles,
  onClick,
  disabled = false,
  isTransparent = false,
  isStopPropagation = true,
  isRadius = true,
  className = "",
  useSAnimate = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    isStopPropagation && e.stopPropagation()
    onClick && onClick(e)
  }

  return (
    <div
      onClick={handleClick}
      // tabIndex={1}
      className={`${className} cursor-pointer transition-all transition-border- ${
        isRadius ? "rounded-full" : "rounded-sm"
      } flex justify-center items-center border ${
        !isTransparent ? "border-bdm" : "border-transparent"
      } hover:bg-whv ${
        useSAnimate ? "button-circle-focus-class" : "active:scale-90"
      }`}
      style={{
        width: radius,
        height: radius,
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.3 : 1,
        ...styles,
      }}
    >
      {children}
    </div>
  )
}

interface Button {
  children: ReactNode
  radius?: string | number
  styles?: CSSProperties
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  disabled?: boolean
  isTransparent?: boolean
  isStopPropagation?: boolean
  isRadius?: boolean
  isAnimated?: boolean
  isActiveBg?: boolean
  height?: number
  useSAnimate?: boolean
}

export const Button: React.FC<Button> = ({
  children,
  radius = "40px",
  height = "40px",
  styles,
  onClick,
  disabled = false,
  isTransparent = false,
  isStopPropagation = true,
  isRadius = false,
  isAnimated = true,
  isActiveBg = false,
  useSAnimate = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    isStopPropagation && e.stopPropagation()
    onClick && onClick(e)
  }

  return (
    <div
      // tabIndex={1}
      onClick={handleClick}
      className={`cursor-pointer transition-all px-3 py-2 hover:bg-whv ${
        isRadius ? "rounded-full" : "rounded"
      } flex justify-center items-center border ${
        isAnimated ? "active:scale-90" : ""
      } ${!isTransparent ? "border-bdm" : "border-transparent"} ${
        isActiveBg ? "active:bg-whv1" : ""
      } ${useSAnimate ? "button-circle-focus-class" : ""}`}
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.3 : 1,
        height: height || "40px",
        ...styles,
      }}
    >
      {children}
    </div>
  )
}

import type {ReactNode } from "react"
import "./button.css"

type Button = {
    children: ReactNode;
    variant: "primary" | "secondary" | "terciary"
    isActive?: boolean
}

function Button({ children, variant, isActive }: Button) {
  return <button className={`${variant} ${isActive && "active"}`}>{children}</button>;
}

export default Button;
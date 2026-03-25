import type { ReactNode } from "react";
import styles from "./button.module.css";

type Button = {
  children: ReactNode;
  variant: "primary" | "secondary" | "tertiary" | "link";
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

function Button({ children, variant, isActive, className, onClick, disabled }: Button) {
  return (
    <button
      className={`${styles[variant]} ${isActive ? styles.active : ""} ${className} `}
      onClick={onClick} disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

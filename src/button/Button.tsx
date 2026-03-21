import type { ReactNode } from "react";
import styles from "./button.module.css";

type Button = {
  children: ReactNode;
  variant: "primary" | "secondary" | "terciary";
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

function Button({ children, variant, isActive, className, onClick }: Button) {
  return (
    <button
      className={`${styles[variant]} ${isActive ? styles.active : ""} ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

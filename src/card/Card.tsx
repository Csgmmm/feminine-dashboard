import type { ReactNode } from "react";
import styles from "./card.module.css";

interface ICard {
  children: ReactNode;
  variant?: "default" | "upgrade";
  className?: string;
}

function Card({ children, variant = "default", className }: ICard) {
  return (
    <div
      className={`${styles.card} ${variant === "upgrade" ? styles.upgradeCard : ""}${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export default Card;

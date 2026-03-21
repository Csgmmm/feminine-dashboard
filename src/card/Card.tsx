import type { ReactNode } from "react";
import styles from "./card.module.css";

interface ICard {
  children: ReactNode;
  variant?: "default" | "upgrade";
}

function Card({ children, variant = "default" }: ICard) {
  return (
    <div
      className={`${styles.card} ${variant === "upgrade" ? styles.upgradeCard : ""}`}
    >
      {children}
    </div>
  );
}

export default Card;

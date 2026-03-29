import type { ReactNode } from "react";
import styles from "./chip.module.css";

interface IChip {
    children: ReactNode ;
    variant: "primary" | "secondary" | "tertiary"
}

function Chip({children,variant}:IChip) {
  return (
    <div className={`${styles.chip} ${styles[variant]}`}> 
      <span>{children}</span>
    </div>
  );
}

export default Chip;
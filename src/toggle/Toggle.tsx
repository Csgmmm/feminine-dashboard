
import styles from "./toggle.module.css";

interface IToggle {
  isOn: boolean;
  onToggle: () => void;
  label: string;
}

function Toggle({ isOn, onToggle, label }: IToggle) {
  return (
    <div className={styles.toggleContainer}>
      <span className={styles.label}>{label}</span>
      <div
        className={`${styles.toggle} ${isOn ? styles.on : styles.off}`}
        onClick={onToggle} //ao clicar, vai buscar a função criada no Interface
      >
        <div className={styles.thumb}></div>
      </div>
    </div>
  );
}

export default Toggle;

import { X } from "lucide-react";
import styles from "./modalLogs.module.css";

function ModalLogs({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Log your symptoms</h2>

        <button className={styles.closeButton} onClick={onClose}>
          <X size={32}/>
        </button>
        {/* Na homepage, tenho a função onClose={() => setIsOpen(false)} que, ao clicar neste X, percebe que é para "false" */}
      </div>
      <p>Modal Content</p>
    </div>
  );
}

export default ModalLogs;

import { X } from "lucide-react";
import styles from "./modalLogs.module.css";
import Tabs from "../tabs/Tabs";
import Intensity from "./Intensity";
import { useState } from "react";
import Symptoms from "./Symptoms";

function ModalLogs({ onClose }: { onClose: () => void }) {
  // 1 - criar o estado da aba ativa (começa em Symptoms)
  const [activeTab, setActiveTab] = useState("Symptoms");
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Today's logs</h2>

        <button className={styles.closeButton} onClick={onClose}>
          <X size={32} />
        </button>
        {/* Na homepage, tenho a função onClose={() => setIsOpen(false)} que, ao clicar neste X, percebe que é para "false" */}
      </div>

      {/* 2 - passar o estado e a função de mudar o estado para o componente Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.content}>
        {/* 3 - se activeTab for igual a X, mostra o componente Y */}
        {activeTab === "Symptoms" && (
          <div>
            <Symptoms />
          </div>
        )}

        {activeTab === "Intensity" && (
          <div>
            <Intensity />
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalLogs;

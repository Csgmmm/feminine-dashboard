import styles from "./tabs.module.css";
import Button from "../button/Button";

interface ITabs {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const tabs = [
  "Symptoms", // pain, energy, mood, skin, hair
  "Intensity",
];

const Tabs = ({ activeTab, setActiveTab }: ITabs) => {
  //para que o intensity seja a primeira seção aberta

  return (
    <div className={styles.container}>
      <div className={styles.tabsHeader}>
        {/* eu quero por cada tab lá em cima, ele crie um button */}
        {/* preciso de uma key para ligar o button a cada item do array */}
        {/* se o activeTab "activeTab === Intensity.. etc" é igual a tab (cada item do array) então chama os estilos active */}
        {/* ao clicar, ele verifica se o activeTab é igual ao item do array e se for, ele chama a função e o setActiveTab atualiza o estado para o styles.active */}
        {tabs.map((tab) => (
          <Button
            variant="link"
            key={tab}
            className={`${styles.tabsBtn} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

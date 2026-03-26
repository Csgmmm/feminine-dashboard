import { useState, type ReactNode } from "react";
import styles from "./layout.module.css";
import Sidebar from "./sidebar/Sidebar";

interface ILayout {
  children: ReactNode;
}




const Layout = ({ children }: ILayout) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section id={styles.sidebar}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <main className={styles.main}>{children}</main>
    </section>
  );
};

export default Layout;

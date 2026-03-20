import { type ReactNode } from "react";
import styles from "./layout.module.css";
import Sidebar from "./sidebar/Sidebar";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {

  return (
    <section id={styles.sidebar}>
      <Sidebar />
      <main className={styles.main}>
        
        {children}
        <footer>Footer!</footer>
      </main>
      
    </section>
  );
};

export default Layout;
